import { create } from "apisauce";

import cache from "../utility/cache";
import authStorage from "../auth/storage";
import ListingsScreen from "../screens/ListingsScreen";

const apiClient = create({
  baseURL: "http://192.168.240.87:9000/api",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  console.log('auth here')
  console.log(authToken)
  if (authToken) {
    request.headers["x-auth-token"] = authToken
  };

});

const get = apiClient.get;

const me= {...apiClient}
export const meme= {...apiClient}
me.get = async (url, data, axiosConfig) => {
  const result = await get(url, data, axiosConfig);

  if (result.ok) {
    cache.store(url, result.data);
    return result;
  }
  const response = await cache.get(url);
  console.log('big')
  console.log(response)
  return response ? { ok: true, data: response } : response;
};
meme.get =  async (url, data, axiosConfig) => {
    //const result = await get(url, data, axiosConfig);

    const response = await cache.get(url);
    console.log('big')
    console.log(response)
   // return response ? { ok: true, data: response } : response;
    if (response) 
      return { ok: true, data: response }
      const result = await get(url, data, axiosConfig);
      if (result.ok) {
        cache.store(url, result.data)
        return result
      }
    
  }
meme.post =  async (url, data, axiosConfig) => {
    
  const result = await apiClient.post(url, data, axiosConfig);
  console.log('clic')
  console.log(result.data)
  console.log('clicxfdf')
      if (result.ok) {
        cache.store(url, result.data)
        return result
      }
    
  }
meme.delete =  async (url, axiosConfig) => {
    console.log('clic')
  const result = await apiClient.delete(url,  axiosConfig);
  console.log(result.data)
  console.log('clicxfdf')
      if (result.ok) {
        cache.store(url, result.data)
        return result
      }
    
  }
;

export default me;
