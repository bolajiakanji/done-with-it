import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({ title, onPress, color = "primary", style, active }) {
  const width =  style?.width || '100%'
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color]}, {...style}]}
      onPress={onPress}
      disabled={active}
    >
      <Text style={styles.text} >{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    
    marginVertical: 10,
    
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
