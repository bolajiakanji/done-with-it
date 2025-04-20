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
  const itemSkeletonArray = [1, 2, 3, 4, 5, 6]
  const filterSkeletonArray = [1, 2, 3]
  return (
    <SkeletonLoading background={"#adadad"} highlight={"#ffffff"}>
      <View style={{ flexDirection: "column", marginTop: 15 }}>
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
          {filterSkeletonArray.map(item => (
          <View
            style={{
              width: 120,
              height: 40,
              backgroundColor: "#adadad",
              borderRadius: 15,
            }}
          />
        ))}
          
        </View>
        <View style={{display: 'flex',width: '100%',flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center'  }}>
          { itemSkeletonArray.map( (item, index) => (
          <View style={{width: '48%',marginBottom: 10  }} >
            <View
              style={{
                backgroundColor: "#adadad",
                width: "100%",
                height: 170,
                  marginBottom: 3,
                borderRadius: 15,
               
              }}
              />
             <View style={{ }}>
              <View
                style={{
                  backgroundColor: "#adadad",
                  width: "80%",
                  height: 10,
                  borderRadius: 5,
                  marginTop: 6,
                  }}
              />
              <View
              style={{
                backgroundColor: "#adadad",
                width: "50%",
                height: 10,
                borderRadius: 5,
                marginTop: 5,
                }}
                />
                <View
                style={{
                  backgroundColor: "#adadad",
                  width: "20%",
                  height: 10,
                  borderRadius: 5,
                  marginTop: 5,
                  }}
                  />
                  </View>
                  
      
    </View>
    ))}
          
        </View>
      </View>
    </SkeletonLoading>
  );
};

export default Skeleton;
