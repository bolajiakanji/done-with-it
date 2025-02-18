import React, { useState } from "react";
import { Text, View, ScrollView, TouchableWithoutFeedback,TouchableHighlight  } from "react-native";
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';




const ListingFilterings = ({ listingsQueryObject, setListingsQueryObject, displayItems, setDisplayItems,
    setData, request }) => {
    const [displayDatePicker, setDisplayDatePicker] = useState(false);
    const [LoadingObject, setIsLoadingObject] = useState(null);
    const [isLoading, setIsLoading] = useState(false);



    
    const handleAllButton = async (filter, object) => {
        const filt = {}
        filt[filter] = true
        setIsLoadingObject(filt);
        console.log(filt)
        const response = await request({ ...listingsQueryObject, ...object, page: 1, });
        setIsLoadingObject(null)
        
        
        if (!response.ok) {
            if (response.data) return setError(response.data.error);
            else {
                return setError("An unexpected error occured.");
            }
        }
        setData(response.data);
        
        setListingsQueryObject((queryObject) => {
            console.log(response.data.nextPage)
            console.log({ ...queryObject, page: response.data.nextPage, ...object })
            return { ...queryObject, page: response.data.nextPage, ...object };
        });
        console.log('here5')
        //setData(response.data);
        console.log(response.data)
        setDisplayItems(response.data.resources);
        
    };
    
    
    const setDate = (event, date) => {
      console.log("type");
      const {
        type,
        nativeEvent: { timestamp, utcOffset },
        } = event;
        handleAllButton('date', {date: date})
      // setListingsQueryObject((listingsQuery) => ({ ...listingsQuery, date }));
      setDisplayDatePicker(false);
      };
      
    return (
    <ScrollView
      horizontal
      contentContainerStyle={{ paddingBottom: 20, position: "relative" }}
      >
          <TouchableHighlight
              onPress={()=> handleAllButton('all', {})}
              style={{ borderRadius: 20, borderWidth: 1, marginEnd: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              
                  <Text>All</Text>
              
          </TouchableHighlight>
      <View style={{ borderRadius: 20, borderWidth: 1, marginEnd: 10 }}>
        <Picker
          mode="dropdown"
          style={{ width: 200, paddingBottom: 20 }}
          selectedValue={listingsQueryObject.category}
                  onValueChange={(category) => {
                       handleAllButton('category', {category: category})
                    //   setListingsQueryObject((listingsQuery) => ({
                    //       ...listingsQuery,
                    //       category,
                    //   }))
                  }
          }
        >
          <Picker.Item label="Java" value="4" />
          <Picker.Item label="JavaScript" value="9" />
          <Picker.Item label="JavaSc" value="3" />
        </Picker>
      </View>

      <TouchableWithoutFeedback onPress={() => setDisplayDatePicker(true)}>
        <View
          style={{ borderRadius: 15, borderWidth: 2, width: 200, height: 100 }}
        >
          <Text>Pick date from:</Text>
        </View>
      </TouchableWithoutFeedback>

      {displayDatePicker && (
        <RNDateTimePicker
          mode="date"
          value={new Date()}
          fullscreen={true}
          onChange={setDate}
        />
      )}
    </ScrollView>
  );
};

export default ListingFilterings;
