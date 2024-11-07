import React from 'react';
import { Menu, Layout } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import {
    HomeOutlined,
    LogoutOutlined,
    ProfileOutlined,
    UserOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import './../styles/Navbar.css';

const { Header } = Layout;

function Navbar() {
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const [setCookie] = useCookies(['token']);

    const navItems = [
        {
            label: "Home",
            icon: <HomeOutlined />,
            onClick: () => navigate("/")
        },
        {
            label: "Categories",
            icon: <UnorderedListOutlined />,
            onClick: () => navigate("/categories")
        },
        user ? {
            label: `${user.data.name}`,
            icon: <UserOutlined />,
            children: [
                {
                    label: (
                        <span
                        onClick={() => {
                            if (user.data.userType === 'Admin'){
                                navigate("/admin");
                            }
                            else if (user.data.userType === 'User'){
                                navigate("/user");
                            }
                            else{
                                navigate("/profile");
                            }
                        }}>
                            My Profile
                        </span>
                    ),
                    icon: <ProfileOutlined />
                },
                {
                    label: (
                        <Link
                           to="/login"
                           onClick={() => {
                                setCookie('token', '', { path: '/', expires: new Date(0) });
                                navigate('/login'); // Redirect to login page
                           }}
                        >
                            Logout
                        </Link>
                    ),
                    icon: <LogoutOutlined />
                }
            ]
        } : null // Conditionally render profile items only if the user is logged in
    ].filter(item => item !== null); // Filter out null items
    

    return (
        <Header
          className="d-flex justify-content-between"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%", // Ensure header stretches across the page
            display: "flex",
            alignItems: "center",
          }}
        >
          <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
            Task Manager
          </h3>

          {/* Flex-grow is applied to make the menu stretch to available space */}
          <Menu
            theme="dark"
            mode="horizontal"
            items={navItems}
            style={{ flexGrow: 1, justifyContent: 'flex-end', width: 'auto' }} // Menu will stretch and justify content properly
          />
        </Header>
    );
} 

export default Navbar;
