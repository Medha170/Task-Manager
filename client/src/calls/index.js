import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const useAxiosInterceptor = () => {
    const navigate = useNavigate();
    const [setCookie] = useCookies(['token']); // `setCookie` for managing cookies

    axios.interceptors.response.use(
        response => response, // Return the response as-is if there's no error
        error => {
            // Check if the error is due to an expired or invalid token
            if (error.response && error.response.status === 401) {
                // Clear the token from cookies
                setCookie('token', '', { path: '/', expires: new Date(0) });

                // Redirect to the login page
                navigate('/login');

                // Optionally, display a message to the user
                alert("Session expired, please log in again.");
            }
            return Promise.reject(error);
        }
    );
};

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': Cookies.get('token')
    }
})