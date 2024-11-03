import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': Cookies.get('token')
    }
})