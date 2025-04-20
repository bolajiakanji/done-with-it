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
        let response
        if (filter === 'all') {
            console.log(filt)
             response = await request({page:1})
        } else {
             response = await request({ ...listingsQueryObject, ...object, page: 1, });
            setIsLoadingObject(null)
        }
        
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
        
            
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 10, marginVertical: 20,}}>
    

      <View style={{ borderRadius: 15, height:40,padding:0, margin:0, backgroundColor: 'blue' }}>
        <Picker
          mode="dropdown"
                    style={{ width: 160, margin: -9,color: 'white'  }}
                    
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
          <Picker.Item label="All" value="-"  />
          <Picker.Item label="male" value="9" />
          <Picker.Item label="female" value="3" />
          <Picker.Item label="others" value="3" />
        </Picker>
      </View>

      {displayDatePicker && (
        <RNDateTimePicker
          mode="date"
          value={new Date()}
          fullscreen={true}
          onChange={setDate}
        />
      )}
      <TouchableWithoutFeedback onPress={() => setDisplayDatePicker(true)}>
        <View
          style={{ borderRadius: 15,backgroundColor: 'blue',  width: 160, height: 40,  justifyContent: 'center', padding: 10 }}
        >
          <Text style={{color: 'white'}}>Pick date from:</Text>
        </View>
      </TouchableWithoutFeedback>
                
                </View>
        

  );
};

export default ListingFilterings;
