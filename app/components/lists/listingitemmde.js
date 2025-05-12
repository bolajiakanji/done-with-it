import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight, 
  Alert,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import client from "../../api/client";
import authStorage from "../../auth/storage";
import useAuth from "../../auth/useAuth";





import Text from "../Text";
import colors from "../../config/colors";
import Camera from "../Camera";
import * as ImagePicker from "expo-image-picker";
import AccountImage from "../AccountImage";
import AppButton from "../Button";

function ListItemm({ setImageModal, setpi }) {
  const [camera, setCamera] = useState(false);
  const [imageuri, setImageUri] = useState("");
  const [imageToUse, setImageToUse] = useState(imageuri ? imageuri : "");
  const { login} = useAuth()
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
  const sendapi = async () => {
    if (imageuri) {
      const data = new FormData();
      data.append("profileImage", {
        uri: imageuri,
        name: "profileImage",
        type: "image/jpeg",
      })
      console.log('hreme')
      const owner = await authStorage.getUser();

      const output = await client.post('/my/profileImage/', data, {
  

    
        headers: { 'content-type': 'multipart/form-data' }
      })
      console.log(output.data)
      setpi(output.data.image)
      console.log('output.datacv')
      console.log('datacv')
      await authStorage.storeToken(output.data)
      login(output.data)
    }
     
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
      <View style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between', width: '100%',marginTop: 20, paddingHorizontal: 20}}>
      <MaterialCommunityIcons
        color="white"
        name="close"
        size={30}
        onPress={() => {
          setImageUri("");
          setImageModal(false);
        }}
      />
      
        <MaterialCommunityIcons
          color="white"
          name="plus"
          size={30}
          onPress={() => handlePress()}
          />
          </View>

      
        <Modal visible={camera}>
          <Camera setCamera={setCamera} onShot={handleShot} />
          </Modal>
      
      {/* <Image style={styles.uploadImage} source={imageuri ? { uri: imageuri } : ''} /> */}
      <View style={styles.uploadImage}>
        {imageuri && <View style={styles.uploadImage}>
          <Image style={{ width: '100%', height: 250 }} source={{ uri: imageuri }} />
          <View style={{ }}>
          
          <AppButton
            title='Use this image preview'
            onPress={() => sendapi()}
              style={{ marginTop: 50 }}
            width={75}/>
          {/* <TouchableOpacity  style={{ position: 'absolute',width: '100%', top: '155%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Button
              //disabled={true}
          
          title="Use this image preview"
          size={25}
          onPress={() => sendapi()}
          />
        </TouchableOpacity></>} */}
            </View>
        </View>}
          {!imageuri && <AccountImage />}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    

    

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
    height: 300,
  },
  uploadImage: {
    position: "relative",
    zIndex: 5,
    top: "15%",
    width: "100%",
    height: 200,
  },
});

export default ListItemm;
