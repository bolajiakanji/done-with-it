import { create } from "apisauce"

import cache from '../utility/cache'
import authStorage from'../auth/storage'

const apiClient = create({
    baseURL: 'http://192.168.81.87:9000/api',  
})

apiClient.addAsyncRequestTransform(async (request) => {
    console.log('async')
    const authToken = await authStorage.getUser()
    if (!authToken) console.log('na here');
    request.headers['x-auth-token']
    console.log('ok here')
})

const get = apiClient.get
apiClient.get = async (url, data, axiosConfig) => {
   const result =  await get(url, data, axiosConfig)
    
    if (result.ok) {
        cache.store(url, result.data)
        return result
    }
    const response = await cache.get(url)
    return response ? { ok: true, data }: response
}

export default apiClient;