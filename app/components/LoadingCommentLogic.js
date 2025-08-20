import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native"

function LoadingCommentLogic({ 
    loadingCommentOnPageVisit, 
    comments, 
    numberOfComments, 
    loadListing, 
    height }) {
    const topMargin = height / 3.8

    return (
        <View>
            {loadingCommentOnPageVisit &&
                <View style={StyleSheet.onLoadingCommentBox}>
                    <ActivityIndicator size={30} />
                    <Text style={styles.onLoadingCommentText}>Loading Comments</Text>
                </View>
            }

            {!loadingCommentOnPageVisit && comments.length === 0 && !numberOfComments &&
                <View style={[styles.noComment, { height: topMargin }]}>
                    <Text style={{ textAlign: 'center' }}>No Comments yet</Text>
                </View>
            }

            {!loadingCommentOnPageVisit && comments.length === 0 && !!numberOfComments &&
                <View style={[styles.noComment, { height: topMargin }]}>
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
        marginTop: 50
    },

    onLoadingCommentText: {
        textAlign: 'center'
    },

    noComment: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    retry: {
        textAlign: 'center',
        color: 'blue'
    }
})
export default LoadingCommentLogic