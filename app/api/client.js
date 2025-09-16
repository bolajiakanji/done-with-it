import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";

const apiClient = create({
   baseURL: "https://borji-backend-5.onrender.com/api/",
  // baseURL: "http://10.140.219.87:3000/api/",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (authToken) {
    request.headers["x-auth-token"] = authToken 
  }
});

const get = apiClient.get;

const client = { ...apiClient }

export const client_2 = { ...apiClient }

client.get = async (url, data, axiosConfig) => {
  const result = await get(url, data, axiosConfig);

  if (result.ok) {
    cache.store(url, result.data);
    return result;
  }

  const response = await cache.get(url);
  return response ? { ok: true, data: response } : response;
};

client_2.get = async (url, data, axiosConfig) => {
  const response = await cache.get(url);

  if (response)
    return { ok: true, data: response }

  const result = await get(url, data, axiosConfig);

  if (result.ok) {
    cache.store(url, result.data)
    return result
  }
  return result
}

client_2.post = async (url, data, axiosConfig) => {
  const result = await apiClient.post(url, data, axiosConfig);

  if (result.ok) {
    cache.store(url, result.data)
    return result
  }
  return result
}

client_2.delete = async (url, axiosConfig) => {
  const result = await apiClient.delete(url, axiosConfig);

  if (result.ok) {
    cache.store(url, result.data)
    return result
  }
  return result
}

export default client;
