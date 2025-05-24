import client, { meme as client_2 } from "../api/client";
import {ActivityIndicator, TouchableOpacity} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";


const DeleteComment = ({listing, comment, setComments}) => {
    const [deleteLoading, setDeleteLoading] = useState(false)

    if (deleteLoading) return <ActivityIndicator />
    return (
        <TouchableOpacity style={{paddingHorizontal:10}}  onPress={
            async () => {
              setDeleteLoading(true)
              console.log('res.data')
              console.log('res.data6')
              console.log(comment)
              console.log(listing)
              const res = await client_2.delete(`/comments/${listing._id}`, { commentId: comment._id }  )
                console.log('res.data4')
                setDeleteLoading(false)
              console.log(res.data)
              if (res.data) {
                
                setComments(res.data.reverse())
              }
              
            }
          } >
          
          <MaterialCommunityIcons name="delete"  />
        </TouchableOpacity>

    )
}

export default DeleteComment