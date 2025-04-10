import React, { useEffect, useRef, useState } from "react";
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
import AppTextInput from "../components/TextInput";
import PostComment from "../components/PostComment";
import getPluralisedWord from "../utility/pluralisedWord";
import getLikesColor from "../utility/likesColor";
import useAuth from "../auth/useAuth";

configureReanimatedLogger({
  strict: false,
});

const width = Dimensions.get("window").width;
const arrowMargin = width / 5;
const marginTop = width / 2;

function ListingDetailsScreen({ route }) {
  const listing = route.params;
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(listing.likes);
  const [postingComments, setPostingComments] = useState("");
  const [index, setIndex] = useState(0);
  const [loadingComment, setLoadingComment] = useState(false);
    const { user } = useAuth();
  

  const endPoint = "/comments/" + listing._id;
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dlutiw9i4",
    },
  });
  //const endpoint = "/comments";

  const getComment = (bol) => {
    return client.get(endPoint, bol);
  };

  const { data, request, error, setError, setData } = useApi(getComment);
  const ref = useRef(null);
  console.log("hereuse");

  useEffect(() => {
    loadListing();
  }, []);

  const loadListing = async () => {
    const res = await client.get(endPoint);

    console.log(res.data);
    console.log("res.data");
    if (res.data) setComments(res.data.reverse());
  };
  const numberOfComments =
    comments.length === 0 ? listing.comments : comments.length;
  
  const numberOfLikes =
    likes.length;
  
  const likesColor =
    getLikesColor(user._id, likes);
  const uriArray = listing.images;

  const like_value = () => {
    if (likes.includes(user._id)) return '-1'
    return '1'
  }

  const previous = () => {
    ref?.current?.prev();
  };
  const next = () => {
    ref?.current?.next();
  };
  const testarr = [2, 3, 4];

  return (
    <Screen>
      <View style={{ flex: 1, position: "relative" }}>
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
            const myImage = cld.image(data.item);

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
              <MaterialCommunityIcons
                color="black"
                name="chevron-left"
                size={20}
                style={{
                  margin: 5,
                  borderRadius: 15,
                  backgroundColor: "white",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => next()}
              style={{ position: "absolute", top: arrowMargin, right: 0 }}
            >
              <MaterialCommunityIcons
                color="black"
                name="chevron-right"
                size={20}
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

      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {listing.title}
        </Text>
        <Text style={{}} numberOfLines={3}>
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
        <ListItem
          image={listing.userId.image}
          title={listing.userId.name}
          subTitle={`${listing.userId.userListings} items available for sell`}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginVertical: 7,
            paddingRight: 20,
          }}
        >
          <View>
            <Text style={{ color: "gray", fontSize: 12 }}>
              {getPluralisedWord(numberOfComments, "comment")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={async () => {
              console.log(like_value())
            const res = await client.put(`/likes/${like_value()}`, {
              listingId: listing._id,
            });
            console.log(res.data);
              console.log("res");
              setLikes(res.data)
          }}>
            <Text style={{ color: likesColor, fontSize: 12 }}>
              {numberOfLikes + " "}
              <MaterialCommunityIcons name="thumb-up"  />
            </Text>
          </TouchableOpacity>
          <View>
            <Text style={{ color: "gray", fontSize: 12 }}>
              {timeAgo(listing.createdAt) + " ago"}
            </Text>
          </View>
        </View>
      </View>
      <KeyboardAvoidingView behavior="position">
        <View
          style={{ height: 320, backgroundColor: "#bbb", position: "relative" }}
        >
          <View
            style={{
              height: width / 1.6,
              backgroundColor: "#ddd",
              paddingHorizontal: 10,
            }}
          >
            <ScrollView style={{ width: "100%", paddingRight: 20 }}>
              {comments.map((comment) => (
                <View
                  key={comment._id}
                  style={{
                    display: "flex",
                    marginTop: 10,
                    flexDirection: "row",
                    gap: 10,
                    flex: "wrap",
                    paddingRight: 30,
                  }}
                >
                  <View>
                    {comment.userId?.image && (
                      <MaterialCommunityIcons
                        name="account"
                        size={28}
                        color="gray"
                        style={{
                          borderRadius: 15,
                          padding: 2,
                          backgroundColor: "#bbb",
                        }}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      rowGap: 5,
                      flexWrap: "wrap",
                    }}
                  >
                    <View>
                      <Text style={{ color: "gray", fontSize: 14 }}>
                        {"@ " + comment.userId.name}
                      </Text>
                    </View>
                    <Text style={{ fontSize: 16 }}>{comment.comment}</Text>
                    <Text style={{ fontSize: 11, color: "gray" }}>
                      {timeAgo(comment.createdAt) + " ago"}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View
            style={{
              display: "flex",
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
              alignItems: "center",
            }}
          >
            <AppTextInput
              width="75%"
              maxHeight={38}
              value={postingComments}
              allowFontScaling={false}
              autoCorrect={true}
              style={{ padding: 0, width: "100%" }}
              clearTextOnFocus={true}
              multiline={true}
              placeholder="Type comment"
              onChangeText={(e) => {
                console.log("mdff");
                console.log(e);
                console.log(postingComments);
                setPostingComments(e);
              }}
            />
            {loadingComment && <ActivityIndicator />}
            {postingComments && !loadingComment && (
              <PostComment
                endPoint={endPoint}
                setComments={setComments}
                postingComments={postingComments}
                setPostingComments={setPostingComments}
                loading={loadingComment}
                setLoading={setLoadingComment}
              />
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
      
      <Button
        title="open url"
        onPress={() =>
          Linking.openURL(
            "whatsapp://send?phone=+2347080967435&text=you are stupid"
          )
        }
      />
      <Button
        title="open url"
        onPress={() => Linking.openURL("tel:+2348106218585")}
      />
      <Button
        title="open url"
        style={{ width: "40%" }}
        onPress={() =>
          Linking.openURL(
            "whatsapp://send?phone=+2347080967435&text=you are stupid"
          )
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    marginTop,
    marginStart: 30,
    marginEnd: 10,
    paddingTop: 3,
  },

  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 27,
    marginBottom: 0,
    textAlign: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "gray",
    marginBottom: 3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ListingDetailsScreen;
