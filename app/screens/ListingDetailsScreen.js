import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions,   } from "react-native";
import { Image, } from "expo-image";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import Carousel from 'react-native-reanimated-carousel';
import client from '../api/client'
import {configureReanimatedLogger} from 'react-native-reanimated';

configureReanimatedLogger({
  strict: false,
  });
  

const width = Dimensions.get('window').width;
const marginTop = (width/2) 

function ListingDetailsScreen({ route }) {
  const [seller, setSeller] = useState()
  const listing = route.params;
  const endPoint = '/user/' + listing.userId
  console.log(endPoint + 'for real')
  useEffect(() => {
    console.log('me and you go')
    getSeller()
    console.log('me and yo')
  },[])
  
  const getSeller = async () => {
    console.log('ok here')
    const sellerInfo =await client.get('/user/2', {})
    setSeller(sellerInfo.data)
    console.log(sellerInfo.data + 'areypuohd')
    console.log('here grt')
  }

  const uriArray = []
  
  for (const image of listing.images) {
    uriArray.push(image.url)
  }

  return (
    <View>
      <View style={{ flex: 1, }}>
        <Carousel
          loop
          width={width}
          height={width / 2}
          autoPlay={true}
          data={uriArray}
          scrollAnimationDuration={1500}
          //onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={(data) => {

            
            return (
              <View
                style={{
                  flex: 1,
                  
                  justifyContent: 'center',
                }}
              >
                <Image source={data.item} style={{ flex: 1 }}  />
              </View>
            )
          }}
        />
      </View>
        

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={{}}>${listing.description}</Text>
        <Text style={styles.price}>${listing.price}</Text>

        <View style={styles.userContainer}>

          {seller && <ListItem
            image=''
            title={seller.name}
            subTitle={`${seller.listings} listings`}
          />
          }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    marginTop: marginTop,
    padding: 10
  },
  
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },

});

export default ListingDetailsScreen;
