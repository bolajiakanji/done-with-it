import {
    View,
    ScrollView,
    Text,
    StyleSheet,

} from "react-native";
import React, { useRef } from "react";
import { AdvancedImage } from "cloudinary-react-native";
import myCloud from "../utility/cid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import timeAgo from "../utility/timeAgo";
import useAuth from "../auth/useAuth";
import CommentHighlight from "./CommentHighlight";
import LoadingCommentLogic from "./LoadingCommentLogic";

function CommentsSection({
    comments,
    listing,
    height,
    setComments,
    DeleteComment,
    loadingCommentOnPageVisit,
    loadListing
}) {
    const count = useRef(true)

    const { user } = useAuth();

    const numberOfComments =
        count.current && comments.length == 0 ? listing.comments : comments.length;

    const sectionHeight = height / 2.2

    return (
        <View style={styles.container}>
            <View style={[styles.commentWrapper, { height: sectionHeight }]}>

                <CommentHighlight numberOfComments={numberOfComments} />

                <LoadingCommentLogic
                    loadingCommentOnPageVisit={loadingCommentOnPageVisit}
                    comments={comments}
                    loadListing={loadListing}
                    numberOfComments={numberOfComments}
                    height={sectionHeight}
                />

                {!loadingCommentOnPageVisit && comments.length !== 0 &&
                    <View style={styles.scrollWrapper}>
                        <ScrollView style={styles.scrollContainer}>
                            {comments.map((comment) => {
                                const profileImage = myCloud().image(comment.userId.image)
                                return (
                                    <View key={comment._id} style={styles.scroll}>
                                        <View>
                                            {!comment.userId.image && (
                                                <MaterialCommunityIcons
                                                    name="account"
                                                    size={28}
                                                    color="gray"
                                                    style={styles.imageIcon}
                                                />
                                            )}
                                            {comment.userId.image && (
                                                <AdvancedImage
                                                    cldImg={profileImage}
                                                    style={styles.image}
                                                />
                                            )}
                                        </View>
                                        <View style={styles.commenterNameBox}>
                                            <View>
                                                <Text style={styles.commenterNameText}>
                                                    {"@" + comment.userId.name}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={{ fontSize: 16 }}>{comment.comment}</Text>
                                            </View>
                                            <View style={styles.timeAgoBox}>
                                                <View >
                                                    <Text style={styles.timeAgoText} >
                                                        {timeAgo(comment.createdAt) + " ago"}
                                                    </Text>
                                                </View>
                                                {comment.userId._id == user._id &&
                                                    <DeleteComment
                                                        listing={listing}
                                                        comment={comment}
                                                        setComments={setComments}
                                                    />}
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#aaa"
    },

    commentWrapper: {
        position: "relative",
        width: '100%',
        paddingBottom: 80
    },

    scrollWrapper: {
        backgroundColor: "#ccc",
        paddingHorizontal: 10,
    },

    scrollContainer: {
        width: "100%",
        paddingRight: 20,
        paddingBottom: 180,
    },

    scroll: {
        display: "flex",
        marginTop: 10,
        flexDirection: "row",
        gap: 10,
        flex: "wrap",
        paddingRight: 40,
    },

    imageIcon: {
        borderRadius: 15,
        padding: 2,
        backgroundColor: "#bbb",
    },

    image: {

        width: 35,
        height: 35,
        borderRadius: 20
    },

    commenterNameBox: {
        display: "flex",
        flexDirection: "column",
        rowGap: 5,
        flexWrap: "wrap",
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 20,
        width: '100%'
    },

    commenterNameText: {
        color: "gray",
        fontSize: 14
    },

    timeAgoBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },

    timeAgoText: {
        fontSize: 11,
        color: "gray",
    }
})

export default CommentsSection;