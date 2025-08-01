import {
    View,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Text
} from "react-native";
import PostComment from "./PostComment";
function CommentPosting({loadingCommentOnPageVisit,
     postingComments, loadingComment, setVisibility, endPoint, setComments, setPostingComments,setLoadingComment
 }) {
return (
    <View style={{ position: 'absolute', width: '100%', bottom: 5 }}>

                    <View
                        style={{
                            display: "flex",
                            marginTop: 10,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: 'flex-end',
                            gap: 10,
                            width: '100%'


                        }}
                    >

                        {!loadingCommentOnPageVisit && <View style={{ width: '75%', }}>
                            <TextInput

                                height={40}
                                // minHeight={40}
                                //defaultValue={}

                                value={postingComments}
                                //position='absolute'

                                style={{
                                    padding: 10, width: "100%",
                                    paddingHorizontal: 15,
                                    // position: 'absolute',
                                    // bottom: postingComments !== '' ? 0 : -40, 
                                    backgroundColor: 'white', borderRadius: 20
                                }}

                                multiline={false}
                                placeholder="Type comment"
                                onChangeText={(e) => {

                                    setPostingComments(e);


                                }}
                                onPress={() => setVisibility(true)}
                            // onContentSizeChange={(event) => {
                            //   setContent(event.nativeEvent.contentSize.height)
                            // }}
                            />
                        </View>
                        }
                        {loadingComment && <View style={{
                            //height: 40,
                            display: 'flex', justifyContent: 'center'
                        }}><ActivityIndicator /></View>}
                        {postingComments && !loadingComment && (

                            <PostComment
                                endPoint={endPoint}
                                setComments={setComments}
                                postingComments={postingComments}
                                setPostingComments={setPostingComments}
                                loading={loadingComment}
                                setLoading={setLoadingComment}
                            />

                        )}
                    </View>
                </View>
  
)
}

export default CommentPosting