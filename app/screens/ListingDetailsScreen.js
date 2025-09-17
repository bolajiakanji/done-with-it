import { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions
} from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { configureReanimatedLogger } from "react-native-reanimated";
import client from "../api/client";
import { useApi, useItemDetailsLogic, useKeyboard } from "../hooks";
import useAuth from "../auth/useAuth";
import DeleteComment from "../components/DeleteComment";
import ListingDetailCarousel from "../components/ListingDetailCarousel";
import ListingInfo from "../components/ListingInfo";
import CommentsSection from "../components/CommentsSection";
import CommentPosting from "../components/CommentPosting";
import CommentPostingModal from "../components/CommentPostingModal";

configureReanimatedLogger({
  strict: false,
});

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const infoTopMargin = height / 3.5;

function ListingDetailsScreen({ route, navigation }) {
  const listing = route.params;
  const [isVisible, setVisibility] = useState(false);
  const [likes, setLikes] = useState(listing.likes);
  const [postingComments, setPostingComments] = useState("");
  const [loadingComment, setLoadingComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingCommentOnPageVisit, setLoadingCommentOnPageVisit] =
    useState(false);

  useKeyboard(setVisibility)
  const { user } = useAuth();
  const { data } = useApi(getComment);
  const endPoint = "/comments/" + listing._id;
  const loadListing = useItemDetailsLogic(
    setComments,
    endPoint,
    setLoadingCommentOnPageVisit,
    listing
  )

  const bg = '#e6f2ff'

  const getComment = (_comment) => {
    return client.get(endPoint, _comment);
  };

  const like_value = () => {
    if (likes.includes(user._id)) return '-1'
    return '1'
  }

  return (
    <Screen
      barStyle='dark-content'
      style={{ backgroundColor: bg }}
      background={bg}
    >
      <ListingDetailCarousel
        width={width}
        height={height}
        listing={listing}
        data={data}
      />

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
          height={height}
          setComments={setComments}
          DeleteComment={DeleteComment}
          loadListing={loadListing}
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
    marginTop: infoTopMargin,
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
