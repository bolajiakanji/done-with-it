import { MaterialCommunityIcons } from "@expo/vector-icons";
import { client_2 } from "../api/client";
import { Keyboard, StyleSheet } from "react-native";

function PostComment({
  endPoint,
  postingComments,
  setPostingComments,
  setComments,
  setLoading,
  setModal
}) {

  const handleSubmit = async () => {
    setLoading(true)
    const res = await client_2.post(endPoint, {
      comment: postingComments
    })
    setPostingComments('')
    setLoading(false)
    if (res.ok) {
      setComments(res.data.reverse())
      setModal(false)
      Keyboard.dismiss()
    }
  }

  return (
    <MaterialCommunityIcons
      onPress={() => handleSubmit()}
      name="send" size={20} style={styles.sender} />
  )
}

const styles = StyleSheet.create({
  sender: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 25
  }
})

export default PostComment