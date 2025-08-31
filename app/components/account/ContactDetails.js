import { useState } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { accountValidationSchema } from "../../utility/validation_schema";
import { Form, FormField, SubmitButton } from "../forms";
import client from "../../api/client";
import authStorage from "../../auth/storage";
import colors from "../../config/colors";

function ContactDetails({ openModal, setOpenModal, login, }) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (info) => {
        setLoading(true);
        const output = await client.put("/contacts", {
            ...info,
        });

        await authStorage.storeToken(output.data);
        setLoading(false);
        login(output.data);

        if (output.ok) setOpenModal(false);
    };

    return (
        <Modal visible={openModal} animationType="slide">
            <Text
                style={{ fontWeight: "bold", textAlign: "center", fontSize: 20 }}
            >
                Add Contact Info
            </Text>

            {!loading && (
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "flex-end",
                        marginRight: 10,
                        marginTop: 10,
                    }}
                >
                    <MaterialCommunityIcons
                        size={35}
                        name="close"
                        onPress={() => {
                            setOpenModal(false);
                        }}
                    />
                </View>
            )}
            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                <Form
                    initialValues={{
                        heading: "",
                        contactInfo: "",
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={accountValidationSchema}
                    style={{ marginTop: 30 }}
                >
                    <FormField maxLength={255} name="heading" placeholder="Heading" />
                    <FormField
                        maxLength={255}
                        name="contactInfo"
                        placeholder="Contact Info"
                    />

                    <SubmitButton
                        title={loading ? "Submitting..." : "Post"}
                        active={loading}
                    />
                </Form>
            </View>
        </Modal>
 )
}

const styles = StyleSheet.create({
  
  container: {
    marginVertical: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default ContactDetails