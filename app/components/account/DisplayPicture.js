import { TouchableOpacity, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
        {!image ? 
          <View style={styles.noImage}>
            <MaterialCommunityIcons
              name="account"
              size={40}
              color="gray"
              style={styles.noImageIcon}
            />
          </View>
         : 
          // <AdvancedImage
          //   cldImg={profileImage}
          //   style={styles.dp}
          // />
              <View></View>

        }

        <MaterialCommunityIcons
          size={30}
          name="camera"
          style={styles.camera}
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

  dp: {
    width: "100%",
    height: "100%"
  },

  camera: {
    position: "absolute",
    top: 5,
    right: 15
  },

  noImageIcon: {
    borderRadius: 50,
    padding: 25,
    backgroundColor: "black",
  },

})

export default DisplayPicture