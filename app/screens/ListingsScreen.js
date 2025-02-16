import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, RefreshControl, Text, View, ScrollView, TouchableHighlight, TouchableWithoutFeedback } from "react-native";

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
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';

function ListingsScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [listingsQueryObject, setListingsQueryObject] = useState({});
  const [displayItems, setDisplayItems] = useState([]);
  const [displayDatePicker, setDisplayDatePicker] = useState(false);
  const { request, setError, data, error, loading, setData, setLoading } =
    useApi(listingsApi.getListings);
  
  const setDate = (event, date) => {
    console.log('type')
    const {
      type,
      nativeEvent: {timestamp, utcOffset},
    } = event;
    setListingsQueryObject((listingsQuery)=> ({...listingsQuery, date }))
    setDisplayDatePicker(false)
    
  };
  
  useEffect(() => {
    loadListings();
    

  }, []);
  
  const loadListings = async () => {
    setLoading(true);
    const response = await request({ page: 1 });
    setLoading(false)
    if (!response.ok) {
      if (response.data) return setError(response.data.error);
      else {
        return setError("An unexpected error occured.");
      }
    }
    console.log('main')
    setListingsQueryObject((queryObject) => {
      console.log('nextboy')
      console.log({ ...queryObject, page: response.data.nextPage })
      console.log('nextboys')
      return { ...queryObject, page: response.data.nextPage }
    });
    setData(response.data);
    setDisplayItems(response.data.resources);
    console.log(response.data)

  };
  const loadListings_2 = async () => {
    console.log('here')
    setIsLoading(true);
    
    const response = await request({ page: listingsQueryObject.page });
    setIsLoading(false)
     
    if (!response.ok) {
      if (response.data) return setError(response.data.error);
      else {
        return setError("An unexpected error occured.");
      }
    }

    
    setListingsQueryObject((queryObject) => ({...queryObject, page: response.data.nextPage}) );

    
    console.log({ ...listingsQueryObject, page: response.data.nextPage })

    
    setData();
    console.log('get hweww');
    setDisplayItems((dat) => [...dat, ...response.data.resources]);

  };
  const onEndReached = () => {
    console.log('hre21')

    if (!isLoading && listingsQueryObject.page ) {
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
      return <Text style={{textAlign: 'center', marginBottom: 5}}>Loading...</Text>;
    }
    if (!isLoading && !listingsQueryObject.page) {
      return <Text style={{textAlign: 'center', marginBottom: 10}}>Nothing to show</Text>;
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
        <ScrollView
          horizontal
          contentContainerStyle={{paddingBottom: 20, position: 'relative',  }}
          //style={{ display: 'flex', flexGrow: 1, marginBottom: 5, flexDirection: 'row', backgroundColor: 'green', overflowX: 'scroll', width: '200' }}
        >
          <View style={{borderRadius: 20, borderWidth: 1, marginEnd:10}}> 
          <Picker
            
          mode="dropdown"
          style={{width: 200,  paddingBottom:20, }}
  selectedValue={selectedLanguage}
  onValueChange={(category, ) =>
    setListingsQueryObject((listingsQuery) => ({...listingsQuery, category})
  )}>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
  <Picker.Item label="JavaSc" value="mnkj" />
            </Picker>
            </View>
            
          
          <TouchableWithoutFeedback onPress={() => setDisplayDatePicker(true)}>
          <View  style={{ borderRadius: 15, borderWidth: 2, width: 200, height: 100 }}>
            <Text>Pick date from:</Text>
            </View>
              </TouchableWithoutFeedback>
          
          {displayDatePicker && <RNDateTimePicker mode="date" value={new Date()} fullscreen={true} onChange={setDate} />}
          </ScrollView>

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
          //onEndReachedThreshold={0.5}
          ListEmptyComponent={listEmptyComponent}
          ListFooterComponent={listFooterComponent}
          //initialNumToRender={5}
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
