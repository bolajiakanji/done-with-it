import { View } from "react-native";
import useAuth from "../auth/useAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AdvancedImage } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";

function AccountImage({screen }) {
  const { user, logOut } = useAuth();

  const image = user.image;

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dlutiw9i4",
    },
  });

  let myImage;

  if (image) {
    myImage = cld.image(image);
  }

  if (!image)
    return (
      <View
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
                width: "100%",
          marginTop:screen? 50 : 0
        }}
      >
        <MaterialCommunityIcons
          color="white"
                size={80}
                name="account"
          style={{ backgroundColor: "gray", padding: 30,borderRadius:70 }}
        />
      </View>
    );
  return (
    <AdvancedImage cldImg={myImage} style={{ height: 250, width: "100%" }} />
  );
}

export default AccountImage;
