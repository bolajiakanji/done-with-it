import * as ImagePicker from "expo-image-picker";

const selectImage = async (setImageUri, setShowButton) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 0.5,
      });
     if (!result.canceled) setImageUri(result.assets[0].uri)
         setShowButton(true)

    } catch (error) {
      alert("Error reading an image", error);
    }
  };

  export default selectImage