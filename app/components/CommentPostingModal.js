import {
    View,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Text,
    Keyboard
} from "react-native";
import ReactNativeModal from "react-native-modal";
import PostComment from "./PostComment";

function CommentPostingModal( {isVisible, width, postingComments,
    loadingCommentOnPageVisit,
    loadingComment, setVisibility, endPoint, setComments, setPostingComments,setLoadingComment
}) {

    return (
<ReactNativeModal
        isVisible={isVisible}
        avoidKeyboard={true}
        coverScreen={false}
        style={{
          backgroundColor: 'transparent',
          margin: 0,
          
          top: '20%',
          display: 'flex',justifyContent: 'center',alignItems: 'flex-end',width: '100%'
        }}
       hasBackdrop={true}
        onBackButtonPress={()=>setVisibility(false)}
        onBackdropPress={() => setVisibility(false)}
        onModalHide={() => {
          Keyboard.dismiss()
        }}
        backdropOpacity={0}
      >
        <View style={{width, marginBottom: 80, paddingTop: 15}}>
        <View style={{
                  display: "flex",
                 // marginTop: 20,
                  flexDirection: "row",
             justifyContent: "center",
                  alignItems: 'center',
                gap: 15,
          width: '100%',
          //position: 'absolute',
          backgroundColor: '#bbb',
            height: 200, 
          bottom:10
        
                
                  
                  
        }}>
            <View style={{ width: '75%',  }}>

<TextInput style={{ backgroundColor: 'white', position: 'absolute',bottom: '-10%',width: '100%',borderRadius: 20, paddingHorizontal:15, }}
            allowFontScaling={false}
            autoCorrect={true}
                clearTextOnFocus={true}
                autoFocus={true}
            onChangeText={(e) => {
                  setPostingComments(e)
            }}
//style={{backgroundColor: 'white'}}
              multiline numberOfLines={4} value={postingComments} />
            </View>
          {loadingComment && <View style={{
              //height: 40,
              
            }}><ActivityIndicator /></View>}
                {postingComments && !loadingComment && (
                
                  <PostComment
                    endPoint={endPoint}
                    setComments={setComments}
                    postingComments={postingComments}
                    setPostingComments={setPostingComments}
                    loading={loadingComment}
                setLoading={setLoadingComment}
                setModal={setVisibility}
                />
                  
            )}
            </View>
        </View>
      </ReactNativeModal>
    )
}

export default CommentPostingModal