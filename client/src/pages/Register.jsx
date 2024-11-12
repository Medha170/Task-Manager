import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from '../calls/userCalls';
import { useCookies } from 'react-cookie';
import './../styles/Auth.css';

function Register() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['__vercel_live_token']);

  useEffect(() => {
    if (cookies.__vercel_live_token) {
      navigate('/');
    }
  }, [cookies.__vercel_live_token, navigate]);

  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      if (response.success) {
        message.success(response.message);
        navigate('/login');
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="main-area mw-500 text-center px-3">
      <h1>Register to Task Manager</h1>
      <Form layout="vertical" onFinish={onFinish} className="auth-form">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Name is required!' }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>
        
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Email is required!' }]}
        >
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>
        
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Password is required!' }]}
        >
          <Input type="password" placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ fontSize: '1rem', fontWeight: '600' }}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <p>
        Already a user? <Link to="/login">Login now</Link>
      </p>
    </div>
  );
}

export default Register;
