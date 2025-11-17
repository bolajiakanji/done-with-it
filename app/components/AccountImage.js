import { StyleSheet, View } from "react-native";
import useAuth from "../auth/useAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import myCloud from "../utility/cid";

function AccountImage({ screen }) {
  const { user } = useAuth();

  const marginTop = { marginTop: screen ? 50 : 0 }

  const image = user.image;
  const cld = myCloud()

  let myImage;

  if (image) {
    myImage = cld.image(image);
  }

  if (!image)
    return (
      <View style={[styles.noImage, marginTop ]}>
        <MaterialCommunityIcons
          color="white"
          size={80}
          name="account"
          style={styles.icon}
        />
      </View>
    );
  return (
    // <AdvancedImage cldImg={myImage} style={styles.advaancedImage} />
    <View></View>
  );
}

const styles = StyleSheet.create({
  advaancedImage: { 
    height: 300, 
    width: "100%" 
  },

  icon: { 
    backgroundColor: "gray", 
    padding: 30, 
    borderRadius: 70 
  },

  noImage: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

})
export default AccountImage;
