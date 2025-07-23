import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Linking,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Keyboard,
  Text
} from "react-native";
import React, { useEffect, useRef, useState,useContext } from "react";
import { AdvancedImage } from "cloudinary-react-native";



import Carousel from "react-native-reanimated-carousel";


import { MaterialCommunityIcons } from "@expo/vector-icons";
import myCloud from "../utility/cid";




function ListingDetailCarousel({ width, height, ref, listing, data,  }) {
    const [index, setIndex] = useState(0);
      const uriArray = listing.images;
      const arrowTopMargin = height / 8;
      const marginTop = height /3.5;


const cld = myCloud()
  

return (
<View style={{ flex: 1, position: "relative" }}>
        <Carousel
          ref={ref}
          loop
          width={width}
          height={height / 3.6}
          //autoPlay={listing.images.length > 1 ? true : false}
          data={listing.images}
          scrollAnimationDuration={2000}
          onSnapToItem={(index) => setIndex(index)}
          renderItem={(data) => {
            const myImage = cld.image(data.item);

            return (
              <View
                style={{
                  flex: 1,

                  justifyContent: "center",
                }}
              >
                <AdvancedImage cldImg={myImage} style={[styles.image, {marginTop}]} />

                {/* <Image source={data} style={{ flex: 1 }} /> */}
              </View>
            );
          }}
        />
        <View
          style={{
            position: "absolute",
            right: 10,
            top: 5,
            backgroundColor: "black",
            borderRadius: "50%",
            padding: 2,
          }}
        >
          <Text style={{ color: "white", fontSize: 11 }}>
            {`${index + 1}/${uriArray.length} `}
          </Text>
        </View>
        {uriArray.length > 1 && (
          <>
            <TouchableOpacity
              onPress={() => previous()}
              style={{ position: "absolute", top: arrowTopMargin, left: 0 }}
            >
              <MaterialCommunityIcons
                color="black"
                name="chevron-left"
                size={25}
                style={{
                  margin: 5,
                  borderRadius: 15,
                  backgroundColor: "white",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => next()}
              style={{ position: "absolute", top: arrowTopMargin, right: 0 }}
            >
              <MaterialCommunityIcons
                color="black"
                name="chevron-right"
                size={25}
                style={{
                  margin: 5,
                  borderRadius: 15,
                  backgroundColor: "white",
                }}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
)}

const styles = StyleSheet.create({
  detailsContainer: {
    
    marginStart: 15,
    marginEnd: 10,
    
  },
})


export default ListingDetailCarousel;
