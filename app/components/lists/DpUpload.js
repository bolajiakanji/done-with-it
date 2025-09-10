import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Alert,
  Modal,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Camera from "../Camera";
import AccountImage from "../AccountImage";
import AppButton from "../Button";
import selectImage from "../../utility/selectImage";
import updateDp from "../../utility/updateDp";
import useAuth from "../../auth/useAuth";
import imageTriger from "../../utility/imageTriger";

function DpUPLoad({ setImageModal, setpi }) {
  const [camera, setCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showButon, setShowButton] = useState(true);
  const [imageuri, setImageUri] = useState("");
  const { login } = useAuth()

  const updateDpObject = {
    setLoading,
    imageuri,
    setpi,
    setShowButton,
    login
  }

  const handlePress = () => {
    const cameraPress = () => setCamera(true)
    const galleryPress = () => selectImage(setImageUri, setShowButton)
    imageTriger(cameraPress, galleryPress)
  };

  const handleShot = (selectedImage) => {
    setImageUri(selectedImage);
  };

  return (
    <View style={styles.modalContainer}>
      {!loading &&
        <View style={styles.loading}>
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
            onPress={() => handlePress()}
          />
        </View>}

      <Modal visible={camera}>
        <Camera
          setCamera={setCamera}
          onShot={handleShot}
          setShowButton={setShowButton}
        />
      </Modal>

      <View style={styles.uploadImage}>
        {imageuri &&
          <View style={styles.uploadImage}>
            <Image style={styles.image} source={{ uri: imageuri }} />

            <View style={{ marginHorizontal: 15 }}>
              {showButon &&
                <AppButton
                  title={!loading ? 'Use this image preview' : 'posting...'}
                  onPress={() => updateDp(updateDpObject)}
                  style={{ marginTop: 50 }}
                  active={loading}
                />}
            </View>
          </View>
        }

        {!imageuri && <AccountImage />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
  },

  camContainer: {
    position: "absolute",
    zIndex: 6,
    flex: 1,
    width: "100%",
    height: 300,
  },

  loading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20
  },

  image: {
    width: '100%',
    height: 250
  },

  title: {
    fontWeight: "500",
  },

  uploadImage: {
    position: "relative",
    zIndex: 5,
    top: "15%",
    width: "100%",
    height: 200,
  },
});

export default DpUPLoad;
