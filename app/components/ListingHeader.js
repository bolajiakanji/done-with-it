import { Text, View } from "react-native"
import colors from "../config/colors"
import { Image } from "expo-image"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import myCloud from "../utility/cid";
import useAuth from "../auth/useAuth";


const ListingHeader = () => {
          const { user } = useAuth();
    
    const cld = myCloud()
      const profileImage = cld.image(user.image)

    return (
      <View >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              columnGap: 5,
            }}
          >
            <Image
              source={require("../../assets/images/adaptiveIcon.png")}
              style={{ width: 40, height: 39, borderRadius: 8 }}
            />

            <Text
              style={{ color: "dodgerblue", fontWeight: "bold", fontSize: 25 }}
            >
              BORJI
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <View style={{ width: 30, height: 30, borderRadius: 25, backgroundColor: '#ccc', overflow: 'hidden' }}>
              {user.image ? (
                // <AdvancedImage
                //   cldImg={profileImage}
                //   style={{ height: '100%', width: '100%' }}
                // />
                <View></View>
              ) : (

                <MaterialCommunityIcons name="account" size={28} color="gray" />

              )}
            </View>
            <Text style={{ fontSize: 11, color: colors.white }}>
              {user.email.slice(0, 8) + " ..."}
            </Text>
          </View>
        </View>
        </View>
)}

export default ListingHeader