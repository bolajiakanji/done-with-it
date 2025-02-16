import React, { useState } from "react";
import { Text, View, ScrollView, TouchableWithoutFeedback } from "react-native";
import { Picker } from '@react-native-picker/picker';


const ListingFilterings = ({ listingsQueryObject, setListingsQueryObject }) => {
  const [displayDatePicker, setDisplayDatePicker] = useState(false);

  const setDate = (event, date) => {
    console.log("type");
    const {
      type,
      nativeEvent: { timestamp, utcOffset },
    } = event;
    setListingsQueryObject((listingsQuery) => ({ ...listingsQuery, date }));
    setDisplayDatePicker(false);
  };
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{ paddingBottom: 20, position: "relative" }}
    >
      <View style={{ borderRadius: 20, borderWidth: 1, marginEnd: 10 }}>
        <Picker
          mode="dropdown"
          style={{ width: 200, paddingBottom: 20 }}
          selectedValue={listingsQueryObject.category}
          onValueChange={(category) =>
            setListingsQueryObject((listingsQuery) => ({
              ...listingsQuery,
              category,
            }))
          }
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="JavaSc" value="mnkj" />
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
