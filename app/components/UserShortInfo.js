import React from "react";
import { View, StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable/";
// import Image from "";

import Text from "./Text";
import colors from "../config/colors";
import { AdvancedImage } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";

function UserShortInfo({
  name,
  email,
  itemsAvailable,
  image,
  
  itemOnPress,
  imageOnPress,
  renderRightActions,
  imageStyle,
  iconStyle,
  iconSize,
}) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dlutiw9i4",
    },  
  });
  const profileImage = cld.image(image);

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity underlayColor={colors.light} onPress={itemOnPress}>
        <View style={styles.container}>
          {!image ? (
            <MaterialCommunityIcons
              name="account"
              size={iconSize || 28}
              color="gray"
              style={[
                {
                  borderRadius: 15,
                  padding: 2,
                  backgroundColor: "#bbb",
                },
                iconStyle,
              ]}
            />
                  ) : (
                          <TouchableOpacity onPress={imageOnPress}>
            <AdvancedImage
              cldImg={profileImage}
              
              style={[{ width: 35, height: 35, borderRadius: 20 }, imageStyle]}
                />
                              </TouchableOpacity>
          )}
          <View style={styles.detailsContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>

                      { email && <Text style={styles.email} numberOfLines={1}>
                          {email}
                      </Text>
                      }
                      { itemsAvailable && <Text style={styles.itemsAvailable} numberOfLines={1}>
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
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 10,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
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
