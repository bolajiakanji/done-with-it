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
import { Image } from "expo-image";
import Screen from "../components/Screen";
import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import Carousel from "react-native-reanimated-carousel";
import  client, {meme as client_2} from "../api/client";
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
import BarStyleContext from "../context/barStyle";
import ReactNativeModal from "react-native-modal";
import DeleteComment from "../components/DeleteComment";
import ListingDetailCarousel from "../components/ListingDetailCarousel";
import ListingInfo from "../components/ListingInfo";

import CommentsSection from "../components/CommentsSection";
import { deleteItemAsync } from "expo-secure-store";
import CommentPosting from "../components/CommentPosting";



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
  const [isVisible, setVisibility] = useState(false);
  const [likes, setLikes] = useState(listing.likes);
  const [content, setContent] = useState(0);
  const [postingComments, setPostingComments] = useState("");
  const [index, setIndex] = useState(0);
  const [loadingComment, setLoadingComment] = useState(false);
  const [loadingLikes, setLoadingLikes] = useState(false);
  const { setBarStyle } = useContext(BarStyleContext)
  const count = useRef(true)

  const arrowTopMargin = height / 8;
const infoTopMargin = height /3.5;

   
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
  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setVisibility(false)
    })
    return () => { hideSubscription.remove() }

  }, []);

  const loadListing = async () => {
    setLoadingCommentOnPageVisit(true)
    const res = await client_2.get(endPoint);
    setLoadingCommentOnPageVisit(false)

    console.log(res.data);
    console.log("res.data");
    if (res.data) setComments(res.data.reverse());
  };
  const numberOfComments =
    count.current && comments.length == 0 ? listing.comments : comments.length;
  
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
  const screenHeigth = height

  return (
    <Screen   barStyle='dark-content' style={{backgroundColor: '#e6f2ff'}} background='#e6f2ff'>
      <ListingDetailCarousel width={width} height={height} listing={listing} data={data} />
      
<ListingInfo listing={listing} 
infoTopMargin={infoTopMargin} 
/>
<View>
  
  
<CommentsSection 
comments={comments} 
listing={listing}
loadingCommentOnPageVisit={loadingCommentOnPageVisit} 
postingComments={postingComments}
loadingComment={loadingComment}
height={height}
setVisibility={setVisibility}
endPoint={endPoint}
setComments={setComments}
setPostingComments={setPostingComments}
setLoadingComment={setLoadingComment}
DeleteComment={DeleteComment}

/>
<CommentPosting 
loadingCommentOnPageVisit={loadingCommentOnPageVisit} 
postingComments={postingComments}
loadingComment={loadingComment}
setVisibility={setVisibility}
endPoint={endPoint}
setComments={setComments}
setPostingComments={setPostingComments}
setLoadingComment={setLoadingComment}








/>

</View>
      
      
      <ReactNativeModal
        isVisible={isVisible}
        avoidKeyboard={true}
        coverScreen={false}
        style={{
          backgroundColor: 'transparent',
          margin: 0,
          
          top: '20%',
          display: 'flex',justifyContent: 'center',alignItems: 'flex-end',width: '100%'
        }}
       hasBackdrop={true}
        onBackButtonPress={()=>setVisibility(false)}
        onBackdropPress={() => setVisibility(false)}
        onModalHide={() => {
          Keyboard.dismiss()
        }}
        backdropOpacity={0}
      >
        <View style={{width, marginBottom: 80, paddingTop: 15}}>
        <View style={{
                  display: "flex",
                 // marginTop: 20,
                  flexDirection: "row",
             justifyContent: "center",
                  alignItems: 'center',
                gap: 15,
          width: '100%',
          //position: 'absolute',
          backgroundColor: '#bbb',
            height: 200, 
          bottom:10
        
                
                  
                  
        }}>
            <View style={{ width: '75%',  }}>

<TextInput style={{ backgroundColor: 'white', position: 'absolute',bottom: '-10%',width: '100%',borderRadius: 20, paddingHorizontal:15, }}
            allowFontScaling={false}
            autoCorrect={true}
                clearTextOnFocus={true}
                autoFocus={true}
            onChangeText={(e) => {
                  setPostingComments(e)
            }}
//style={{backgroundColor: 'white'}}
              multiline numberOfLines={4} value={postingComments} />
            </View>
          {loadingComment && <View style={{
              //height: 40,
              
            }}><ActivityIndicator /></View>}
                {postingComments && !loadingComment && (
                
                  <PostComment
                    endPoint={endPoint}
                    setComments={setComments}
                    postingComments={postingComments}
                    setPostingComments={setPostingComments}
                    loading={loadingComment}
                setLoading={setLoadingComment}
                setModal={setVisibility}
                />
                  
            )}
            </View>
        </View>
      </ReactNativeModal>
      
          </Screen>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    marginTop: detailsContainerTopMargin,
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
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ListingDetailsScreen;
