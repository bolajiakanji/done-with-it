import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, RefreshControl, Text } from "react-native";

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
  const [refreshing, setRefreshing] = useState(false);
  // const [nex, setnex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [displayItems, setDisplayItems] = useState([]);
  const { request, setError, data, error, loading, setData, setLoading } =
    useApi(listingsApi.getListings);

  let nextRef = useRef(0);

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
    setLoading(false);
    const response = await request({ next: 1 });
    if (!response.ok) {
      if (response.data) return setError(response.data.error);
      else {
        return setError("An unexpected error occured.");
      }
    }
console.log('main')
nextRef.current = response.data.nextPage;
    setData(response.data);
    setDisplayItems(response.data.resources);
    console.log(response.data)

  };
  const loadListings_2 = async () => {
    console.log('here')
    setIsLoading(true);
    console.log(nextRef.current + 'me')
    const response = await request({ next: nextRef.current });
    
    if (!response.ok) {
      if (response.data) return setError(response.data.error);
      else {
        return setError("An unexpected error occured.");
      }
    }
    nextRef.current = response.data.nextPage;
    
    
    
    setData(response.data);
    console.log('get hweww');
    setDisplayItems((dat) => [...dat, ...response.data.resources]);

  };
  const onEndReached = () => {
    console.log('hre2')
    if (!isLoading && nextRef.current && nextRef.current > 0 ) {
      loadListings_2();
    }
  };
  const listEmptyComponent = () => {
    if (!isLoading && displayItems?.length > 0) {
      return <Text>Nothing to show</Text>;
    }
  };
  const listFooterComponent = () => {
    if (isLoading && displayItems?.length > 0) {
      return <Text>Loading...</Text>;
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadListings();
    setRefreshing(false);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        {error && (
          <>
            <AppText style={{ color: "red" }}>{error}</AppText>
            <Button title="Retry" onPress={loadListings} />
          </>
        )}

        <FlatList
          data={displayItems}
          keyExtractor={(listing, index) => index}
          renderItem={({ item }) => {
            return (
              <Card
                title={item.title}
                subTitle={"$" + item.price}
                imageUrl={item.images[0].url}
                onPress={() =>
                  navigation.navigate(routes.LISTING_DETAILS, item)
                }
                thumnailUrl={item.images[0].thumnailUrl}
              />
            );
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={listEmptyComponent}
          ListFooterComponent={listFooterComponent}
          initialNumToRender={5}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
