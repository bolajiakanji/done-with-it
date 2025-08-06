import {
    View,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Text,
    StyleSheet,

} from "react-native";
import React, { useRef } from "react";
import { AdvancedImage } from "cloudinary-react-native";
import getPluralisedWord from "../utility/pluralisedWord";
import myCloud from "../utility/cid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import timeAgo from "../utility/timeAgo";
import useAuth from "../auth/useAuth";
import CommentHighlight from "./CommentHighlight";

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

                {loadingCommentOnPageVisit &&
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 50 }} >
                        <ActivityIndicator size={30} />
                        <Text style={{ textAlign: 'center' }}>Loading Comments</Text>
                    </View>
                }
                {!loadingCommentOnPageVisit && comments.length === 0 && !numberOfComments &&
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: height / 3.8 }} >

                        <Text style={{ textAlign: 'center' }}>No Comments yet</Text>
                    </View>
                }
                {!loadingCommentOnPageVisit && comments.length === 0 && !!numberOfComments &&
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: height / 3.8 }} >
                        <Text style={{ textAlign: 'center' }}>No comments gotten </Text>
                        <TouchableOpacity onPress={() => {
                            loadListing()
                        }}>
                            <Text style={{ textAlign: 'center', color: 'blue' }}>click to retry </Text>
                        </TouchableOpacity >
                    </View>
                }

                {!loadingCommentOnPageVisit && comments.length !== 0 &&

                    <View
                        style={{
                            backgroundColor: "#ccc",
                            paddingHorizontal: 10,
                        }}
                    >
                        <ScrollView style={{ width: "100%", paddingRight: 20, paddingBottom: 180, backgroundColor: '' }}>
                            {comments.map((comment) => {
                                const profileImage = myCloud().image(comment.userId.image)
                                return (
                                    <View
                                        key={comment._id}
                                        style={{
                                            display: "flex",
                                            marginTop: 10,
                                            flexDirection: "row",
                                            gap: 10,
                                            flex: "wrap",
                                            paddingRight: 40,
                                        }}
                                    >
                                        <View>
                                            {!comment.userId.image && (
                                                <MaterialCommunityIcons
                                                    name="account"
                                                    size={28}
                                                    color="gray"
                                                    style={{
                                                        borderRadius: 15,
                                                        padding: 2,
                                                        backgroundColor: "#bbb",
                                                    }}
                                                />
                                            )}
                                            {comment.userId.image && (
                                                <AdvancedImage cldImg={profileImage} style={{ width: 35, height: 35, borderRadius: 20 }} />
                                            )}
                                        </View>
                                        <View
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                rowGap: 5,
                                                flexWrap: "wrap",
                                                backgroundColor: '#eee',
                                                padding: 10,
                                                borderRadius: 20,
                                                width: '100%'
                                            }}
                                        >
                                            <View>
                                                <Text style={{ color: "gray", fontSize: 14 }}>
                                                    {"@" + comment.userId.name}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={{ fontSize: 16 }}>{comment.comment}</Text>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingEnd: 0 }}>
                                                <View >
                                                    <Text style={{ fontSize: 11, color: "gray", }} >
                                                        {timeAgo(comment.createdAt) + " ago"}
                                                    </Text>
                                                </View>
                                                {comment.userId._id == user._id && <DeleteComment
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
        marginTop: 0,
        width: '100%',
        paddingBottom: 80
    },

    

})

export default CommentsSection;