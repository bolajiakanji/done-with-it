import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, RefreshControl, Text, View } from "react-native";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import { useApi } from "../hooks";
import useAuth from "../auth/useAuth";
import myCloud from "../utility/cid";
import Flatlist_header from "../components/Flatlist_header";

function ListingsScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listingsQueryObject, setListingsQueryObject] = useState({});
  const [displayItems, setDisplayItems] = useState([]);

  const { request, setError, error, loading, setData, setLoading } =
    useApi(listingsApi.getListings);
  const { user } = useAuth();
  const cld = myCloud()

  const profileImage = cld.image(user.image)

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    setLoading(true);
    const response = await request({ page: 1 });
    setLoading(false);
    if (!response) return setError("An unexpected error occured.");

    if (response.data.error) return setError(response.data.error);

    setListingsQueryObject((queryObject) => {
      return { ...queryObject, page: response.data.nextPage };
    });
    setData(response.data);
    setDisplayItems(response.data.resources);
  };
  const loadListings_2 = async () => {
    setIsLoading(true);

    const response = await request({ page: listingsQueryObject.page });
    setIsLoading(false);

    if (!response) return setError("An unexpected error occured.");

    if (response.data.error) return setError(response.data.error);

    setListingsQueryObject((queryObject) => ({
      ...queryObject,
      page: response.data.nextPage,
    }));
    setDisplayItems((dat) => [...dat, ...response.data.resources]);
  };
  const onEndReached = () => {
    if (!isLoading && listingsQueryObject.page) {
      loadListings_2();
    }
  };

  const listFooterComponent = () => {
    if (isLoading && displayItems?.length > 0) {
      return (
        <Text style={{ textAlign: "center", paddingBottom: 10, backgroundColor: '#e6f2ff' }}>Loading...</Text>
      );
    }
    if (!isLoading && !listingsQueryObject.page && displayItems.length === 0) {
      return (
        <Text style={{
          textAlign: "center", paddingBottom: 10, marginTop: 20

        }}>
          No Data
        </Text>
      );
    }
    if (!isLoading && !listingsQueryObject.page) {
      return (
        <Text style={{
          textAlign: "center", paddingBottom: 10,
        }}>
          No more Data
        </Text>
      );
    }
  };
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
      )}

const onRefresh = () => {
  setRefreshing(true);
  loadListings();
  setRefreshing(false);
};

return (
  <>
    <Screen style={styles.screen} barStyle='light-content' background={colors.primary}  >
      < View style={{ position: 'absolute', zIndex: 0, height: 100, backgroundColor: colors.primary, width: '100%' }}></View>
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
        //ListEmptyComponent={listEmptyComponent}
        ListFooterComponent={listFooterComponent}
        ListHeaderComponent={Header}
        stickyHeaderIndices={[0]}
        initialNumToRender={10}

        numColumns="2"
        columnWrapperStyle={{ columnGap: 10, paddingTop: 10, paddingHorizontal: 10, backgroundColor: '#e6f2ff' }}
      />


    </Screen>
  </>
);
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#e6f2ff'
  },
});

export default ListingsScreen;
