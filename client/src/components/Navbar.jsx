import React, { useState, useEffect } from 'react';
import { List, Button, Menu, Dropdown, Badge, Layout } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import {
    HomeOutlined,
    LogoutOutlined,
    ProfileOutlined,
    UserOutlined,
    UnorderedListOutlined,
    BellOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { GetNotifications, MarkNotificationAsRead } from '../calls/notificationCalls';
import './../styles/Navbar.css';

const { Header } = Layout;

function Navbar() {
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const [setCookie] = useCookies(['token']);
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await GetNotifications();

            if (response.success) {
                setNotifications(response.data);
                setUnreadCount(response.data.filter(notification => !notification.isRead).length);
            }
        }

        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000); // Fetch notifications every 30 seconds
        return () => clearInterval(interval);
    }, []);

    const handleMarkAsRead = async (id) => {
        const response = await MarkNotificationAsRead(id);

        if (response.success) {
            setNotifications((prevNotifications) =>
              prevNotifications.map((notification) =>
                notification._id === id
                  ? { ...notification, isRead: true }
                  : notification
              )
            );
            setUnreadCount((count) => count - 1);
        }
    }

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

    const notificationDropdown = (
        <div style={{ width: 300 }}>
          <List
            itemLayout="horizontal"
            dataSource={notifications.slice(0, 5)}
            renderItem={(notification) => (
              <List.Item
                actions={[
                  <Button type="link" onClick={() => handleMarkAsRead(notification._id)}>
                    Mark as Read
                  </Button>,
                ]}
              >
                <List.Item.Meta title={notification.title} description={notification.message} />
              </List.Item>
            )}
          />
          <Button type="link" onClick={() => navigate("/notifications")} style={{ width: "100%", textAlign: "center" }}>
            View All
          </Button>
        </div>
      );
    

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

           <Dropdown 
             overlay={notificationDropdown} 
             trigger={['click']}
            >
                <Badge 
                   count={unreadCount} 
                   offset={[-10, 10]}
                >
                <BellOutlined 
                    style={{ fontSize: 15, color: 'white', cursor: 'pointer' }} 
                />
                </Badge>
           </Dropdown>
        </Header>
    );
} 

export default Navbar;
