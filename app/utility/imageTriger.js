const { Alert } = require("react-native");

const imageTriger = (camera, gallery) => {
Alert.alert("", "Choose image", [
      { text: "cancel" },
      { text: "Camera", onPress: camera },
      { text: "Gallery", onPress: gallery },
    ]);
}

export default imageTriger