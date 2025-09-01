const { TouchableOpacity, View, StyleSheet } = require("react-native");
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AdvancedImage } from "cloudinary-react-native";
import colors from "../../config/colors";

function DisplayPicture({
  setImageModal,
  image,
  profileImage,
}) {
  return (
    <TouchableOpacity
      underlayColor={colors.light}
      onPress={() => setImageModal(true)}
    >
      <View style={styles.dpBox}>
        {!image ? (
          <View style={styles.noImage}>
            <MaterialCommunityIcons
              name="account"
              size={40}
              color="gray"
              style={styles.noImageIcon}
            />
          </View>
        ) : (
          <AdvancedImage
            cldImg={profileImage}
            style={styles.dp}
          />
        )}

        <MaterialCommunityIcons
          size={30}
          name="camera"
          style={styles.dp}
        />
      </View>
    </TouchableOpacity>

  )
}
const styles = StyleSheet.create({
  dpBox: {
    width: "100%",
    height: 200
  },

  noImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#bbb",
    height: "100%",
  },

  noImageIcon: {
    borderRadius: 50,
    padding: 25,
    backgroundColor: "black",
  },

  dp: {
    width: "100%",
    height: "100%"
  },

  camera: {
    position: "absolute",
    top: 5,
    right: 15
  },
})

export default DisplayPicture