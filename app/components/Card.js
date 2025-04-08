import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "expo-image";
import Text from "./Text";
import colors from "../config/colors";
import timeAgo from "../utility/timeAgo";
import { AdvancedImage } from "cloudinary-react-native";
import SkeletonLoading from "expo-skeleton-loading";
import getPluralisedWord from "../utility/pluralisedWord";
import getLikesColor from "../utility/likesColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";




function Card({ item, onPress,myImage }) {
  const displayTime = timeAgo(item.createdAt);
  const [go, setGo] = useState(false)
  const likesColor = getLikesColor(item.userId._id, item.likes)
  const numberOfLikes = item.likes.length
      

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      
      <View style={styles.card}>
        {go && (
          <SkeletonLoading background={"#adadad"} highlight={"#ffffff"}>
                 
          <View
           style={styles.image }
         /> 
</SkeletonLoading>  )}
        <AdvancedImage cldImg={myImage} style={styles.image} />
        

        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={{}} numberOfLines={1}>
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
    marginBottom: 20,
    overflow: "hidden",
    width: "48.5%",
    height: 270,
  },
  detailsContainer: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 160,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
  title: {
    marginBottom: 2,
    fontSize: 17,
    fontWeight: "bold",
    color: "gray",
  },
});

export default Card;
