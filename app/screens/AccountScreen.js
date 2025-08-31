import React, { useState } from "react";
import {
  StyleSheet,
  Modal,
  ScrollView,
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

function AccountScreen() {
  const [showImageModal, setImageModal] = useState(false);
  const [pi, setpi] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { user, logOut, login } = useAuth();

  const cld = myCloud()
  const image = user.image;
  const profileImage = cld.image(image);


  return (
    <Screen style={styles.screen}>
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
          setOpenModal={setImageModal}
        />

        <ItemListing user={user} logOut={logOut} />

        <Modal visible={showImageModal}>
          <DpUPLoad setImageModal={setImageModal} setpi={setpi} />
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
