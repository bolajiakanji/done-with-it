import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AppText from "./Text";
import colors from "../config/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNetInfo } from "@react-native-community/netinfo";

export default function PopUp() {

  if (netInfo.isInternetReachable === false && netInfo.type !== "unknown")
    return (
      <SafeAreaView style={styles.container}>
        <AppText style={styles.text}>No internet connection</AppText>
      </SafeAreaView>
    );

  return null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    position: "absolute",
    zIndex: 50,
    left: 80,
    paddingHorizontal: 10,
  },
  text: {
    color: colors.primary,
  },
});
