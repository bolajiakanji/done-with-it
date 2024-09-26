import { create } from "apisauce"

import cache from '../utility/cache'

const apiClient = create({
    baseURL: 'http://192.168.81.87:9000/api',  
})

const get = apiClient.get
apiClient.get = async (url, data, axiosConfig) => {
   const result =  await get(url, data, axiosConfig)
    
    if (result.ok) {
        cache.store(url, Response.data)
        return response
    }
    const data = await cache.get(url)
    return data ? { ok: true, data }: response
}

export default apiClient;