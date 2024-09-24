import axios from 'axios';

const apiClient = axios.create({
    
    baseURL: 'http://192.168.81.87:9000/api',  
})

export default apiClient;