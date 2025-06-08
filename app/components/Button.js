import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({ title, onPress, color = "white", buttonBackground = 'blue', style, active }) {
  const width =  style?.width || '100%'
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonBackground, opacity: !active ? 1 : 0.3}, {...style}]}
      onPress={onPress}
      disabled={active}
    >
      <Text style={[styles.text, {color:color}]} >{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    
    marginVertical: 10,
    
  },
  text: {
    
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
