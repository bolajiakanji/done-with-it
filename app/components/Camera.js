import {
  CameraView,
  CameraType,
  useCameraPermissions,
  takePictureAsync,
} from "expo-camera";
import { useRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Camera({  onShot, setCamera }) {
  const [facing, setFacing] = useState("back");
  const [shot, setshot] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  
    if (!permission) {
      return <View />;
    }

    if (!permission.granted) {
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
        onShot(take.uri);
        setCamera(false);
        return;
      }
      return null;
    }

      return (
       <View style={styles.container}>   
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
        flash="on"
        onCameraReady={() => setshot(true)}
              >
                      
                  <TouchableOpacity style={styles.arrowCollapse} onPress={()=> setCamera(false)}>
              <MaterialCommunityIcons name="close" size={35} color='white'  />
                  </TouchableOpacity>
                  
        <View style={styles.buttonContainer}>
          
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takeShot}>
              <MaterialCommunityIcons name="camera" size={40} color='white' />
            </TouchableOpacity>
          
        </View>
          </CameraView>
         </View>
              
    );
  
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
       },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    bottom: 20,
    },
    arrowCollapse: {
      margin: 12,
      width: 40,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      backgroundColor: '#aaa',
      height: 40,
      opacity: 0.4
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
