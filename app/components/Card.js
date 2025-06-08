import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import Text from "./Text";
import colors from "../config/colors";
import timeAgo from "../utility/timeAgo";
import { AdvancedImage } from "cloudinary-react-native";
import SkeletonLoading from "expo-skeleton-loading";
import getPluralisedWord from "../utility/pluralisedWord";
import getLikesColor from "../utility/likesColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAuth from "../auth/useAuth";




function Card({ item, onPress,myImage }) {
  const displayTime = timeAgo(item.createdAt);
 const {user} =useAuth()
const likesColor = getLikesColor(user._id, item.likes)
  const numberOfLikes = item.likes.length
      

  return (
    <TouchableWithoutFeedback onPress={onPress} >
      
      <View style={styles.card}>
          
        {<AdvancedImage cldImg={myImage} style={styles.image} />}
        

        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={{fontSize: 13}} numberOfLines={1}>
            {item.description}
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
            {parseInt(item.price).toLocaleString()}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "65%",
              marginLeft: 5
            }}
          >
            <Text style={{ color: likesColor, fontSize: 12 }}>
              {numberOfLikes + " "}
              <MaterialCommunityIcons name="thumb-up" />
            </Text>
            <Text style={{ color: "gray", fontSize: 12 }}>
              {displayTime} ago
            </Text>
          </View>
          <Text style={{ textAlign: "center", color: "gray", fontSize: 12 }}>
            {getPluralisedWord(item.comments, 'comment')}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 10,
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

export default Card;
