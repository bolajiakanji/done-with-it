import * as SecureStore from "expo-secure-store"
import jwtDecode from "jwt-decode"

const key = "auth_token"

const storeToken = async (token) => {
    try {
        await SecureStore.setItemAsync(key, token)
    } catch (error) {
        console.error("Error occured while storing the auth token", error)
    }
}

const getToken = async () => {
    try {
        return await SecureStore.getItemAsync(key)
    } catch (error) {
        console.error("Error occured while getting the auth token", error)
    }
}

const getUser = async () => {
    try {
        const token = await getToken()
        return token ? jwtDecode(token) : null
    } catch (error) {
        console.error("Error occured while removing the auth token", error)
    }
}

const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync(key)
    } catch (error) {
        console.error("removeToken", error)
    }
}

export default { getUser, getToken, removeToken, storeToken }
