import React, { useEffect, useRef, useState,useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Keyboard
} from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import  client, {meme as client_2} from "../api/client";
import { configureReanimatedLogger } from "react-native-reanimated";
import { useApi } from "../hooks";
import { Cloudinary } from "@cloudinary/url-gen";
import getLikesColor from "../utility/likesColor";
import useAuth from "../auth/useAuth";
import BarStyleContext from "../context/barStyle";
import DeleteComment from "../components/DeleteComment";
import ListingDetailCarousel from "../components/ListingDetailCarousel";
import ListingInfo from "../components/ListingInfo";

import CommentsSection from "../components/CommentsSection";
import CommentPosting from "../components/CommentPosting";
import CommentPostingModal from "../components/CommentPostingModal";



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
  console.log(navigation)
  console.log('navigation')
  const listing = route.params;
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
  console.log('akem')
console.log(likes.length)
console.log('akem2')
  const [comments, setComments] = useState([]);
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
    console.log('abi')
    console.log(likes)
    console.log('abi2')
    console.log(user._id)
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
like_value={like_value}
setLikes={setLikes}
navigation={navigation}
likes={likes}
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

<CommentPostingModal isVisible={isVisible} width={width} 
loadingCommentOnPageVisit={loadingCommentOnPageVisit} 
postingComments={postingComments}
loadingComment={loadingComment}
setVisibility={setVisibility}
endPoint={endPoint}
setComments={setComments}
setPostingComments={setPostingComments}
setLoadingComment={setLoadingComment}
/>
      
      
      
      
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
