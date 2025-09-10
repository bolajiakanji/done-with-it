import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Text from "./Text";
import colors from "../config/colors";
import { AdvancedImage } from "cloudinary-react-native";
import myCloud from "../utility/cid";

function UserShortInfo({
  name,
  email,
  itemsAvailable,
  image,
  itemOnPress,
  imageOnPress,
  imageStyle,
  iconStyle,
  iconSize,
}) {
  const cld = myCloud()
  const profileImage = cld.image(image);

  return (
    <TouchableOpacity underlayColor={colors.light} onPress={itemOnPress}>
      <View style={styles.container}>
        {!image ?
          <MaterialCommunityIcons
            name="account"
            size={iconSize || 28}
            color="gray"
            style={[styles, icon, iconStyle]}
          />
          :
          <TouchableOpacity onPress={imageOnPress}>
            <AdvancedImage
              cldImg={profileImage}
              style={[styles.advanceImage, imageStyle]}
            />
          </TouchableOpacity>
        }

        <View style={styles.detailsContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>

          {email && <Text style={styles.email} numberOfLines={1}>
            {email}
          </Text>
          }

          {itemsAvailable && 
          <Text style={styles.itemsAvailable} numberOfLines={1}>
            {itemsAvailable}
          </Text>}
        </View>

        <MaterialCommunityIcons
          color={colors.medium}
          name="chevron-right"
          size={25}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  advanceImage: {
    width: 35,
    height: 35,
    borderRadius: 20
  },

  container: {
    alignItems: "center",
    flexDirection: "row",
  },

  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },

  icon: {
    borderRadius: 15,
    backgroundColor: "#bbb",
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 35,
  },

  itemsAvailable: {
    color: colors.medium,
  },

  name: {
    fontWeight: "500",
  },
});

export default UserShortInfo;
