import {
  CameraView,
  CameraType,
  useCameraPermissions,
  takePictureAsync,
} from "expo-camera";
import { useRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Camera({ camera, onChangeImage, setCamera }) {
  const [facing, setFacing] = useState("back");
  const [shot, setshot] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (camera) {
    if (!permission) {
      // Camera permissions are still loading.
      return <View />;
    }

    if (!permission.granted) {
      // Camera permissions are not granted yet.
      return (
        <View style={styles.container}>
          <Text style={styles.message}>
            We need your permission to show the camera
          </Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }

    function toggleCameraFacing() {
      setFacing((current) => (current === "back" ? "front" : "back"));
    }
    async function takeShot() {
      if (shot) {
        const take = await cameraRef.current.takePictureAsync();
        console.log(take);
        onChangeImage(take.uri);
        setCamera(false);
        return;
      }
      return null;
    }

    return (
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
        flash="on"
        onCameraReady={() => setshot(true)}
      >
        <View style={styles.buttonContainer}>
          <View style={{ display: "flex", gap: 10 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takeShot}>
              <MaterialCommunityIcons name="camera" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    zIndex: 10,
    height: 100,
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
