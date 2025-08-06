import { StyleSheet, Text, View } from "react-native"
import getPluralisedWord from "../utility/pluralisedWord"

function CommentHighlight(numberOfComments) {

    return (
        <View style={styles.commentsNumber}>
            <Text style={{ fontSize: 14 }}>
                {getPluralisedWord(numberOfComments, "comment")}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    commentsNumber: {
        backgroundColor: '#e6f2ff',
        paddingLeft: 20,
        paddingVertical: 5
    },
})

export default CommentHighlight