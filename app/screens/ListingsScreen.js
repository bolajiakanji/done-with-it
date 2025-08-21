import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, RefreshControl, Text, View } from "react-native";
import { Image } from "expo-image";
import AppText from "../components/Text";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import { useApi } from "../hooks";
import ListingFilterings from "./ListingFilterings";
import Skeleton from "./Skeleton";
import authStorage from "../auth/storage";
import useAuth from "../auth/useAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AdvancedImage } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";
import BarStyleContext from "../context/barStyle";
import myCloud from "../utility/cid";

function ListingsScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefres] = useState(false);
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
      <View style={{ paddingHorizontal: 13, backgroundColor: colors.primary, }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              columnGap: 5,
            }}
          >
            <Image
              source={require("../../assets/images/adaptiveIcon.png")}
              style={{ width: 40, height: 39, borderRadius: 8 }}
            />

            <Text
              style={{ color: "dodgerblue", fontWeight: "bold", fontSize: 25 }}
            >
              BORJI
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <View style={{ width: 30, height: 30, borderRadius: 25, backgroundColor: '#ccc', overflow: 'hidden' }}>
              {user.image ? (
                <AdvancedImage
                  cldImg={profileImage}
                  style={{ height: '100%', width: '100%' }}
                />
              ) : (

                <MaterialCommunityIcons name="account" size={28} color="gray" />

              )}
            </View>
            <Text style={{ fontSize: 11, color: colors.white }}>
              {user.email.slice(0, 8) + " ..."}
            </Text>
          </View>
        </View>
        {error && (
          <>
            <AppText style={{ color: "red", marginTop: 10 }}>{error}</AppText>
            <Button title="Retry" onPress={loadListings} />
          </>
        )}
        {loading && <Skeleton />}

        {!error && !loading && <ListingFilterings
          listingsQueryObject={listingsQueryObject}
          setListingsQueryObject={setListingsQueryObject}
          displayItems={displayItems}
          setDisplayItems={setDisplayItems}
          request={request}
          setData={setData}
        />}
      </View>
    )
  }

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
