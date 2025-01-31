import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, RefreshControl } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import { useApi } from "../hooks";
import { useFocusEffect } from "@react-navigation/native";

function ListingsScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false)
  const getListingsApi = useApi(listingsApi.getListings);

  useEffect(() => {
    loadListings();
    
  }, []);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     loadListings()
  //     console.log(getListingsApi.data)
      
  //   }, [])
    
  // )

  const loadListings = async () => {
    const response = await getListingsApi.request({});
    if (!response.ok) {
      if (response.data) getListingsApi.setError(response.data.error);
      else {
        getListingsApi.setError("An unexpected error occured.");
      }
    }
    
  };

  const onRefresh = () => {
    setRefreshing(true)
    loadListings()
    setRefreshing(false)

  }

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        {getListingsApi.error && (
          <>
            <AppText style={{ color: "red" }}>{getListingsApi.error}</AppText>
            <Button title="Retry" onPress={loadListings} />
          </>
        )}

        <FlatList
          data={getListingsApi.data}
          keyExtractor={(listing) => {
            
            return listing._id
          }}
          t
          renderItem={({ item }) => {
            
            return (
              <Card
                title={item.userId}
                subTitle={"$" + item.price}
                imageUrl={item.images[0].url}
                onPress={() =>
                  navigation.navigate(routes.LISTING_DETAILS, item)
                }
                thumnailUrl={item.images[0].thumnailUrl}
              />
            );
          }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
