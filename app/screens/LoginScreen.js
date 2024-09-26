import React, { useState } from "react"
import { Image, StyleSheet } from "react-native"
import * as Yup from "yup"
import { jwtDecode } from "jwt-decode"

import Wrapper from "../components/Wrapper"
import {
    ErrorMessage,
    Form,
    FormField,
    SubmitButton,
} from "../components/forms"
import authApi from "../api/auth"
import { useAuth, useApi } from "../hooks"
import ActivityIndicator from "../components/ActivityIndicator"
import Screen from "../components/Screen"

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
})

const LoginScreen = () => {
    const [loginError, setLoginError] = useState(null)
    
    const auth = useAuth()

    const handleLogin = async ({ email, password }) => {
        const response = await authApi.login(email, password)

        if (!response.ok) return setLoginError(response.data.message)

      setLoginError(null)
     const user = jwtDecode(response.data)
        auth.login(response.data)
    }

    return (
        <>
            <Screen style={styles.container}>
                <Image
                    source={require("../assets/logo-red.png")}
                    style={styles.logo}
                />
                <Form
                    initialValues={{ email: "", password: "" }}
                    onSubmit={handleLogin}
                    validationSchema={validationSchema}
                >
                    <ErrorMessage error={loginError} visible={loginError} />
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
                    <SubmitButton title="Login" />
                </Form>
            </Screen>
        </>
    )
}

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
})

export default Login























// import React from "react";
// import { StyleSheet, Image } from "react-native";
// import * as Yup from "yup";

// import Screen from "../components/Screen";
// import { Form, FormField, SubmitButton } from "../components/forms";

// const validationSchema = Yup.object().shape({
//   email: Yup.string().required().email().label("Email"),
//   password: Yup.string().required().min(4).label("Password"),
// });

// function LoginScreen(props) {
//   return (
//     <Screen style={styles.container}>
//       <Image style={styles.logo} source={require("../assets/logo-red.png")} />

//       <Form
//         initialValues={{ email: "", password: "" }}
//         onSubmit={(values) => console.log(values)}
//         validationSchema={validationSchema}
//       >
//         <FormField
//           autoCapitalize="none"
//           autoCorrect={false}
//           icon="email"
//           keyboardType="email-address"
//           name="email"
//           placeholder="Email"
//           textContentType="emailAddress"
//         />
//         <FormField
//           autoCapitalize="none"
//           autoCorrect={false}
//           icon="lock"
//           name="password"
//           placeholder="Password"
//           secureTextEntry
//           textContentType="password"
//         />
//         <SubmitButton title="Login" />
//       </Form>
//     </Screen>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   logo: {
//     width: 80,
//     height: 80,
//     alignSelf: "center",
//     marginTop: 50,
//     marginBottom: 20,
//   },
// });

// export default LoginScreen;
