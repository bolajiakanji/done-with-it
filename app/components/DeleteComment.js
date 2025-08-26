import { client_2 } from "../api/client";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

const DeleteComment = ({ listing, comment, setComments }) => {
  const [deleteLoading, setDeleteLoading] = useState(false)

  if (deleteLoading) return <ActivityIndicator />
  return (
    <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={
      async () => {
        setDeleteLoading(true)
        const res = await client_2.delete(`/comments/${listing._id}`,
          { commentId: comment._id })
        setDeleteLoading(false)
        if (res.data) setComments(res.data.reverse())
      }
    } >

      <MaterialCommunityIcons name="delete" />
    </TouchableOpacity>

  )
}

export default DeleteComment