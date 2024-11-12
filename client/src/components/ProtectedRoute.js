import React, { useEffect, useState } from 'react';
import { GetCurrentUser } from '../calls/userCalls';
import { useNavigate } from 'react-router-dom';
import { message, Layout } from 'antd';
import { useCookies } from 'react-cookie';
import { hideLoading, showLoading } from '../redux/loaderSlice';
import { setUser } from '../redux/userSlice';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cookies] = useCookies(['token']);
    const [isLoading, setIsLoading] = useState(true); // New state to manage loading status

    useEffect(() => {
        const getValidUser = async () => {
            try {
                dispatch(showLoading());
                const response = await GetCurrentUser();
                dispatch(setUser(response));
                setIsLoading(false); // Set loading to false after fetching user
                dispatch(hideLoading());
            } catch (error) {
                dispatch(setUser(null));
                setIsLoading(false); // Set loading to false in case of error
                message.error(error.message);
                navigate('/login');
            }
        };

        if (cookies.token) {
            if (!user) { // Only fetch if `user` is null
                getValidUser();
            } else {
                setIsLoading(false); // If user is already loaded, stop loading state
            }
        } else {
            navigate('/login');
        }
    }, [cookies.token, dispatch, navigate, user]);

    if (isLoading) {
        return <div>Loading...</div>; // Display a loading indicator while fetching user
    }

    return (
        user && (
            <Layout>
                <Navbar />
                <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
                    {children}
                </div>
            </Layout>
        )
    );
}

export default ProtectedRoute;
