import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Text from "./Text";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UserShortInfo from "./UserShortInfo";
import getLikesColor from "../utility/likesColor";
import useAuth from "../auth/useAuth";
import timeAgo from "../utility/timeAgo";
import { meme as client_2 } from "../api/client";
import routes from "../navigation/routes";

function ListingInfo({
  listing,
  navigation,
  infoTopMargin,
  like_value,
  likes,
  setLikes,
}) {
  const [loadingLikes, setLoadingLikes] = useState(false);

  const { user } = useAuth();

  const likesColor = getLikesColor(user._id, likes);
  const numberOfLikes = likes.length;

  const onPress = async () => {
    setLoadingLikes(true)
    const res = await client_2.put(`/likes/${like_value()}`, {
      listingId: listing._id,
    });
    setLoadingLikes(false)

    if (res.data) setLikes(res.data)
  }

  return (
    <View style={[{ ...styles.detailsContainer }, { marginTop: infoTopMargin }]}>
      <Text style={styles.title} numberOfLines={1}>
        {listing.title}
      </Text>
      <Text numberOfLines={1}>
        {listing.description}
      </Text>
      <Text style={styles.priceWraper}>
        <Text style={styles.price} >
          #
        </Text>{parseInt(listing.price).toLocaleString()}
      </Text>

      <UserShortInfo
        image={listing.userId.image}
        name={listing.userId.name}
        itemsAvailable={`${listing.userId.userListings} items available for sell`}
        itemOnPress={() =>
          navigation.navigate(routes.ITEM_POSTER, listing.userId)
        }
      />

      <View style={styles.likesContainer}>
        {loadingLikes && <ActivityIndicator size={15} />}

        {!loadingLikes &&
          <TouchableOpacity
            onPress={() => onPress()}>
            <Text style={[styles.likes, { color: likesColor }]}>
              {numberOfLikes + " "}
              <MaterialCommunityIcons name="thumb-up" />
            </Text>
          </TouchableOpacity>
        }

        <View>
          <Text style={styles.timeAgo}>
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

  price: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.secondary,
  },

  priceWraper: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 27,
    textAlign: "center",
  },

  likes: {
    fontSize: 12,
    padding: 3,
  },

  likesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    paddingRight: 20,
    marginLeft: 40,
    marginTop: 5
  },

  timeAgo: {
    color: "gray",
    fontSize: 12
  }
})

export default ListingInfo