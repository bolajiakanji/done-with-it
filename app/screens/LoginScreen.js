import React from "react";
import { Image, StyleSheet } from "react-native";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import useLogin from "../hooks/useLogin";
import { loginValidation } from "../utility/validation_schema";

const LoginScreen = () => {
  const loginApi = useLogin()

  const { request, data, error, loading } = loginApi

  const handleLogin = async ({ email, password }) => {
    await request({ email, password });
};

  return (
    <>
      <Screen style={styles.container}>
        <Image source={require("../assets/logo-red.png")} style={styles.logo} />
        <Form
          initialValues={{ email: "", password: "" }}
          onSubmit={handleLogin}
          validationSchema={loginValidation}
        >
          <ErrorMessage error={error} visible={!!error} />
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
          <SubmitButton title="Login" active={!loading} />
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

export default LoginScreen;

