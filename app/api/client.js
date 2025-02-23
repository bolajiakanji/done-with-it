import { create } from "apisauce";

import cache from "../utility/cache";
import authStorage from "../auth/storage";
import ListingsScreen from "../screens/ListingsScreen";

const baseUrl = 'http://192.168.136.87:9000/api'
const apiClient = create({
  baseURL: baseUrl,
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  console.log('auth here')
  console.log(authToken)
  if (authToken) {
    request.headers["x-auth-token"] = authToken
  };ListingsScreen
});

const get = apiClient.get;
apiClient.get = async (url, data, axiosConfig) => {
  const result = await get(url, data, axiosConfig);
  console.log(result)
console.log(url)
  if (result.ok) {
    console.log('cachey')
    cache.store(baseUrl + url, result.data);
    return result;
  }
  console.log(result)
  console.log('seoarate')
  console.log(baseUrl + url)
  const response = await cache.get(baseUrl + url);
  console.log('big')
  console.log('big')
  console.log(response)
  return response ? { ok: true, data: response } : response;
};

export default apiClient;
