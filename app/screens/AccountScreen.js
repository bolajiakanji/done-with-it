import React, { useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  View
} from "react-native";
import colors from "../config/colors";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import myCloud from "../utility/cid";
import DisplayPicture from "../components/account/DisplayPicture";
import OwnerInfo from "../components/account/OwnerInfo";
import ContactDetails from "../components/account/ContactDetails";
import DpUPLoad from "../components/lists/DpUpload";
import ItemListing from "../components/account/itemListing";
import { client_2 } from "../api/client";

function AccountScreen() {
  const [showImageModal, setImageModal] = useState(false);
  const [pi, setpi] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {getItems()},[])

  const { user, logOut, login } = useAuth();

  const cld = myCloud()
  const image = user.image;
  const profileImage = cld.image(image);

  const getItems = async function () {
    console.log('response')
    const response = await client_2.get("userListings/"+user._id,)
    console.log(response)
    setItems(response.data)
    
    }
   

  return (
    <Screen style={{ backgroundColor: colors.light }}>
      <ScrollView>
        <DisplayPicture
          profileImage={profileImage}
          image={image}
          setImageModal={setImageModal}
        />

        <OwnerInfo user={user} setOpenModal={setOpenModal} />

        <ContactDetails
          login={login}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />

        <ItemListing user={user} logOut={logOut} />



        {items.map((item)=>(
          
          <View>
<Text>{item.price}</Text>
        </View>
))}


        <Modal visible={showImageModal}>
          <DpUPLoad setImageModal={setImageModal} setpi={setpi} />
        </Modal>
      </ScrollView>
    </Screen>
  );
}


export default AccountScreen;
