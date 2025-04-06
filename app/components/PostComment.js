
import { MaterialCommunityIcons } from "@expo/vector-icons";
import client from "../api/client";
import { useState } from "react";




function PostComment({ endPoint, postingComments, setPostingComments, setComments, setLoading }) {
  
    
    return (
        <MaterialCommunityIcons
                  onPress={async () => {
          console.log('clicked')
          setPostingComments('')
          setLoading(true)
                    const res = await client.post(endPoint, {
                      comment: postingComments
                    })
          setLoading(false)
                    console.log(res.data)
                  if (res.data) setComments(res.data.reverse())
                  }}
                  name="send" size={20} style={{ padding: 10, backgroundColor: 'white', borderRadius: 25 }} />
    )
}

export default PostComment