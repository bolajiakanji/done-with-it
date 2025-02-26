import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import client from "../../api/client";
import authStorage from "../../auth/storage";




import Text from "../Text";
import colors from "../../config/colors";
import Camera from "../Camera";
import * as ImagePicker from "expo-image-picker";

function ListItemm({ setImageModal, setpi }) {
  const [camera, setCamera] = useState(false);
  const [imageuri, setImageUri] = useState("");
  const [imageToUse, setImageToUse] = useState(imageuri ? imageuri : "");

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 0.5,
      });
      if (!result.canceled) setImageUri(result.assets[0].uri);
    } catch (error) {
      alert("Error reading an image", error);
    }
  };
  const sendapi =async () => {
    const data = new FormData();
    data.append("profileImage", {
      uri: imageuri,
      name: "profileImage",
      type: "image/jpeg",
    })
    console.log('hreme')
    const owner = await authStorage.getUser();

   const output =  await client.post('/my/profileImage/', data, {
  

    
      headers: { 'content-type': 'multipart/form-data' }
   })
    console.log(output.data)
    console.log('output.data')
    //setpi(output.data.image)
    await authStorage.storeToken(output.data)
     
  }

  const handlePress = () => {
    Alert.alert("", "Choose image", [
      { text: "cancel" },
      { text: "Camera", onPress: () => setCamera(true) },
      { text: "Gallery", onPress: () => selectImage() },
    ]);
  };

  const removeImage = () => {};
  const handleShot = (selectedImage) => {
    console.log(selectedImage);
    setImageUri(selectedImage);
  };

  return (
    <View style={styles.modalContainer}>
      <MaterialCommunityIcons
        color="white"
        name="chevron-left"
        size={25}
        onPress={() => {
          setImageUri("");
          setImageModal(false);
        }}
      />
      <View>
        <MaterialCommunityIcons
          color="white"
          name="chevron-down"
          size={25}
          onPress={() => handlePress()}
        />
        <MaterialCommunityIcons
          color="white"
          name="chevron-up"
          size={25}
          onPress={() => sendapi()}
        />
      </View>

      {camera && (
        <View style={styles.camContainer}>
          <Camera setCamera={setCamera} onShot={handleShot} />
        </View>
      )}
      <Image style={styles.uploadImage} source={imageuri ? { uri: imageuri } : ''} />
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: "100%",
    height: 500,

    position: "absolute",
    top: 10,
    zIndex: 4,

    //display: showImageModal ? 'block' : 'none',
    backgroundColor: "black",
  },

  title: {
    fontWeight: "500",
  },
  camContainer: {
    position: "absolute",
    zIndex: 6,
    flex: 1,
    width: "100%",
    height: 500,
  },
  uploadImage: {
    position: "absolute",
    zIndex: 5,
    top: "20%",
    width: "100%",
    height: 200,
  },
});

export default ListItemm;
