import React from "react";
import { View, StyleSheet, Modal, Text } from "react-native";
import LottieView from "lottie-react-native";

function UploadScreen({ onDone, loading, error, visible = false }) {

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {loading &&
          <View style={styles.loading}>
            <Text style={styles.postingText}>POSTING...</Text>
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
              color: "#fc5c65"
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

  loading: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  postingText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default UploadScreen;