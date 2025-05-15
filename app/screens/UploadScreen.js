import React from "react";
import { View, StyleSheet, Modal, Text } from "react-native";
import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";

import colors from "../config/colors";

function UploadScreen({ onDone, loading, error, progress = 0, visible = false }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {loading &&
          <View
            style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>POSTING...</Text>
          </View>
        }
         {!loading && !error && <LottieView
            autoPlay
            loop={false}
            onAnimationFinish={onDone}
            source={require("../assets/animations/done.json")}
              style={styles.animation}
              colorFilters={[
                {
                  keypath: 'button',
                  color:  "#fc5c65"
                },
                
              ]}
          />}
        
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 150,
    flex: 1
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default UploadScreen;