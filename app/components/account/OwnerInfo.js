import { Pressable, StyleSheet, Text } from "react-native"
import { View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons";

function OwnerInfo({ user, setOpenModal }) {
    return (
        <View style={{ marginHorizontal: 15 }}>
            <View style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 18 }}>{user.name}</Text>
                <Text style={{ fontSize: 15 }}>{user.email}</Text>
            </View>
            <View style={styles.bottomMargin}>
                <Text style={styles.contactInfo}>Contact Info</Text>
            </View>
            <View style={styles.bottomMargin}>
                <Text style={styles.emailAsTitle}>Email</Text>
                <Text>{user.email}</Text>
            </View>
            {user.contacts?.map((info) => (
                <View style={styles.contactBox} key={info._id}>
                    <Text style={styles.contactHeading}>{info.heading}</Text>
                    <Text style={{}}>{info.contactInfo}</Text>
                </View>
            ))}
            <Pressable onPress={() => setOpenModal(true)}>
                <Text style={styles.addContact}>
                    Add contact info
                    <MaterialCommunityIcons name="plus" />
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    addContact: {
        color: "blue",
        fontSize: 20
    },
    bottomMargin: {
        marginBottom: 10
    },
    contactInfo: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "dodgerblue",
    },
    emailAsTitle: {
        color: "gray",
        fontWeight: "bold"
    },
    contactBox: {
        width: "46%",
        marginBottom: 10
    },
    contactHeading: {
        color: "gray",
        fontWeight: "bold"
    },


})

export default OwnerInfo