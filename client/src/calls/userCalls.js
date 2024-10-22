// src/calls/users.js
import { axiosInstance } from './index';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// Register a new user
export const RegisterUser = async (value) => {
    try {
        const response = await axiosInstance.post("api/users/register", value);
        return response.data;
    } catch (error) {
        console.error("Registration Error:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

// Login user
export const LoginUser = async (value) => {
    try {
        const response = await axiosInstance.post("api/users/login", value);
        return response.data;
    } catch (error) {
        console.error("Login Error:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

// Send reset password link to the user's email
export const sendResetLink = async (value) => {
    try {
        const response = await axiosInstance.post("api/users/forgot-password", value);
        return response.data;
    } catch (error) {
        console.error("Forgot Password Error:", error);
        throw error; // Rethrow the error for further handling if needed
    }
};

// Reset the user's password
export const resetPassword = async (value) => {
    try {
        const response = await axiosInstance.post("api/users/reset-password", value);
        return response.data;
    } catch (error) {
        console.error("Reset Password Error:", error);
        throw error; // Rethrow the error for further handling if needed
    }
};

// Logout user
export const LogoutUser = async () => {
    const navigate = useNavigate();
    try {
        // Call the backend logout route
        await axiosInstance.post('/users/logout');

        // Clear the token cookie
        Cookies.remove('token');

        // Redirect to the login page
        navigate('/login');
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

