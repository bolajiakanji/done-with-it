import SkeletonLoading from "expo-skeleton-loading";
import {
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
  View,
  Image,
} from "react-native";

import React from "react";

const Skeleton = () => {
  return (
    <SkeletonLoading background={"#adadad"} highlight={"#ffffff"}>
      <View style={{ flexDirection: "column" }}>
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
          <View
            style={{
              width: 140,
              height: 40,
              backgroundColor: "#adadad",
              borderRadius: 15,
            }}
          />
          <View
            style={{
              width: 140,
              height: 40,
              backgroundColor: "#adadad",
              borderRadius: 15,
            }}
          />
          <View
            style={{
              width: 140,
              height: 40,
              backgroundColor: "#adadad",
              borderRadius: 15,
            }}
          />
        </View>
        <View style={{}}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                backgroundColor: "#adadad",
                width: "100%",
                height: 200,
                marginBottom: 3,
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <View
                style={{
                  backgroundColor: "#adadad",
                  width: "70%",
                  height: 10,
                  borderRadius: 5,
                  marginTop: 6,
                }}
              />
              <View
                style={{
                  backgroundColor: "#adadad",
                  width: "40%",
                  height: 10,
                  borderRadius: 5,
                  marginTop: 4,
                }}
              />
              <View
                style={{
                  backgroundColor: "#adadad",
                  width: "5%",
                  height: 10,
                  borderRadius: 5,
                  marginTop: 4,
                }}
              />
            </View>
          </View>
          <View style={{ marginTop: 270 }}>
            <View
              style={{
                backgroundColor: "#adadad",
                width: "100%",
                height: 200,
                marginBottom: 3,
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <View
                style={{
                  backgroundColor: "#adadad",
                  width: "70%",
                  height: 10,
                  borderRadius: 5,
                  marginTop: 6,
                }}
              />
              <View
                style={{
                  backgroundColor: "#adadad",
                  width: "40%",
                  height: 10,
                  borderRadius: 5,
                  marginTop: 4,
                }}
              />
              <View
                style={{
                  backgroundColor: "#adadad",
                  width: "5%",
                  height: 10,
                  borderRadius: 5,
                  marginTop: 4,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </SkeletonLoading>
  );
};

export default Skeleton;
