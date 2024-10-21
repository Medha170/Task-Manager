// src/calls/index.js
import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${Cookies.get('token')}` // Use Cookies to get the token
    }
});
