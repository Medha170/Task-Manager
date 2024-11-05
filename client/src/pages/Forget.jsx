import React, { useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ForgetPassword } from '../calls/userCalls';
import { useCookies } from 'react-cookie';
import './../styles/Auth.css';

function Forget() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    if (cookies.token) {
      navigate('/');
    }
  }, [cookies.token, navigate]);

  const onFinish = async (values) => {
    try {
      const response = await ForgetPassword(values);
      if (response.status === 'success') {
        message.success(response.message);
        alert("OTP sent to your email");
        navigate('/reset-password');
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="main-area mw-500 text-center px-3">
      <h1>Forget Password</h1>
      <Form layout="vertical" onFinish={onFinish} className="auth-form">
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Email is required' }]}
        >
          <Input type="email" placeholder="Enter your Email" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            block
            htmlType="submit"
            style={{ fontSize: '1rem', fontWeight: '600' }}
          >
            SEND OTP
          </Button>
        </Form.Item>
      </Form>
      <p>
        Existing User? <Link to="/login">Login Here</Link>
      </p>
    </div>
  );
}

export default Forget;
