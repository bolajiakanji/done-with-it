import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { ListItem } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import ListItemm from "../components/lists/listingitemmde";
import { AdvancedImage } from "cloudinary-react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import client from "../api/client";
import authStorage from "../auth/storage";
import { Form, FormField, SubmitButton } from "../components/forms";
import { accountValidationSchema } from "../utility/validation_schema";
import myCloud from "../utility/cid";
import DisplayPicture from "../components/account/DisplayPicture";

function AccountScreen() {
  const [showImageModal, setImageModal] = useState(false);
  const [pi, setpi] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, logOut, login } = useAuth();

  const cld = myCloud()
  const image = user.image;
  const profileImage = cld.image(image);

const handleSubmit = async (info) => {
    setLoading(true);
    const output = await client.put("/contacts", {
      ...info,
    });

    await authStorage.storeToken(output.data);
    setLoading(false);
    login(output.data);

    if (output.ok) setOpenModal(false);
  };

  return (
    <Screen style={styles.screen}>
            <ScrollView>
<DisplayPicture 
      profileImage={profileImage} 
      image={image}
      setImageModal={setImageModal}
      />

        <View style={{ marginHorizontal: 15, }}>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18 }}>{user.name}</Text>

            <Text style={{ fontSize: 15 }}>{user.email}</Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
                color: "dodgerblue",
              }}
            >
              {" "}
              Contact Info{" "}
            </Text>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ color: "gray", fontWeight: "bold" }}>Email</Text>
            <Text style={{}}>{user.email}</Text>
          </View>
          {user.contacts?.map((info) => (
            <View style={{ width: "46%", marginBottom: 10 }} key={info._id}>
              <Text style={{ color: "gray", fontWeight: "bold" }}>
                {info.heading}
              </Text>
              <Text style={{}}>{info.contactInfo}</Text>
            </View>
          ))}

        <Pressable onPress={() => setOpenModal(true)}>
          <Text style={{ color: "blue", fontSize: 20 }}>
            
            Add contact info <MaterialCommunityIcons name="plus" />{" "}
          </Text>
        </Pressable>
        </View>

        <View style={styles.container}>
          <ListItem
            title="My Listings"
            subTitle={`${user.userListings || 0} items available for sale`}
            IconComponent={
              <Icon
                name="format-list-bulleted"
                backgroundColor={colors.primary}
              />
            }
            onPress={() => {}}
          />
          <ListItem
            title="Log Out"
            IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
            onPress={() => logOut()}
          />
        </View>
        <Modal visible={openModal} animationType="slide">
          <Text
            style={{ fontWeight: "bold", textAlign: "center", fontSize: 20 }}
          >
            Add Contact Info
          </Text>

          {!loading && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                marginRight: 10,
                marginTop: 10,
              }}
            >
              <MaterialCommunityIcons
                size={35}
                name="close"
                onPress={() => {
                  setOpenModal(false);
                }}
              />
            </View>
          )}
          <View style={{ marginHorizontal: 10, marginTop: 10 }}>
            <Form
              initialValues={{
                heading: "",
                contactInfo: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={accountValidationSchema}
              style={{ marginTop: 30 }}
            >
              <FormField maxLength={255} name="heading" placeholder="Heading" />
              <FormField
                maxLength={255}
                name="contactInfo"
                placeholder="Contact Info"
              />

              <SubmitButton
                title={loading ? "Submitting..." : "Post"}
                active={loading}
              />
            </Form>
          </View>
        </Modal>

        <Modal visible={showImageModal}>
          <ListItemm setImageModal={setImageModal} setpi={setpi} />
        </Modal>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default AccountScreen;
