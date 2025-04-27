import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View,Text, TouchableOpacity } from "react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";
import client from "../api/client";
import { AdvancedImage } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";
import getPluralisedWord from "../utility/pluralisedWord";
import getLikesColor from "../utility/likesColor";
import useAuth from "../auth/useAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import timeAgo from "../utility/timeAgo";







const cld = new Cloudinary({
  cloud: {
      cloudName: 'dlutiw9i4'
  }
});
const myImage = cld.image('items/ca4ed4c3ed3f5c1689437f57f5a12408_full');



function PosterItems(props) {
  const [itemsPosted, setItemPosted] = useState([])
   const {user} =useAuth()
  
  const userId = '67cbf3c7c11d6e3f8b3b8241'
  const displayTime = timeAgo(itemsPosted.createdAt);

  
  const getUserItems = async () =>{
  console.log('before')
  console.log('runhere')
    const res = await client.get(`/mk/${userId}`)
    console.log(res)
    console.log('runhere2')
    setItemPosted(res.data)
  }
  useEffect( () => {
    getUserItems()
  },[]
  )
  const likesColor = getLikesColor(user._id, itemsPosted.likes)
  const numberOfLikes = itemsPosted?.likes?.length

  return (
    <Screen>
      <ScrollView>
        <Text>you say</Text>
        {itemsPosted?.map(itemsPosted => (
          <TouchableOpacity
          //  onPress={onPress}
          >
      
            <View style={styles.card}>
            
              <AdvancedImage cldImg={myImage} style={styles.image} />
          
  
              <View style={styles.detailsContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {itemsPosted.title}
                </Text>
                <Text style={{ fontSize: 13 }} numberOfLines={1}>
                  {itemsPosted.description}
                </Text>
  
                <Text style={styles.subTitle} numberOfLines={1}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 12,
                      color: colors.secondary,
                    }}
                  >
                    #
                  </Text>
                  {parseInt(itemsPosted.price).toLocaleString()}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "65%",
                  }}
                >
                  <Text style={{ color: likesColor, fontSize: 12 }}>
                    {numberOfLikes + " "}
                    <MaterialCommunityIcons name="thumb-up" />
                  </Text>
                  <Text style={{ color: "#bbb", fontSize: 12 }}>
                    {displayTime} ago
                  </Text>
                </View>
                <Text style={{ textAlign: "center", color: "gray", fontSize: 12 }}>
                  {getPluralisedWord(itemsPosted.comments, 'comment')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
    </Screen>
)}


    const styles = StyleSheet.create({
      card: {
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 15,
        overflow: "hidden",
        width: "48%",
        height: 270,
      },
      detailsContainer: {
        padding: 5,
      },
      image: {
        width: "100%",
        height: 160,
      },
      subTitle: {
        color: colors.secondary,
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
      },
      title: {
        marginBottom: 0,
        fontSize: 15,
        fontWeight: "bold",
        color: "gray",
      },
    });
    
    
    export default PosterItems;
