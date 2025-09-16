import React from "react";
import { Image, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import { registerValidation  } from "../utility/validation_schema";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import useRegister from "../hooks/useRegister";

const Register = () => {
  const registerApi = useRegister()

  const { request, data, error, loading, } = registerApi

  const handleSubmit = async ({ email, name, password }) => {
    await request({ email,name, password });
};

  return (
    <>
      {/* <ActivityIndicator visible={registerApi.loading || loginApi.loading} /> */}
      <Screen style={styles.container}>
        <Image source={require("../assets/logo-red.png")} style={styles.logo} />
        <Form
          initialValues={{ email: "", name: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={registerValidation}
        >
          <ErrorMessage error={error} visible={error} />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Register" color="secondary" />
        </Form>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 30,
  },
});

export default Register;
