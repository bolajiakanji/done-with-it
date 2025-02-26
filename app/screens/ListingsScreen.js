import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, RefreshControl, Text,View, Image } from "react-native";
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
import SkeletonLoading from 'expo-skeleton-loading'
import Skeleton from "./Skeleton";
import authStorage from "../auth/storage";
import useAuth from "../auth/useAuth";







function ListingsScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listingsQueryObject, setListingsQueryObject] = useState({});
  const [displayItems, setDisplayItems] = useState([]);
  const { request, setError, data, error, loading, setData, setLoading } =
    useApi(listingsApi.getListings);
    const { user, logOut } = useAuth();


  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    setLoading(true);
    const response = await request({ page: 1 });
    setLoading(false);
    console.log('notoka2')
    console.log(response)
    if (!response) {
      console.log('notokay')
      
      return setError("An unexpected error occured.")
    };
      if (response.data.error) return setError(response.data.error);
      
setListingsQueryObject((queryObject) => {
      
      return { ...queryObject, page: response.data.nextPage };
    });
    setData(response.data);
    setDisplayItems(response.data.resources);
    
  };
  const loadListings_2 = async () => {
    console.log("heresh");
    setIsLoading(true);

    const response = await request({ page: listingsQueryObject.page });
    setIsLoading(false);

    if (!response) {
      console.log('notokay')
      return setError("An unexpected error occured.")
    };
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
  const listEmptyComponent = () => {
    if (!isLoading && !listingsQueryObject.page) {
      return <Text>Nothing to show</Text>;
    }
  };
  const listFooterComponent = () => {
    if (isLoading && displayItems?.length > 0) {
      return (
        <Text style={{ textAlign: "center", marginBottom: 5 }}>Loading...</Text>
      );
    }
    if (!isLoading && !listingsQueryObject.page) {
      return (
        <Text style={{ textAlign: "center", marginBottom: 10 }}>
          Nothing to show
        </Text>
      );
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadListings();
    setRefreshing(false);
  };
  console.log(error)
  if (loading) return <Skeleton />
  const me = async() => {
    const owner = await authStorage.getUser();
    console.log(owner)
return owner.image
  }

  return (
    <>
     
      
      <Screen style={styles.screen}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 5}}> 
        <Image source={require('../../assets/images/adaptiveIcon.png')} style={{width: 40, height:40, borderRadius:8}} />
        <Image src={user.image} style={{width: 40, height:40, borderRadius:8}} />
          <Text style={{color: 'dodgerblue', fontWeight: "heavy", fontSize: 20}}>BORJI</Text>
        </View>
        {error && (
          <>
            <AppText style={{ color: "red" }}>{error}</AppText>
            <Button title="Retry" onPress={loadListings} />
          </>
        )}
          

        <ListingFilterings
          listingsQueryObject={listingsQueryObject}
          setListingsQueryObject={setListingsQueryObject}
          displayItems={displayItems}
          setDisplayItems={setDisplayItems}
          request={request}
          setData={setData}
        />
        
        

        <FlatList
          data={displayItems}
          keyExtractor={(listing, index) => index}
          renderItem={({ item }) => {
            return (
              <Card
                title={item.title}
                description={item.description}
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
          //onEndReachedThreshold={0.5}
          ListEmptyComponent={listEmptyComponent}
          ListFooterComponent={listFooterComponent}
          //initialNumToRender={5}
          
          
          numColumns='2'
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
