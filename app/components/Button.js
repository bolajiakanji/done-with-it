import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

function AppButton({ 
  title, 
  onPress, 
  color = "white", 
  buttonBackground = 'blue', 
  style, 
  active = true 
}) {
  const defaultStyle = { 
    backgroundColor: buttonBackground, 
    opacity: active ? 1 : 0.4
  } 

  return (
    <TouchableOpacity
      style={[styles.button, defaultStyle, {...style}]}
      onPress={onPress}
      disabled={!active}
    >
      <Text style={[styles.text, {color: color}]}>{title}</Text>
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
