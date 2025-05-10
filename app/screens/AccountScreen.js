import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  
  
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
import { AdvancedImage } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import client from "../api/client";
//import useAuth from "../auth/useAuth";
import authStorage from "../auth/storage";
//import { MaterialCommunityIcons } from "@expo/vector-icons";
//import AppTextInput from "../components/TextInput";

import {
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import * as Yup from "yup";




const validationSchema = Yup.object().shape({
    heading: Yup.string().required().min(1).label("Heading"),
    contactInfo: Yup.string().required().min(1).label("Contact_info"),

})




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
  const [showImageModal, setImageModal] = useState(false);
  const [pi, setpi] = useState('');
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)


  const { user, logOut,login } = useAuth();
   const cld = new Cloudinary({
      cloud: {
        cloudName: "dlutiw9i4",
      },  
   });
  const image= user.image
  const profileImage = cld.image(image);
  
  const handleSubmit = async (info) => {
          setLoading(true)
          console.log(info)
          const output = await client.put('/contacts', {
            
            ...info    })
            await authStorage.storeToken(output.data)
            setLoading(false)
          login(output.data)
          console.log('runhere')  
         if (output.ok) setOpenModal(false)
      }
  

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
    
      <Screen style={styles.screen}>
        
        <ScrollView>
       
        <TouchableOpacity underlayColor={colors.light} onPress={()=>setImageModal(true)} >
                <View style={{ width:'100%', height: 200}}>
          {!image ? (
            <View style={{display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              backgroundColor: "#bbb",
            height: '100%'}}>
              <MaterialCommunityIcons
                      name="account"
                      size={40}
                      color="gray"
                      style={[
                        {
                          borderRadius: 50,
                          padding: 25,
                          backgroundColor: "black",
                          
                        },
                        
                      ]}
            />
              </View>

                          ) : (
                                  
                    <AdvancedImage
                      cldImg={profileImage}
                      
                      style={[{ width: '100%', height: '100%', }]}
                        />
                                      
          )}
          <MaterialCommunityIcons size={30} name='camera' style={{position: 'absolute', top: 5, right: 15}} />
            </View>
      </TouchableOpacity>
      
    

      
      
 
        <View style={{ marginHorizontal: 10 }}>
                <View style={{ marginVertical: 10 }}>
                  <Text style={{  fontSize: 18 }}>
                    {user.name}
                  </Text>
        
                  <Text style={{  fontSize: 15 }}>
                    {user.email}
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
                  <Text style={{ color: "gray", fontWeight: 'bold' }}>Email</Text>
                  <Text style={{  }}>{user.email}</Text>
                </View>
                {user.contacts?.map((info) => (
                  <View style={{ width: "46%", marginBottom: 10 }} key={info._id}>
                    <Text style={{ color: "gray",fontWeight: 'bold'  }}>{info.heading}</Text>
                    <Text style={{ }}>
                      {info.contactInfo}
                    </Text>
                  </View>
                ))}
         
            </View>
            
            <Pressable onPress={()=> setOpenModal(true)} >
            <Text style={{color: 'blue'}}> Add contact info <MaterialCommunityIcons name='plus' /> </Text>
            </Pressable>





            
      
            
          
        <View style={styles.container}>
          
          <ListItem
            title="My Listings"
            subTitle={`${user.userListings || 0} items available for sale`}
            IconComponent={<Icon name="format-list-bulleted" backgroundColor={colors.primary} />}
            onPress={() =>{} }
        />
         <ListItem
          title="Log Out"
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={() => logOut()}
        />
      </View>
      <Modal visible={openModal} animationType="slide" >
                <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20}}>Add Contact Info</Text>
                
                {!loading && <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', marginRight: 10, marginTop: 10 }}>
                    < MaterialCommunityIcons
                        size={30} name='close' onPress={() => { setOpenModal(false) }} />
                </View>}
                <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                    <Form
                        initialValues={{
                          heading: "",
                          contactInfo: "",
                          
                        }}
                        onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    style={{ marginTop: 30}}
                >
                    <FormField maxLength={255} name="heading" placeholder="Heading"
                        
                    />
                    <FormField maxLength={255} name="contactInfo" placeholder="Contact Info" />
                    
                            <SubmitButton  title={loading ? 'Submitting...' : 'Post'} active={loading}  />
                    
                    </Form>
                    </View>
                
            </Modal>
 
       
      
        <Modal visible={showImageModal}> 
          <ListItemm
            
            setImageModal={setImageModal} setpi={setpi}
            />
          
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
    borderRadius: 25
  }
  
});

export default AccountScreen;
