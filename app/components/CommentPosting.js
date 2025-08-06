import {
    View,
    ActivityIndicator,
    TextInput,
    StyleSheet
} from "react-native";
import PostComment from "./PostComment";

function CommentPosting({
    loadingCommentOnPageVisit,
    postingComments,
    loadingComment,
    setVisibility,
    endPoint,
    setComments,
    setPostingComments,
    setLoadingComment
}) {
    return (
        <View style={styles.container}>
            <View style={styles.postWrapper}>
                {!loadingCommentOnPageVisit && <View style={styles.textInputWidth}>
                    <TextInput
                        height={40}
                        value={postingComments}
                        style={styles.textInput}
                        multiline={false}
                        placeholder="Type comment"
                        onChangeText={(e) => setPostingComments(e)}
                        onPress={() => setVisibility(true)}
                    />
                </View>
                }

                {loadingComment &&
                    <View style={styles.indicatorWrappper}>
                        <ActivityIndicator />
                    </View>}

                {postingComments && !loadingComment &&
                    <PostComment
                        endPoint={endPoint}
                        setComments={setComments}
                        postingComments={postingComments}
                        setPostingComments={setPostingComments}
                        loading={loadingComment}
                        setLoading={setLoadingComment}
                    />
                }
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        bottom: 5
    },

    indicatorWrappper: {
        display: 'flex',
        justifyContent: 'center'
    },

    postWrapper: {
        display: "flex",
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'flex-end',
        gap: 10,
        width: '100%'
    },

    textInput: {
        padding: 10,
        width: "100%",
        paddingHorizontal: 15,
        backgroundColor: 'white',
        borderRadius: 20
    },

    textInputWidth: {
        width: '75%',
    }
})

export default CommentPosting