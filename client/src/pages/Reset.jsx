import React, { useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ResetPassword } from '../calls/userCalls';
import { useCookies } from 'react-cookie';
import './../styles/Auth.css';

function Reset() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    if (cookies.token) {
      navigate('/');
    }
  }, [cookies.token, navigate]);

  const onFinish = async (values) => {
    try {
      const response = await ResetPassword(values);
      if (response.status === 'success') {
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
      <h1>Reset Password</h1>
      <Form layout="vertical" onFinish={onFinish} className="auth-form">
        <Form.Item
          label="OTP"
          name="otp"
          rules={[{ required: true, message: 'OTP is required' }]}
        >
          <Input type="number" placeholder="Enter your OTP" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Password is required' }]}
        >
          <Input type="password" placeholder="Enter your Password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            block
            htmlType="submit"
            style={{ fontSize: '1rem', fontWeight: '600' }}
          >
            RESET PASSWORD
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Reset;
