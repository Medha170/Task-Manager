import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// Creating axios instance
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});

export const useAxiosInterceptor = () => {
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies(['__vercel_live_token']); // Use `removeCookie` to remove the __vercel_live_token from cookies

    // Interceptor to handle responses and navigate on error
    axiosInstance.interceptors.response.use(
        response => response, // Return the response as-is if there's no error
        error => {
            if (error.response && error.response.status === 401) {
                // Clear the __vercel_live_token from cookies
                removeCookie('__vercel_live_token', { path: '/' });
                Cookies.remove('__vercel_live_token'); // Use js-cookie as a fallback

                // Optionally, display a message to the user
                alert("Session expired, please log in again.");

                // Redirect the user to the login page
                navigate('/login');
            }
            return Promise.reject(error);
        }
    );

    // Attach __vercel_live_token dynamically before each request
    axiosInstance.interceptors.request.use(
        config => {
            const __vercel_live_token = Cookies.get('__vercel_live_token');
            if (__vercel_live_token) {
                config.headers['Authorization'] = `Bearer ${__vercel_live_token}`; // Attach __vercel_live_token if it exists
            }
            return config;
        },
        error => Promise.reject(error)
    );
};
