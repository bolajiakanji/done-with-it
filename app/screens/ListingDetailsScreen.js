import React from "react";
import { View, StyleSheet, Dimensions,   } from "react-native";
import { Image, } from "expo-image";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import Carousel from 'react-native-reanimated-carousel';


function ListingDetailsScreen({ route }) {
  const listing = route.params;
  const width = Dimensions.get('window').width;

  const uriArray = []
  
  for (const image of listing.images) {
    uriArray.push(image.url)
  }
console.log('ok')
  console.log(uriArray)
 
  console.log(listing.images[0].url);
  return (
    <View>
      <View style={{ flex: 1 }}>
        <Carousel
          loop
          width={width}
          height={width / 2}
          autoPlay={true}
          data={uriArray}
          scrollAnimationDuration={1500}
          onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={(data, index) => {

            console.log(data.item + 'meto')
            return (
              <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  justifyContent: 'center',
                }}
              >
                <Image source={data.item} style={{ flex: 1 }} cachePolicy={true} />
              </View>
            )
          }}
        />
      </View>
        

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.price}>${listing.price}</Text>
        <View style={styles.userContainer}>
          <ListItem
            image=''
            title="Mosh Hamedani"
            subTitle="5 Listings"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;
