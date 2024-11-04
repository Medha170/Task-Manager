import React, { useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../calls/userCalls';
import { useCookies } from 'react-cookie';

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
                console.log("Token from response:", response.data.token);
                message.success(response.message);
                setCookie('token', response.data.token, { 
                  path: '/' , 
                  expires: new Date(Date.now() + 1000*60*60*24*7),
                  sameSite: 'lax'
                });
                console.log(cookies);
                console.log("Token from cookies:", cookies.token);
                navigate('/');
            }
            else {
                message.error(response.message);
            }
        }
        catch (error) {
            message.error(error.message);
        }
    }

    return (
        <>
          <header className="App-header">
            <main className="main-area mw-500 text-center px-3">
              <section className="left-section">
                <h1>Login to Task Manager</h1>
              </section>
    
              <section className="right-section">
                <Form layout="vertical" onFinish={onFinish}>
                  <Form.Item
                    label="Email"
                    htmlFor="email"
                    name="email"
                    className="d-block"
                    rules={[{ required: true, message: "Email is required" }]}
                  >
                    <Input id="email" type="text" placeholder="Enter your Email" />
                  </Form.Item>
    
                  <Form.Item
                    label="Password"
                    htmlFor="password"
                    name="password"
                    className="d-block"
                    rules={[{ required: true, message: "Password is required" }]}
                  >
                    <Input id="password" type="password" placeholder="Enter your Password" />
                  </Form.Item>
    
                  <Form.Item className="d-block">
                    <Button type="primary" block htmlType="submit" style={{ fontSize: "1rem", fontWeight: "600" }}>
                      Login
                    </Button>
                  </Form.Item>
                </Form>
                <div>
                  <p>
                    New User? <Link to="/register">Register Here</Link>
                  </p>
                  <p>
                    Forgot Password? <Link to="/forget-password">Click Here</Link>
                  </p>
                </div>
              </section>
            </main>
          </header>
        </>
    );
}

export default Login;