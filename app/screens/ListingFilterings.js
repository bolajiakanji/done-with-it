import React, { useState } from "react";
import { Text, View, ScrollView, TouchableWithoutFeedback,TouchableHighlight  } from "react-native";
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';




const ListingFilterings = ({ listingsQueryObject, setListingsQueryObject, displayItems, setDisplayItems,
    setData, request }) => {
    const [displayDatePicker, setDisplayDatePicker] = useState(false);
    const [pickerLoading, setPickerLoading] = useState(false);
    const [dateLoading, setDateLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);



    
  const handleAllButton = async (filter, object) => {
      const initialQueryObject = {...listingsQueryObject}
        const filt = {}
        filt[filter] = true
        let response
        filter === 'category' ?  setPickerLoading(true) : setDateLoading(true)
        if (object.category === '0') {
          console.log(filt)
          response = await request({page:1, category: ''})
        } else {
          response = await request({ ...listingsQueryObject, ...object, page: 1, });
          
        }
        filter === 'category' ?  setPickerLoading(false) : setDateLoading(false)
        
        if (!response.ok) {
            if (response.data) return setError(response.data.error);
            else {
              setListingsQueryObject(initialQueryObject)
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
      if (event.type === 'set') {
        handleAllButton('date', { date: date })
      } 
      
      // setListingsQueryObject((listingsQuery) => ({ ...listingsQuery, date }));
      setDisplayDatePicker(false);
      };
      
    return (
        
            
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 10, marginVertical: 20,}}>
    

        <View style={{
          borderRadius: 15, height: 40, padding: 0, margin: 0, backgroundColor: '#ADD8E6',
        opacity : pickerLoading ? 0.5 : 1
       }}>
        <Picker
          mode="dropdown"
                    style={{ width: 160, margin: -9,color: 'black',  }}
                    
            selectedValue={listingsQueryObject.category}
            enabled={!pickerLoading}
            onValueChange={(category) => {
                    console.log('change')
                    console.log('change2')
                       handleAllButton('category', {category: category})
                    //   setListingsQueryObject((listingsQuery) => ({
                    //       ...listingsQuery,
                    //       category,
                    //   }))
                  }
          }
        >
          <Picker.Item label="All" value='0'  />
          <Picker.Item label="Furniture" value="1" />
          <Picker.Item label="Cars" value="2" />
          <Picker.Item label="Camera" value="3" />
          <Picker.Item label="Games" value="4" />
          <Picker.Item label="Clothing" value="5" />
          <Picker.Item label="Sport" value="6" />
          <Picker.Item label="Books" value="8" />
          <Picker.Item label="Others" value="9" />
        </Picker>
      </View>

      {displayDatePicker && (
        <RNDateTimePicker
          mode="date"
          value={listingsQueryObject.date || new Date(Date.now() + 86400000)}
          fullscreen={true}
            onChange={setDate}
            maximumDate={new Date(Date.now() + 86400000)}
            disabled={dateLoading}
        />
      )}
      <TouchableWithoutFeedback onPress={() => setDisplayDatePicker(true)}>
        <View
            style={{
              borderRadius: 15, backgroundColor: '#ADD8E6', width: 140, height: 40,
            opacity : dateLoading ? 0.5 : 1,  justifyContent: 'center', padding: 10
            }}
        >
          <Text style={{color: '#333'}}>Pick date :</Text>
        </View>
      </TouchableWithoutFeedback>
                
                </View>
        

  );
};

export default ListingFilterings;
