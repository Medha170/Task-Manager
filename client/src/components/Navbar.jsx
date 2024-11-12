import React, { useState, useEffect } from 'react';
import { List, Button, Menu, Dropdown, Badge, Layout } from 'antd';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
    HomeOutlined,
    LogoutOutlined,
    ProfileOutlined,
    UserOutlined,
    UnorderedListOutlined,
    BellOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { GetNotifications, MarkNotificationAsRead, DeleteNotifications } from '../calls/notificationCalls';
import './../styles/Navbar.css';

const { Header } = Layout;

function Navbar() {
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const location = useLocation();
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
    };

    const handleDeleteNotifications = async () => {
        const response = await DeleteNotifications();
        if (response.success) {
            setNotifications([]);
            setUnreadCount(0);
        }
    };

    const navItems = [
        {
            key: "/",
            label: "Home",
            icon: <HomeOutlined />,
            onClick: () => navigate("/")
        },
        {
            key: "/categories",
            label: "Categories",
            icon: <UnorderedListOutlined />,
            onClick: () => navigate("/categories")
        },
        user ? {
            key: "profile",
            label: `${user.data.name}`,
            icon: <UserOutlined />,
            children: [
                {
                    key: "/profile",
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
                    key: "/logout",
                    label: (
                        <Link
                           to="/login"
                           onClick={() => {
                                Cookies.remove('__vercel_live_token');
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
      <div className="notification-dropdown">
          <List
              itemLayout="horizontal"
              dataSource={notifications.slice(0, 5)}
              renderItem={(notification) => (
                  <List.Item
                      actions={[
                          <Button 
                              type="link" 
                              onClick={() => handleMarkAsRead(notification._id)}
                              style={{ padding: '0' }}
                          >
                              Mark as Read
                          </Button>,
                      ]}
                  >
                      <List.Item.Meta 
                          title={notification.title} 
                          description={notification.message} 
                      />
                  </List.Item>
              )}
          />
          <div 
              className="notification-dropdown-button" 
              onClick={() => navigate("/notifications")}
          >
              View All
          </div>
          <div 
              className="notification-dropdown-button" 
              onClick={handleDeleteNotifications}
          >
              Delete Older notifications
          </div>
      </div>
  );  
    

    return (
        <Header
          className="d-flex justify-content-between"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
            Task Manager
          </h3>

          <Menu
            theme="dark"
            mode="horizontal"
            items={navItems}
            selectedKeys={[location.pathname]} // Set selected key based on current path
            style={{ flexGrow: 1, justifyContent: 'flex-end', width: 'auto' }}
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
                    style={{ fontSize: 15, color: 'white', cursor: 'pointer', marginLeft: '15px' }} 
                />
                </Badge>
           </Dropdown>
        </Header>
    );
} 

export default Navbar;

