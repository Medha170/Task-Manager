import React, { useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../calls/userCalls';
import { useCookies } from 'react-cookie';
import './../styles/Auth.css'; // Importing the CSS

function Login() {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['token']);

    useEffect(() => {
        if (cookies.token) {
            navigate('/');
        }
    }, [cookies.token, navigate]);

    const onFinish = async (values) => {
        try {
            const response = await LoginUser(values);
            if (response.success) {
                message.success(response.message);
                setCookie('token', response.data.token, { 
                  path: '/' , 
                  expires: new Date(Date.now() + 1000*60*60*24*7),
                  sameSite: 'lax'
                });
                navigate('/');
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    return (
        <div className="main-area text-center">
            <h1>Login to Task Manager</h1>
            <Form layout="vertical" onFinish={onFinish} className="auth-form">
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Email is required" }]}
                >
                    <Input type="text" placeholder="Enter your Email" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Password is required" }]}
                >
                    <Input type="password" placeholder="Enter your Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" block htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
            <div>
                <p>New User? <Link to="/register">Register Here</Link></p>
                <p>Forgot Password? <Link to="/forget-password">Click Here</Link></p>
            </div>
        </div>
    );
}

export default Login;
