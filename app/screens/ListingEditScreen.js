import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import UploadScreen from "./UploadScreen";
import categories from "../utility/categoryList";
import { editValidationSchema } from "../utility/validation_schema";
import usePostItem from "../hooks/usePostItem";

function ListingEditScreen() {
  const postItemApi = usePostItem()

  const {
    error,
    loading,
    postItem,
    progress,
    uploadVisible,
    setUploadVisible
  } = postItemApi

  const handleSubmit = (listing, { resetForm }) => {
    console.log('me45')
    console.log(postItem)
    postItem(listing, resetForm)
    console.log('me456')
  };

  return (
    <Screen
      style={styles.container}
      barStyle='dark-content'
      background='#99ccff'
    >
      <View style={{ marginHorizontal: 10 }}>
        <Form
          initialValues={{
            title: "",
            price: "",
            description: "",
            category: null,
            images: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={editValidationSchema}
        >
          <Text style={styles.item}>Add Item</Text>

          <FormImagePicker name="images" />

          <FormField maxLength={255} name="title" placeholder="Title" />

          <FormField
            keyboardType="numeric"
            maxLength={8}
            name="price"
            placeholder="Price"
            width={120}
          />

          <Picker
            items={categories}
            name="category"
            numberOfColumns={3}
            PickerItemComponent={CategoryPickerItem}
            placeholder="Category"
            width="50%"
          />

          <FormField
            maxLength={255}
            multiline
            name="description"
            numberOfLines={2}
            placeholder="Description"
          />

          <SubmitButton title="Post" active={!loading}/>
        </Form>

        <UploadScreen
          onDone={() => setTimeout(() => setUploadVisible(false), 2000)}
          progress={progress}
          visible={uploadVisible}
          loading={loading}
          error={error}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#99ccff",
    flex: 1,
  },

  item: {
    textAlign: "center",
    fontWeight: "bold",
    marginTopTop: "80",
    fontSize: 18,
  },
})

export default ListingEditScreen;
