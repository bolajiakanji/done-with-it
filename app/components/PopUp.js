import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AppText from "./Text";
import colors from "../config/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNetInfo } from "@react-native-community/netinfo";
import { center } from "@cloudinary/url-gen/qualifiers/textAlignment";

export default function PopUp({message}) {
const [showErroeMessage, setShowErrorMessage] = useState(true)
useEffect(() => {
  setTimeout(() => {
    setShowErrorMessage(false)
  }, 10000);
})

if (!showErroeMessage) return null
    return (
      <SafeAreaView style={styles.container}>
        <AppText style={styles.text}>An unexpected error occur</AppText>
      </SafeAreaView>
    )}

const styles = StyleSheet.create({
  container: {
    
    position: "absolute",
    zIndex: 70,
    top: 40,
    width: '100%',
    justifyContent: 'center',
    
  },
  text: {
    color: 'red',
    textAlign: 'center',
   // fontWeight: 'bold',
  //  backgroundColor: 'white',
    display: 'flex'
    //fontSize: 16
  },
});
