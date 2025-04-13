import React from "react";
import { View, StyleSheet, TouchableHighlight, } from "react-native";
import { Image} from "expo-image";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable/";
// import Image from "";


import Text from "./Text";
import colors from "../config/colors";
import { AdvancedImage } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";


function UserShortInfo({
  title,
  subTitle,
  image,
  poster,
  onPress,
  renderRightActions,
}) {

    const cld = new Cloudinary({
        cloud: {
          cloudName: "dlutiw9i4",
        },
    });
    const profileImage= cld.image(image)

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {!poster && (
                                  <MaterialCommunityIcons
                                    name="account"
                                    size={28}
                                    color="gray"
                                    style={{
                                      borderRadius: 15,
                                      padding: 2,
                                      backgroundColor: "#bbb",
                                    }}
                                  />
                                )}
                                {poster && (
                                  <AdvancedImage cldImg={profileImage} style={{width:35, height: 35, borderRadius: 20}} />
                                )}
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {subTitle && (
              <Text style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </Text>
            )}
          </View>
          <MaterialCommunityIcons
            color={colors.medium}
            name="chevron-right"
            size={25}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 10,
    backgroundColor: colors.white,
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
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
  },
});

export default UserShortInfo;
