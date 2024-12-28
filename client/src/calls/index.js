import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// Creating axios instance
export const axiosInstance = axios.create({
    baseURL: 'https://task-manager-5f5n.onrender.com',
    withCredentials: true,
});

export const useAxiosInterceptor = () => {
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies(['token']); // Use `removeCookie` to remove the token from cookies

    // Interceptor to handle responses and navigate on error
    axiosInstance.interceptors.response.use(
        response => response, // Return the response as-is if there's no error
        error => {
            if (error.response && error.response.status === 401) {
                // Clear the token from cookies
                removeCookie('token', { path: '/' });
                Cookies.remove('token'); // Use js-cookie as a fallback

                // Optionally, display a message to the user
                alert("Session expired, please log in again.");

                // Redirect the user to the login page
                navigate('/login');
            }
            return Promise.reject(error);
        }
    );

    // Attach token dynamically before each request
    axiosInstance.interceptors.request.use(
        config => {
            const token = Cookies.get('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`; // Attach token if it exists
            }
            return config;
        },
        error => Promise.reject(error)
    );
};
