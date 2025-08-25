import React, { useState } from "react";
import { FlatList, StyleSheet, RefreshControl, View } from "react-native";
import Card from "../components/Card";
import colors from "../config/colors";
import Flatlist_header from "../components/Flatlist_header";
import ListingsFooter from "../components/ListingsFooter";
import myCloud from "../utility/cid";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useListings from "../hooks/useListings";

function ListingsScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listingsQueryObject, setListingsQueryObject] = useState({});
  const [displayItems, setDisplayItems] = useState([]);

  const { request, error, loading, setData, loadListings, loadListings_2 } =
    useListings(
      listingsQueryObject,
      setListingsQueryObject,
      setDisplayItems,
      setIsLoading
    );

  const cld = myCloud()

  const onEndReached = () => {
    if (!isLoading && listingsQueryObject.page) {
      loadListings_2();
    }
  };

  const listingsFooterComponent = () => {
    return (
      <ListingsFooter
        displayItems={displayItems}
        listingsQueryObject={listingsQueryObject}
        isLoading={isLoading}
      />
    )
  }

  const Header = () => {
    return (
      <Flatlist_header
        listingsQueryObject={listingsQueryObject}
        setListingsQueryObject={setListingsQueryObject}
        displayItems={displayItems}
        setDisplayItems={setDisplayItems}
        loading={loading}
        setData={setData}
        error={error}
        request={request}
      />
    )
  }

  const onRefresh = () => {
    setRefreshing(true);
    loadListings();
    setRefreshing(false);
  };

  return (
    <Screen 
    style={styles.screen} 
    barStyle='light-content' 
    background={colors.primary}
    >
      <FlatList
        data={displayItems}
        keyExtractor={(listing, index) => index}
        renderItem={({ item }) => {
          const myImage = cld.image(item.images[0]);
          return (
            <Card
              item={item}
              myImage={myImage}
              onPress={() =>
                navigation.navigate(routes.LISTING_DETAILS, item)
              }
            />
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={onEndReached}
        ListFooterComponent={listingsFooterComponent}
        ListHeaderComponent={Header}
        stickyHeaderIndices={[0]}
        initialNumToRender={10}
        numColumns="2"
        columnWrapperStyle={styles.columnWrapperStyle}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#e6f2ff'
  },

  columnWrapperStyle: {
    columnGap: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#e6f2ff'
  }
});

export default ListingsScreen;
