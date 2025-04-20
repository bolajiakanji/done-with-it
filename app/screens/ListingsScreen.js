import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, RefreshControl, Text, View } from "react-native";
import { Image } from "expo-image";
import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import { useApi } from "../hooks";
import ListingFilterings from "./ListingFilterings";
import SkeletonLoading from "expo-skeleton-loading";
import Skeleton from "./Skeleton";
import authStorage from "../auth/storage";
import useAuth from "../auth/useAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AdvancedImage } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";



function ListingsScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listingsQueryObject, setListingsQueryObject] = useState({});
  const [displayItems, setDisplayItems] = useState([]);
  const { request, setError, data, error, loading, setData, setLoading } =
    useApi(listingsApi.getListings);
  const { user } = useAuth();
  const cld = new Cloudinary({
    cloud: {
        cloudName: 'dlutiw9i4'
    }
  });
  // const myImage = cld.image('items/ca4ed4c3ed3f5c1689437f57f5a12408_full');

  const profileImage = cld.image(user.image)
  console.log(profileImage)
  console.log('profileImage')
  console.log('profileImage')


  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    setLoading(true);
    const response = await request({ page: 1 });
    setLoading(false);
    console.log("notoka2");
    console.log(response);
    if (!response) {
      console.log("notokay");

      return setError("An unexpected error occured.");
    }
    if (response.data.error) return setError(response.data.error);

    setListingsQueryObject((queryObject) => {
      return { ...queryObject, page: response.data.nextPage };
    });
    setData(response.data);
    setDisplayItems(response.data.resources);
    console.log(response.data.resources);
    console.log('response.data.resources');
  };
  const loadListings_2 = async () => {
    console.log("heresh");
    setIsLoading(true);

    const response = await request({ page: listingsQueryObject.page });
    setIsLoading(false);

    if (!response) {
      console.log("notokay");
      return setError("An unexpected error occured.");
    }
    if (response.data.error) return setError(response.data.error);

    setListingsQueryObject((queryObject) => ({
      ...queryObject,
      page: response.data.nextPage,
    }));
    setDisplayItems((dat) => [...dat, ...response.data.resources]);
  };
  const onEndReached = () => {
    console.log("hre21");

    if (!isLoading && listingsQueryObject.page) {
      loadListings_2();
    }
  };
  // const listEmptyComponent = () => {
  //   if (!isLoading && !listingsQueryObject.page) {
  //     return <Text style={{ textAlign: 'center'}}>No Data</Text>;
  //   }
  // };
  const listFooterComponent = () => {
    if (isLoading && displayItems?.length > 0) {
      return (
        <Text style={{ textAlign: "center", marginBottom: 5 }}>Loading...</Text>
      );
    }
    if (!isLoading && listingsQueryObject.page) {
      return (
        <Text style={{ textAlign: "center", marginBottom: 10 }}>
          No more data
        </Text>
      );
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadListings();
    setRefreshing(false);
  };
  console.log(error);
  //if (loading) return <Skeleton />;
  const me = async () => {
    const owner = await authStorage.getUser();
    console.log(owner);
    return owner.image;
  };

  console.log(user.image);
  console.log("beating");
  return (
    <>
      <Screen style={styles.screen}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            //alignItems: "center",
            marginTop:5
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
              {/* 'http://192.168.127.87:9000/assets/http://res.cloudinary.com/dlutiw9i4/image/upload/v1741593827/items/c5db80428d74a5602b8fcb542033dde4_full.jpg */}
              BORJI
            </Text>
          </View>
                    {/* <AdvancedImage cldImg={myImage} style={{ width: 100, height: 100, alignSelf: 'center'}} /> */}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <View style={{ width: 30, height: 30, borderRadius: 25, backgroundColor: '#ccc',overflow:'hidden' }}>
            {user.image ? (
              <AdvancedImage
                cldImg={profileImage}
                style={{ height:'100%',width: '100%' }}
              />
              ) : (
                
              <MaterialCommunityIcons name="account" size={28} color="gray"  />
              
            )}
            </View>
            <Text style={{ fontSize: 11 }}>
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

        <FlatList
          data={displayItems}
          keyExtractor={(listing, index) => index}
          renderItem={({ item }) => {
            console.log('myinage')
            console.log(item.images[0])
            const myImage = cld.image(item.images[0]);
            console.log(myImage)
            console.log('myin33age')

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
          initialNumToRender={10}

          numColumns="2"
          columnWrapperStyle={{columnGap:6}}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
