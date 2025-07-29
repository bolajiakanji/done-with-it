import {
    View,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Text,
    
} from "react-native";
import React, { useEffect, useRef, useState, useContext } from "react";
import { AdvancedImage } from "cloudinary-react-native";
import PostComment from "./PostComment";
import getPluralisedWord from "../utility/pluralisedWord";
import myCloud from "../utility/cid";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import timeAgo from "../utility/timeAgo";
import useAuth from "../auth/useAuth";


// import Text from "./components/Text";



function CommentsSection({ comments, listing, loadingCommentOnPageVisit, postingComments,
    loadingComment, height, setVisibility, endPoint, setComments, setPostingComments, setLoadingComment, DeleteComment
}) {
        const { user } = useAuth();
    
    const count = useRef(true)

    const numberOfComments =
        count.current && comments.length == 0 ? listing.comments : comments.length;



    return (



        <View style={{ backgroundColor: "#aaa" }}>


            <View
                style={{
                    height: height / 2.2,
                    position: "relative", marginTop: 0, width: '100%',
                    paddingBottom: 80
                }}
            >
                <View style={{ backgroundColor: '#e6f2ff', paddingLeft: 20, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 14 }}>
                        {getPluralisedWord(numberOfComments, "comment")}
                    </Text>
                </View>
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
                            console.log('cli')
                            loadListing()
                        }}>
                            <Text style={{ textAlign: 'center', color: 'blue' }}>click to retry </Text>
                        </TouchableOpacity >
                    </View>
                }


                {!loadingCommentOnPageVisit && comments.length !== 0 &&

                    <View
                        style={{
                            // height: height/3.7,
                            backgroundColor: "#ccc",
                            paddingHorizontal: 10,
                        }}
                    >
                        <ScrollView style={{ width: "100%", paddingRight: 20, paddingBottom: 180, backgroundColor: '' }}>
                            {comments.map((comment) => {
                                const profileImage = myCloud().image(comment.userId.image)
                                console.log(comment.userId.image)
                                console.log('profileImage23')
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
                                            <Text style={{ fontSize: 16 }}>{comment.comment}</Text>
                                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingEnd: 0 }}>
                                                <View >
                                                    <Text style={{ fontSize: 11, color: "gray" }} numberOfLines={5}>
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

export default CommentsSection;