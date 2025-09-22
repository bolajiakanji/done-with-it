import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native"

function LoadingCommentLogic({
    loadingCommentOnPageVisit,
    comments,
    numberOfComments,
    loadListing,
    heightLogic
    
    
}) {

    

    return (
        <View style= {{height:!heightLogic ? '': 300}}>
            {loadingCommentOnPageVisit &&
                <View style={styles.onLoadingCommentBox}>
                    <ActivityIndicator size={30} />
                    <Text style={styles.onLoadingCommentText}>Loading Comments</Text>
                </View>
            }

            {!loadingCommentOnPageVisit && comments.length === 0 && !numberOfComments &&
                <View style={styles.noComment}>
                    <Text style={{ textAlign: 'center' }}>No Comments yet</Text>
                </View>
            }

            {!loadingCommentOnPageVisit && comments.length === 0 && !!numberOfComments &&
                <View style={styles.noComment}>
                    <Text style={{ textAlign: 'center' }}>No comments gotten </Text>
                    <TouchableOpacity onPress={() => loadListing()}>
                        <Text style={styles.retry}>click to retry </Text>
                    </TouchableOpacity >
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    onLoadingCommentBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 20
        
    },

    onLoadingCommentText: {
        textAlign: 'center'
    },

    noComment: {
        display: 'flex',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    retry: {
        textAlign: 'center',
        color: 'blue'
    }
})
export default LoadingCommentLogic