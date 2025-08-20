import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import React, { useRef, useState } from "react";
import { AdvancedImage } from "cloudinary-react-native";
import Carousel from "react-native-reanimated-carousel";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import myCloud from "../utility/cid";

function ListingDetailCarousel({ width, height, listing, data, }) {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);

  const uriArray = listing.images;
  const carouselHeight = height / 6;
  const cld = myCloud()

  const previous = () => {
    ref?.current?.prev();
  };

  const next = () => {
    ref?.current?.next();
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        loop
        width={width}
        height={carouselHeight}
        //autoPlay={listing.images.length > 1 ? true : false}
        data={listing.images}
        scrollAnimationDuration={2000}
        onSnapToItem={(index) => setIndex(index)}
        renderItem={(data) => {
          const myImage = cld.image(data.item);
          return (
            <View style={styles.wrapper}>
              <AdvancedImage cldImg={myImage} style={styles.image} />
            </View>
          );
        }}
      />
      <View style={styles.imageCountWrapper}>
        <Text style={styles.imageCount}>
          {`${index + 1}/${uriArray.length} `}
        </Text>
      </View>

      {uriArray.length > 1 && (
        <>
          <TouchableOpacity
            onPress={() => previous()}
            style={stylesleftArrowWrapper}
          >
            <MaterialCommunityIcons
              color="black"
              name="chevron-left"
              size={25}
              style={styles.arrow}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => next()}
            style={styles.rightArrowWrapper}
          >
            <MaterialCommunityIcons
              color="black"
              name="chevron-right"
              size={25}
              style={styles.arrow}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  arrow: {
    margin: 5,
    borderRadius: 15,
    backgroundColor: "white",
  },

  leftArrowWrapper: {
    position: "absolute",
    top: arrowTopMargin,
    left: 0
  },

  rightArrowWrapper: {
    position: "absolute",
    top: arrowTopMargin,
    right: 0
  },

  container: {
    flex: 1,
    position: "relative"
  },

  image: {
    width: "100%",
    height: "100%",
  },

  imageCount: {
    color: "white",
    fontSize: 11
  },

  imageCountWrapper: {
    position: "absolute",
    right: 10,
    top: 5,
    backgroundColor: "black",
    borderRadius: "50%",
    padding: 2,
  },

  wrapper: {
    flex: 1,
    justifyContent: "center",
  }
})

export default ListingDetailCarousel;
