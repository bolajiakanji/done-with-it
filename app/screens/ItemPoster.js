import { AdvancedImage } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import client from "../api/client";
import { useEffect, useState } from "react";
import useAuth from "../auth/useAuth";
import authStorage from "../auth/storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppTextInput from "../components/TextInput";

import { Form, FormField, SubmitButton } from "../components/forms";
import * as Yup from "yup";
import { ListItem } from "../components/lists";
import Icon from "../components/Icon";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  heading: Yup.string().required().min(1).label("Heading"),
  contactInfo: Yup.string().required().min(1).label("Contact_info"),
});

const cld = new Cloudinary({
  cloud: {
    cloudName: "dlutiw9i4",
  },
});

const ItemPoster = ({ route }) => {
  const [contactInfo, setContactInfo] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();
  const poster = route.params;

  useEffect(() => {});
  const getContactInfo = async () => {};

  const handleSubmit = async (info) => {
    setLoading(true);
    console.log(info);
    const output = await client.put("/contacts", {
      ...info,
    });
    await authStorage.storeToken(output.data);
    login(output.data);
    setLoading(false);
    console.log("runhere");
    if (output.ok) setOpenModal(false);
  };

  const myImage = cld.image(poster.image);
  console.log(user.contacts);
  return (
    <ScrollView
      contentContainerStyle={{
        overflow: "visible",
        height: 800,
        paddingBottom: 0,
      }}
    >
      <AdvancedImage cldImg={myImage} style={{ height: 250, width: "100%" }} />
      <View style={{ marginHorizontal: 10 }}>
        <View style={{ marginVertical: 10 }}>
          <Text style={{  fontSize: 18 }}>
            {poster.name}
          </Text>

          <Text style={{  fontSize: 15 }}>
            {poster.email}
          </Text>
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
          <Text style={{ color: "gray" , fontWeight: 'bold'}}>Email</Text>
          <Text style={{ }}>{poster.email}</Text>
        </View>
        {poster.contacts?.map((info) => (
          <View style={{ width: "46%", marginBottom: 10 }} key={info._id}>
            <Text style={{ color: "gray", fontWeight: 'bold' }}>{info.heading}</Text>
            <Text style={{   }}>
              {info.contactInfo}
            </Text>
          </View>
        ))}
        <ListItem
          title="My Listings"
          subTitle={`${poster.userListings} items available for sale`}
          IconComponent={
            <Icon
              name="format-list-bulleted"
              backgroundColor={colors.primary}
            />
          }
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
};

export default ItemPoster;
