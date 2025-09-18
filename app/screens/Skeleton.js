import React from "react";
import SkeletonLoading from "expo-skeleton-loading";
import {
  StyleSheet,
  View,
} from "react-native";

const skeletonColor = '#adadad'

const Skeleton = () => {
  const itemSkeletonArray = [1, 2, 3, 4, 5, 6]
  const filterSkeletonArray = [1, 2]

  return (
    <SkeletonLoading background={skeletonColor} highlight={"#ffffff"}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          {filterSkeletonArray.map(item => (
            <View key={item} style={styles.filter} />
          ))}
        </View>
        <View style={styles.itemSkeletonBox}>
          {itemSkeletonArray.map((item,) => (
            <View style={SkeletonContainer} key={item}>
              <View style={styles.skeletonWrapper} />
              <View>
                <View style={[styles.skeletonStyle, { width: '80%' }]} />
                <View style={[styles.skeletonStyle, { width: '50%' }]} />
                <View style={[styles.skeletonStyle, { width: '20%' }]} />
              </View>
            </View>
          ))}
        </View>
      </View>
    </SkeletonLoading>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginTop: 15
  },
  filter: {
    width: 120,
    height: 40,
    backgroundColor: skeletonColor,
    borderRadius: 15,
  },
  itemSkeletonBox: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center'
  },
  SkeletonContainer: {
    width: '48%',
    marginBottom: 10
  },
  skeletonWrapper: {
    backgroundColor: "#adadad",
    width: "100%",
    height: 170,
    marginBottom: 3,
    borderRadius: 15,
  },
  wrapper: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    justifyContent: 'center'
  },
  skeletonStyle: {
    backgroundColor: "#adadad",
    width: "80%",
    height: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  skeletonStyle: {
    backgroundColor: "#adadad",
    width: "80%",
    height: 10,
    borderRadius: 5,
    marginTop: 5,
  }
})

export default Skeleton;
