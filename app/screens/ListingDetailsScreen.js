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
  TextInput,
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
import { Cloudinary } from "@cloudinary/url-gen";
import timeAgo from "../utility/timeAgo";
import AppTextInput from "../components/TextInput";
import PostComment from "../components/PostComment";
import getPluralisedWord from "../utility/pluralisedWord";
import getLikesColor from "../utility/likesColor";
import useAuth from "../auth/useAuth";
import UserShortInfo from "../components/UserShortInfo";
import { center } from "@cloudinary/url-gen/qualifiers/textAlignment";
import routes from "../navigation/routes";

//import { AdvancedImage } from "cloudinary-react-native";
//import { Cloudinary } from "@cloudinary/url-gen";


configureReanimatedLogger({
  strict: false,
});
  
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const arrowTopMargin = height / 8;
const detailsContainerTopMargin = height /3.5;

function ListingDetailsScreen({ route, navigation }) {
  const listing = route.params;
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(listing.likes);
  const [content, setContent] = useState(0);
  const [postingComments, setPostingComments] = useState("");
  const [index, setIndex] = useState(0);
  const [loadingComment, setLoadingComment] = useState(false);
  const [loadingLikes, setLoadingLikes] = useState(false);
  const [loadingCommentOnPageVisit, setLoadingCommentOnPageVisit] = useState(false);
    const { user } = useAuth();
  

  const endPoint = "/comments/" + listing._id;
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dlutiw9i4",
    },
  });
  


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
    setLoadingCommentOnPageVisit(true)
    const res = await client.get(endPoint);
    setLoadingCommentOnPageVisit(false)

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

      <View style={styles.detailsContainer}>
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
                            navigation.navigate(routes.ITEM_POSTER, {jh:'hdfjsj'})
                          }
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom:5,
            paddingRight: 20,
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
              <Text style={{ color: likesColor, fontSize: 12, padding: 3 }}>
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
      <KeyboardAvoidingView behavior="position">
        <View
          style={{ height: 320, backgroundColor: "#bbb", position: "relative",marginTop: 0 }}
        >
          <View style={{backgroundColor: 'white', paddingLeft: 20,paddingBottom:5 }}>
          <Text style={{ color: "gray", fontSize: 14 }}>
              {getPluralisedWord(numberOfComments, "comment")}
            </Text>
            </View>
          {loadingCommentOnPageVisit &&
            <View style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} >
            <ActivityIndicator size={30} />
          <Text style={{textAlign: 'center'}}>Loading Comments</Text>
          </View>
          }
            
          {!loadingCommentOnPageVisit &&
            <>
              <View
                style={{
                  height: 200,
                  backgroundColor: "#ddd",
                  paddingHorizontal: 10,
                }}
              >
                <ScrollView style={{ width: "100%", paddingRight: 20 }}>
                  {comments.map((comment) => {
                    const profileImage = cld.image(comment.userId.image)
                    console.log(comment.userId.image)
                    console.log('profileImage23')
                    return (
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
                          {!comment.userId.image && (
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
                          {comment.userId.image && (
                            <AdvancedImage cldImg={profileImage} style={{ width: 35, height: 35, borderRadius: 20 }} />
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
                              {"@" + comment.userId.name}
                            </Text>
                          </View>
                          <Text style={{ fontSize: 16 }}>{comment.comment}</Text>
                          <Text style={{ fontSize: 11, color: "gray" }}>
                            {timeAgo(comment.createdAt) + " ago"}
                          </Text>
                        </View>
                      </View>
                    )
                  })}
                </ScrollView>
              </View>
              <View
                style={{
                  display: "flex",
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                  
                }}
            >
              
              <View style={{width: '75%', }}>
                <TextInput
                  
                maxHeight={80}
                minHeight={40}
                defaultValue={postingComments}
                 // value={postingComments}
                  allowFontScaling={false}
                  autoCorrect={true}
                  style={{ padding: 10, width: "100%", position: 'absolute', bottom: postingComments !== ''? 0 : -40,backgroundColor:'white', borderRadius: 20}}
                  clearTextOnFocus={true}
                  multiline={true}
                  placeholder="Type comment"
                  onChangeText={(e) => {
                    setPostingComments(e);
                  

                }}
                onContentSizeChange={(event) => {
                  setContent(event.nativeEvent.contentSize.height)
                }}
                  />
                </View>
                {loadingComment && <ActivityIndicator />}
                {postingComments && !loadingComment && (
                <View>
                  <PostComment
                    endPoint={endPoint}
                    setComments={setComments}
                    postingComments={postingComments}
                    setPostingComments={setPostingComments}
                    loading={loadingComment}
                    setLoading={setLoadingComment}
                />
                  </View>
                )}
              </View></>}
        </View>
      </KeyboardAvoidingView>
      
          </Screen>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    marginTop: detailsContainerTopMargin,
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
    fontSize: 15,
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
