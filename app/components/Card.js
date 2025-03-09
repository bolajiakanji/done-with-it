import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from 'expo-image';


import Text from "./Text";
import colors from "../config/colors";
import en from 'javascript-time-ago/locale/en'
import TimeAgo from 'javascript-time-ago'

TimeAgo.setDefaultLocale(en.locale)
TimeAgo.addLocale(en)



function Card({ item, onPress }) {
  
  TimeAgo.setDefaultLocale(en.locale)
  TimeAgo.addLocale(en)
  

const timeAgo = new TimeAgo('en-US')

  
  const d = new Date(item.createdAt)
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
        <Image style={styles.image} source={item.images[0].url} placeholder={item.images[0].thumnailUrl}
          cachePolicy='memory-disk'
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={{}} numberOfLines={1}>
            {item.description}
          </Text>
        
            
          <Text style={styles.subTitle} numberOfLines={1}>
          <Text style={{fontWeight: 'bold',fontSize:12, color: colors.secondary}}>#</Text>{parseInt(item.price).toLocaleString()}
          </Text> 
          <View style={{display:'flex', flexDirection: 'row', justifyContent:'space-between',width:'65%'}}>
            <Text style={{ color: '#bbb', fontSize: 12 }}>{time} ago</Text> 
          <Text style={{color: '#bbb', fontSize: 12}} >
            {item.likes ? item.likes.length +' likes' : ''}
          </Text>
            </View>
          <Text style={{textAlign: 'center',color: 'gray', fontSize: 12}} >
            {item.comment == undefined ? '0 comment':item.comment + ' comments'}
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
    width: '48.5%',
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
    fontWeight: 'bold',
    fontSize: 17,
    textAlign:'center'
  },
  title: {
    marginBottom: 2,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'gray'
  },
});

export default Card;
