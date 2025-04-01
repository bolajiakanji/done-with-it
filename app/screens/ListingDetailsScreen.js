import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Linking
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
import { AdvancedImage } from "cloudinary-react-native";

import timeAgo from "../utility/timeAgo";
import { Cloudinary } from "@cloudinary/url-gen";


configureReanimatedLogger({
  strict: false,
});

const width = Dimensions.get("window").width;
const arrowMargin = width / 5;
const marginTop = width / 2;

function ListingDetailsScreen({ route }) {
  const [comments, setComments] = useState([5,7,9]);
  const [index, setIndex] = useState(0);
  const listing = route.params;
  const endPoint = "/comments/" + listing._id;
  const cld = new Cloudinary({
    cloud: {
        cloudName: 'dlutiw9i4'
    }
  });
  //const endpoint = "/comments";

const getComment = (bol) => {
  return client.get(endPoint, bol);
};

  const { data, request, error, setError, setData } = useApi(getComment);
  const ref = useRef(null);
console.log('hereuse')

  useEffect(() => {
    
    loadListing();
    console.log('use')
  }, []);

  const loadListing = async () => {
    const response = await request({});

    console.log(response.data)
    console.log('response.data')
    if (!response.ok) {
      if (response.data) setError(response.data.error);
      else {
        setError("An unexpected error occured.");
      }
    }
    
  };

 const uriArray = listing.images;

  // for (const image of listing.images) {
  //   console.log('boji')
  //   uriArray.push(image.url);
  //   console.log('boji2')
  // }

  const previous = () => {
    ref?.current?.prev();
  };
  const next = () => {
    ref?.current?.next();
  };
  const testarr = [2,3,4]

  return (
    <Screen  >
      <View style={{ flex: 1, position: 'relative' }}>
        <Carousel
          ref={ref}
          loop
          width={width}
          height={width / 2}
          autoPlay={listing.images.length > 1 ? true : false}
          data={listing.images}
          scrollAnimationDuration={2000}
          
          onSnapToItem={(index) => setIndex(index)}
          
          renderItem={(data) => {
            console.log(data.item)
            const myImage = cld.image(data.item);
            console.log(myImage)

            return (
              <View
                style={{
                  flex: 1,

                  justifyContent: "center",
                }}
              >
                
                        <AdvancedImage cldImg={myImage} style={styles.image} />
                
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
        style={{ position: "absolute", top: arrowMargin, left: 0 }}
      >
        <MaterialCommunityIcons color="black" name="chevron-left" size={20} style={{margin:5,borderRadius:15, backgroundColor: 'white'}}/>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => next()}
        style={{ position: "absolute", top: arrowMargin, right: 0 }}
      >
        <MaterialCommunityIcons color="black" name="chevron-right" size={20} style={{margin:5,borderRadius:15, backgroundColor: 'white'}} />
          </TouchableOpacity>
          </>
        )
        }
      </View>

      <View style={styles.detailsContainer}>
        <Text  style={styles.title} numberOfLines={2}>{listing.title}</Text>
        <Text style={{}} numberOfLines={3}>{listing.description} </Text>
        {/* <Text style={styles.price}>${listing.price}</Text> */}
        <Text style={styles.price}>
        <Text style={{fontWeight: 'bold',fontSize:18, color: colors.secondary}}>#</Text>{parseInt(listing.price).toLocaleString()}
        </Text>
          <ListItem
            image={listing.userId.image}
            title={listing.userId.name}
            subTitle={`${listing.userId.userListings} items available for sell`}
          />
        <View style={{display: 'flex', flexDirection: 'row',justifyContent:'space-around',width: 100, marginVertical:7}}>
          <Text style={{ color: "#bbb", fontSize: 12 }}>{timeAgo(listing.createdAt) + ' ago'}</Text>
          <Text style={{ color: "#bbb", fontSize: 12 }}>
            {listing.likes ? listing.likes.length + " likes" : ""}
          </Text >
          <Text style={{ color: "#bbb", fontSize: 12 }}>{listing.comment == undefined
              ? "0 comment"
              : listing.comment + " comments"}</Text>
        </View>

      </View>
      <View>
        <View style={{height:250, width: '100%', backgroundColor: 'green'}}>
        {comments.map(comment => (
            <Text key={comment}>{comment}</Text>
          ))}
          </View>
      </View>
      <TouchableOpacity
        onPress={async() => {
          const res = await client.put('/likes/1', {
            
            listingId:listing._id

          } 
          )
          console.log(res.data)
          console.log('res')
          
        }}
        style={{}}
      >
        <MaterialCommunityIcons color="black" name="chevron-left" size={40} />
        <Text>you say</Text>
      </TouchableOpacity>
      <Button title='open url' onPress={()=> Linking.openURL('whatsapp://send?phone=+2347080967435&text=you are stupid')}/>
      <Button title='open url' onPress={()=> Linking.openURL('tel:+2348106218585')}/>
      <Button title='open url'style={{width: '40%'}} onPress={()=> Linking.openURL('whatsapp://send?phone=+2347080967435&text=you are stupid')}/>
    </Screen>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    marginTop,
    marginStart: 30,
    marginEnd:10,
    paddingTop: 3,
  },

  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 27,
    marginVertical: 2
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: 'gray',
    marginBottom: 3

  },
  image: {
    width: "100%",
    height: '100%',
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
