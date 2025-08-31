import { Pressable, Text } from "react-native"
import { View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons";


function OwnerInfo({user, setOpenModal}) {
    return (
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
    )
}

export default OwnerInfo