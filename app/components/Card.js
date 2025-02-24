import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from 'expo-image';


import Text from "./Text";
import colors from "../config/colors";


function Card({ title, subTitle, imageUrl, onPress, thumnailUrl, cachePolicy , description}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}  >
      <View style={styles.card}>
        <Image style={styles.image} source={imageUrl} placeholder={thumnailUrl}
          cachePolicy='memory-disk'
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {description}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {subTitle}
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
    width: '50%',
    height: 235,
  marginHorizontal: 3
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 150,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default Card;
