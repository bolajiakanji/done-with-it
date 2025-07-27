 import React, { useEffect, useRef, useState,useContext } from "react";
 
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
   Keyboard
 } from "react-native";
 import Text from "./Text";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import UserShortInfo from "./UserShortInfo";
import getLikesColor from "../utility/likesColor";
import useAuth from "../auth/useAuth";
import timeAgo from "../utility/timeAgo";
 //import colors from "../config/colors";
 
 
 
 function ListingInfo ({ listing, route, navigate, infoTopMargin}) {
      const [loadingLikes, setLoadingLikes] = useState(false);
        const [likes, setLikes] = useState(listing.likes);
      
          const { user } = useAuth();
      

      const likesColor =
    getLikesColor(user._id, likes);

    const numberOfLikes =
    likes.length;
  
  
    

    return (
        <View style={[{...styles.detailsContainer}, {marginTop: infoTopMargin} ]}>
        <Text style={styles.title} numberOfLines={1}>
          {listing.title}
        </Text>
        <Text style={{}} numberOfLines={1}>
          {listing.description}{" "}
        </Text>
        {/* <Text style={styles.price}>${listing.price}</Text> */}
        <Text style={styles.price}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              color: colors.secondary,
            }}
          >
            #
          </Text>
          {parseInt(listing.price).toLocaleString()}
        </Text>
        <UserShortInfo
          image={listing.userId.image}
          name={listing.userId.name}
          //email={listing.userId.email}
          itemsAvailable={`${listing.userId.userListings} items available for sell`}
          itemOnPress={() =>
                            navigation.navigate(routes.ITEM_POSTER, listing.userId)
                          }
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
            
            paddingRight: 20,
            marginLeft: 40,
            marginTop:5
          }}
        >
          {/* <View>
            <Text style={{ color: "gray", fontSize: 12 }}>
              {getPluralisedWord(numberOfComments, "comment")}
            </Text>
          </View> */}
          {loadingLikes && <ActivityIndicator  size={15} />}
          { !loadingLikes &&
            <TouchableOpacity
              onPress={async () => {
                setLoadingLikes(true)
                console.log(like_value())
                const res = await client.put(`/likes/${like_value()}`, {
                  listingId: listing._id,
                });
                setLoadingLikes(false)
                console.log(res.data);
                console.log("res");
                if (res.data) setLikes(res.data)
              }}>
              <Text style={{ color: likesColor, fontSize: 12, padding: 3,  }}>
                {numberOfLikes + " "}
                <MaterialCommunityIcons name="thumb-up" />
              </Text>
            </TouchableOpacity>
          }
          <View>
            <Text style={{ color: "gray", fontSize: 12 }}>
              {timeAgo(listing.createdAt) + " ago"}
            </Text>
          </View>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  detailsContainer: {
    
    marginStart: 15,
    marginEnd: 10,
    
  },

  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 27,
    
    textAlign: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "gray",
    
  },
})

export default ListingInfo