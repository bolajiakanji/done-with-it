const handlePress = () => {
    if (!imageUri) {
      Alert.alert("", "Choose image", [
        { text: "cancel" },
        { text: "Camera", onPress: () => setCamera(true) },
        { text: "Gallery", onPress: () => selectImage() },
      ]);
    } else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };
