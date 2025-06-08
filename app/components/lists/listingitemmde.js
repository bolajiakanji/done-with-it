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
  const [loading, setLoading] = useState(false);
  const [showButon, setShowButton] = useState(true);
  const [imageuri, setImageUri] = useState("");
  const [imageToUse, setImageToUse] = useState(imageuri ? imageuri : "");
  const { login} = useAuth()
  const selectImage = async () => {
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
  const sendapi = async () => {
    setLoading(true)
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
      setLoading(false)
      setShowButton(false)
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
      {!loading && <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20, paddingHorizontal: 20 }}>
        <MaterialCommunityIcons
          color="white"
          name="close"
          size={30}
          onPress={() => {
            setImageUri("");
            setImageModal(false)
              setShowButton(true);
          }}
        />
      
        <MaterialCommunityIcons
          color="white"
          name="plus"
          size={30}
          onPress={() => {
            handlePress()
            
          }}
        />
      </View>}

      
        <Modal visible={camera}>
          <Camera setCamera={setCamera} onShot={handleShot} setShowButton={setShowButton} />
          </Modal>
      
      {/* <Image style={styles.uploadImage} source={imageuri ? { uri: imageuri } : ''} /> */}
      <View style={styles.uploadImage}>
        {imageuri && <View style={styles.uploadImage}>
          <Image style={{ width: '100%', height: 250 }} source={{ uri: imageuri }} />
          <View style={{marginHorizontal:15 }}>
          
            {showButon && <AppButton
              title={!loading ? 'Use this image preview' : 'posting...'}
              onPress={() => {
                
                
                sendapi()
                
              }}
              style={{ marginTop: 50 }}
              active={loading}
            
            />}
          
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
