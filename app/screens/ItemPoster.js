import { AdvancedImage } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import client from "../api/client";
import { useEffect, useState } from "react";
import useAuth from "../auth/useAuth";
import authStorage from "../auth/storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppTextInput from "../components/TextInput";

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


const cld = new Cloudinary({
    cloud: {
        cloudName: 'dlutiw9i4'
    }
});
  
const ItemPoster = ({route}) => {
    const [contactInfo, setContactInfo] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user, login, } = useAuth();
    const poster = route.params
    

    
    useEffect(() => {
        
    })
    const getContactInfo = async () => {
        

    }

    const handleSubmit = async (info) => {
        setLoading(true)
        console.log(info)
        const output = await client.put('/contacts', {
                    
    ...info    })
        await authStorage.storeToken(output.data)
        login(output.data)
        setLoading(false)
        console.log('runhere')  
       if (output.ok) setOpenModal(false)
    }

const myImage = cld.image('items/ca4ed4c3ed3f5c1689437f57f5a12408_full');
console.log(user.contacts)
    return (
        <ScrollView style={{overflow: 'visible', height: 800}}>
        <AdvancedImage
                        cldImg={myImage}
                        style={{ height:250,width: '100%' }}
            />
            <View style={{marginHorizontal: 10}}>
            <View style={{marginTop: 10}} >
                    <Text><Text style={{ fontWeight: 'bold', fontSize: 18, }}>{poster.name}</Text></Text>
                    <Text><Text style={{ fontWeight: 'bold', fontSize: 16, }}> { poster.email}</Text></Text>
                
            </View>
                <View style={{ marginVertical: 10 }}>
                    <Text
                        style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: 'dodgerblue' }}> Contact Info </Text>
                
            </View>

                    
                                           <View style={{ marginBottom: 10}}> 
                        <Text style={{color: 'gray'}}>Email</Text>
                    <Text style={{ fontWeight: 'bold' }}>{poster.email}</Text>
                            </View>
                        {poster.contacts?.map((info) => (
                <View style={{ width: '46%'}} key={info._id}>
                    <Text style={{color: 'gray', fontSize: 16}}>{info.heading}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 14}}>{info.contactInfo}</Text>
                </View >
            
))}
            
            
            </View>
        </ScrollView>
)
}

export default ItemPoster