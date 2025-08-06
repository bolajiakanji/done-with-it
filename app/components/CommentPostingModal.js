import {
    View,
    ActivityIndicator,
    TextInput,
    Keyboard,
    StyleSheet
} from "react-native";
import ReactNativeModal from "react-native-modal";
import PostComment from "./PostComment";

function CommentPostingModal({
    isVisible,
    width,
    postingComments,
    loadingComment,
    setVisibility,
    endPoint, setComments,
    setPostingComments,
    setLoadingComment
}) {

    return (
        <ReactNativeModal
            style={styles.modal}
            isVisible={isVisible}
            avoidKeyboard={true}
            coverScreen={false}
            hasBackdrop={true}
            onBackButtonPress={() => setVisibility(false)}
            onBackdropPress={() => setVisibility(false)}
            onModalHide={() => Keyboard.dismiss()}
            backdropOpacity={0}
        >
            <View style={[styles.modalContainer, { width }]}>
                <View style={styles.modalView}>
                    <View style={styles.innerWidth}>
                        <TextInput style={styles.textInput}
                            allowFontScaling={false}
                            autoCorrect={true}
                            clearTextOnFocus={true}
                            autoFocus={true}
                            onChangeText={(e) => setPostingComments(e)}
                            multiline
                            numberOfLines={4}
                            value={postingComments} />
                    </View>

                    {loadingComment && <View ><ActivityIndicator /></View>}

                    {postingComments && !loadingComment &&
                        <PostComment
                            endPoint={endPoint}
                            setComments={setComments}
                            postingComments={postingComments}
                            setPostingComments={setPostingComments}
                            loading={loadingComment}
                            setLoading={setLoadingComment}
                            setModal={setVisibility}
                        />
                    }
                </View>
            </View>
        </ReactNativeModal>
    )
}

const styles = StyleSheet.create({
    innerWidth: {
        width: "75%"
    },

    modal: {
        backgroundColor: 'transparent',
        margin: 0,
        top: '20%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100%'
    },

    modalContainer: {
        marginBottom: 80,
        paddingTop: 15
    },

    modalView: {

        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        gap: 15,
        width: '100%',
        backgroundColor: '#bbb',
        height: 200,
        bottom: 10
    },

    textInput: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: '-10%',
        width: '100%',
        borderRadius: 20,
        paddingHorizontal: 15,
    }

})

export default CommentPostingModal