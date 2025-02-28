import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from 'expo-image';


import Text from "./Text";
import colors from "../config/colors";
import en from 'javascript-time-ago/locale/en'
import TimeAgo from 'javascript-time-ago'

TimeAgo.setDefaultLocale(en.locale)
TimeAgo.addLocale(en)



function Card({ title, subTitle, imageUrl, timejs, onPress, thumnailUrl, cachePolicy, description }) {
  
  TimeAgo.setDefaultLocale(en.locale)
  TimeAgo.addLocale(en)
  

const timeAgo = new TimeAgo('en-US')

  const num = subTitle
  const d = new Date(timejs)
  const date = parseInt(d.getTime())
  console.log('date')
  console.log(date, 'mini-minute')
  console.log(Date.now() - date)
  const time = timeAgo.format(date, 'mini-minute')
  const bolaji = (me) => {
    const d = new Date(timejs)
  const date = parseInt(d.getTime())
  console.log('date')
  console.log(date)
  console.log(Date.now() - date)
  }

  
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
          <Text style={{fontWeight: 'bold',fontSize:12, color: colors.secondary}}>#</Text>{subTitle.toLocaleString()}
            </Text>
          <Text>{time} ago</Text> 
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
    height: 250,
  marginHorizontal: 3
  },
  detailsContainer: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 150,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 17,
    textAlign:'center'
  },
  title: {
    marginBottom: 2,
  },
});

export default Card;
