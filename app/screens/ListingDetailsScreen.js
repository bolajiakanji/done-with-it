import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import Screen from "../components/Screen";


import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import Carousel from "react-native-reanimated-carousel";
import client from "../api/client";
import { configureReanimatedLogger } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useApi } from "../hooks";

configureReanimatedLogger({
  strict: false,
});

const width = Dimensions.get("window").width;
const marginTop = width / 2;

function ListingDetailsScreen({ route }) {
  const [seller, setSeller] = useState();
  const [index, setIndex] = useState(0);
  const getSeller = () => {
    
    return client.get(endPoint);
  };
  const { data, request, error, setError } = useApi(getSeller);
  const ref = useRef(null);

  const listing = route.params;
  const endPoint = "/user/" + listing.userId;

  useEffect(() => {
    
    loadListing();
    
  }, []);

  const loadListing = async () => {
    const response = await request({});
    
    if (!response.ok) {
      if (response.data) setError(response.data.error);
      else {
        setError("An unexpected error occured.");
      }
    }
    
  };

  const uriArray = [];

  for (const image of listing.images) {
    uriArray.push(image.url);
  }

  const previous = () => {
    ref?.current?.prev();
  };
  const next = () => {
    ref?.current?.next();
  };

  return (
    <Screen style={{position: 'relative'}} sta>
      <View style={{ flex: 1 }}>
        <Carousel
          ref={ref}
          loop
          width={width}
          height={width / 2}
          autoPlay={true}
          data={uriArray}
          scrollAnimationDuration={1500}
          pagingEnabled={true}
          onSnapToItem={(index) => setIndex(index)}
          animationConfig={{ mode: "vertical" }}
          renderItem={(data) => {
            return (
              <View
                style={{
                  flex: 1,

                  justifyContent: "center",
                }}
              >
                <Image source={data.item} style={{ flex: 1 }} />
              </View>
            );
          }}
        />
      </View>
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
        <Text style={{ color: "white" }}>
          {`${index + 1}/${uriArray.length} `}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => previous()}
        style={{ position: "absolute", top: width / 6, left: 0 }}
      >
        <MaterialCommunityIcons color="black" name="arrow-left" size={40} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => next()}
        style={{ position: "absolute", top: width / 6, right: 0 }}
      >
        <MaterialCommunityIcons color="black" name="arrow-right" size={40} />
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={{}}>{listing.description}</Text>
        <Text style={styles.price}>${listing.price}</Text>

        <ListItem
          image={listing.userId.image}
          title={listing.userId.name}
          subTitle={`${listing.userId.userListings} listings`}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    marginTop: marginTop,
    padding: 10,
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

// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   StyleSheet,
//   Dimensions,
//   TouchableHighlight,
//   TouchableOpacity,
// } from "react-native";
// import { Image } from "expo-image";

// import colors from "../config/colors";
// import ListItem from "../components/lists/ListItem";
// import Text from "../components/Text";
// import Carousel from "react-native-reanimated-carousel";
// import client from "../api/client";
// import { configureReanimatedLogger } from "react-native-reanimated";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useApi } from "../hooks";

// // configureReanimatedLogger({
// //   strict: false,
// // });

// const width = Dimensions.get("window").width;
// const marginTop = width / 2;

// function ListingDetailsScreen({ route }) {
//   const [seller, setSeller] = useState();
//   const [index, setIndex] = useState(0);
//   const {request, setError, data} = useApi(getSeller)
//   const ref = useRef(null);

//   const listing = route.params;
//   const endPoint = "/user/" + listing.userId;

//   useEffect(() => {
//     loadListing()
//   }, []);

//   const getSeller = async () => {
//     console.log("ok here");
//     client.get(endPoint);

//   };
//   const loadListing = async () => {
//     const response = await request({});
//     if (!response.ok) {
//       if (response.data) setError(response.data.error);
//       else {
//         setError("An unexpected error occured.");
//       }
//     }
//   }

//   const uriArray = [];

//   for (const image of listing.images) {
//     uriArray.push(image.url);
//   }

//   const previous = () => {
//     ref?.current?.prev();
//   };
//   const next = () => {
//     ref?.current?.next();
//   };

//   return (
//     <View>
//       <View style={{ flex: 1 }}>
//         <Carousel
//           ref={ref}
//           loop
//           width={width}
//           height={width / 2}
//           autoPlay={true}
//           data={listing.images}
//           scrollAnimationDuration={1500}
//           pagingEnabled={true}
//           onSnapToItem={(index) => setIndex(index)}
//           animationConfig={{mode: 'vertical'}}
//           renderItem={(data) => {
//             return (
//               <View
//                 style={{
//                   flex: 1,

//                   justifyContent: "center",
//                 }}
//               >
//                 <Image source={data.item} style={{ flex: 1 }} />
//               </View>
//             );
//           }}
//         />
//       </View>
//       <View style={{position: 'absolute', right: 10, top: 5, backgroundColor: 'black', borderRadius: '50%', padding: 2}}>
//                 <Text style={{ color: 'white'}} >
// {`${index + 1}/${uriArray.length} `}
//         </Text>
//         </View>
//       <TouchableOpacity
//         onPress={() => previous()}
//         style={{ position: "absolute", top: width / 6, left: 0 }}
//       >
//         <MaterialCommunityIcons color="black" name="arrow-left" size={40} />
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => next()}
//         style={{ position: "absolute", top: width / 6, right: 0 }}
//       >
//         <MaterialCommunityIcons color="black" name="arrow-right" size={40} />
//       </TouchableOpacity>

//       <View style={styles.detailsContainer}>
//         <Text style={styles.title}>{listing.title}</Text>
//         <Text style={{}}>{listing.description}</Text>
//         <Text style={styles.price}>${listing.price}</Text>

//         <View style={styles.userContainer}>
//           {seller && (
//             <ListItem
//               image="http://192.168.39.87:9000/assets/mail.jpg"
//               title={seller.name}
//               subTitle={`${seller.listings} listings`}
//             />
//           )}
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   detailsContainer: {
//     marginTop: marginTop,
//     padding: 10,
//   },

//   price: {
//     color: colors.secondary,
//     fontWeight: "bold",
//     fontSize: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "500",
//   },
// });

// export default ListingDetailsScreen;
