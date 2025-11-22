import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import Text from "./Text";
import colors from "../config/colors";
import getLikesColor from "../utility/likesColor";
import getPluralisedWord from "../utility/pluralisedWord";
import useAuth from "../auth/useAuth";
import timeAgo from "../utility/timeAgo";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Card({ item, onPress, myImage }) {
  const { user } = useAuth()

  const displayTime = timeAgo(item.createdAt);
  const likesColor = getLikesColor(user._id, item.likes)
  const numberOfLikes = item.likes.length
  const imageUrl = myImage.toURL()


  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={{ padding: 5 }}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={{ fontSize: 13 }} numberOfLines={1}>
            {item.description}
          </Text>
          <Text style={styles.subTitle} numberOfLines={1}>
            <Text style={styles.hash}>
              #
            </Text>
            {parseInt(item.price).toLocaleString()}
          </Text>
          <View style={styles.likesBox}>
            <Text style={[{ color: likesColor }, { fontSize: 12 }]}>
              {numberOfLikes + " "}
              <MaterialCommunityIcons name="thumb-up" />
            </Text>
            <Text style={styles.timeAgo}>
              {displayTime} ago
            </Text>
          </View>
          <Text style={styles.comment}>
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

  comment: {
    textAlign: "center",
    color: "gray",
    fontSize: 12
  },

  detailsContainer: {
    padding: 5,
  },

  hash: {
    fontWeight: "bold",
    fontSize: 12,
    color: colors.secondary,
  },

  image: {
    width: "100%",
    height: 160,
  },

  likesBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "65%",
    marginLeft: 5
  },

  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },

  timeAgo: {
    color: "gray",
    fontSize: 12
  },

  title: {
    marginBottom: 0,
    fontSize: 15,
    fontWeight: "bold",
    color: "gray",
  },
});

export default Card;
