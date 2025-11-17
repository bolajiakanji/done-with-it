import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ListItem } from "../components/lists";
import Icon from "../components/Icon";
import colors from "../config/colors";
import myCloud from "../utility/cid";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ItemPoster = ({ route }) => {
  const poster = route.params;
  const image = poster.image
  const cld = myCloud()
  const myImage = cld.image(image);

  return (
    <ScrollView>
      {!image ?
        <View style={styles.noImage}>
          <MaterialCommunityIcons
            name="account"
            size={40}
            color="gray"
            style={styles.noImageIcon}
          />
        </View>
        :<View></View>

      }

      <View style={{ marginHorizontal: 15 }}>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 18 }}>{poster.name}</Text>
          <Text style={{ fontSize: 15 }}>{poster.email}</Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.contactInfo}>Contact Info</Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.email}>Email</Text>
          <Text>{poster.email}</Text>
        </View>

        {poster.contacts?.map((info) => (
          <View style={styles.contactBox} key={info._id}>
            <Text style={styles.contactHeading}>{info.heading}</Text>
            <Text>{info.contactInfo}</Text>
          </View>
        ))}
      </View>

      <ListItem
        title="Items"
        subTitle={`${poster.userListings} items available for sale`}
        IconComponent={
          <Icon
            name="format-list-bulleted"
            backgroundColor={colors.primary}
          />
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  advanceImage: {
    height: 250,
    width: "100%"
  },

  contactInfo: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "dodgerblue",
  },

  contactBox: {
    width: "46%",
    marginBottom: 10
  },

  contactHeading: {
    color: "gray",
    fontWeight: 'bold'
  },

  email: {
    color: "gray",
    fontWeight: 'bold'
  },

  noImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#bbb",
    height: "250",
  },

  noImageIcon: {
    borderRadius: 50,
    padding: 25,
    backgroundColor: "black",
  },

})

export default ItemPoster;
