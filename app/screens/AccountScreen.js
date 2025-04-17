import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  Modal,
} from "react-native";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AuthContext from "../auth/context";
import useAuth from "../auth/useAuth";
import ListItemm from "../components/lists/listingitemmde";
import UserShortInfo from "../components/UserShortInfo";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.MESSAGES,
  },
];

function AccountScreen({ navigation }) {
  const [showImageModal, setImageModal] = useState(true);
  const [pi, setpi] = useState('');

  const { user, logOut } = useAuth();

  const styling = showImageModal
    ? {
        position: "absolute",
        top: "40%",
        width: "100%",
        height: 50,
        zIndex: 90,
        backgroundColor: "green",
      }
    : {
        position: "initial",
        top: "initial",
        width: "initial",
        height: "initial",
        backgroundColor: "green",
    };
  console.log(pi)

  return (
    <>
      {/* <Image src={pi} style={{height: 100, width: 100}}  /> */}
      <Screen style={styles.screen}>
        {/* <TouchableHighlight
          style={styles.container}
          onPress={() => {
            setImageModal(true);
            console.log("ok");
          }}
        >
          <ListItem
            title={user.name}
            subTitle={user.email}
            image={user.image}
            onPress={() => {
              setImageModal(true);
              console.log("ok");
            }}/>
                      </TouchableHighlight> */}
            <UserShortInfo
                      image={user.image}
          name={user.name}
          imageStyle={styles.image}
                      //poster={user.image}
                      email={user.email}
                    />
          
        <View style={styles.container}>
          <FlatList
            data={menuItems}
            keyExtractor={(menuItem) => menuItem.title}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => (
              <ListItem
                title={item.title}
                IconComponent={
                  <Icon
                    name={item.icon.name}
                    backgroundColor={item.icon.backgroundColor}
                  />
                }
                onPress={() => navigation.navigate(item.targetScreen)}
              />
            )}
          />
        </View>
        <ListItem
          title="Log Out"
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={() => logOut()}
        />
      
        <Modal visible={showImageModal}> 
          <ListItemm
            
            setImageModal={setImageModal} setpi={setpi}
            />
          
        </Modal>
            </Screen>
      
    </>
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
    borderRadius: 25
  }
  
});

export default AccountScreen;
