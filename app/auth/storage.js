import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

const key = "authToken";

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error occured while storing the auth token");
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error("Error occured while getting the auth token");
  }
};

const getUser = async () => {
  try {
    const token = await getToken();
    
    return token ? jwtDecode(token) : null;
  } catch (error) {
    console.log("Error occured while getting user");
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("remove Token");
  }
};

export default { getUser, removeToken, storeToken, getToken };
