import React, { useEffect, useState } from 'react';
import { List, Button, message, Typography } from 'antd';
import { GetNotifications, MarkNotificationAsRead } from '../calls/notificationCalls';
import './../styles/Notification.css';

const { Title } = Typography;

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        setLoading(true);
        const response = await GetNotifications();

        if (response.success) {
            setNotifications(response.data);
        } else {
            message.error(response.message);
        }
        setLoading(false);
    };

    const handleMarkAsRead = async (id) => {
        const response = await MarkNotificationAsRead(id);

        if (response.success) {
            message.success('Notification marked as read');
            fetchNotifications();
        } else {
            message.error(response.message);
        }
    };

    return (
        <div className="notification-page">
            <Title level={3} className="notification-title">Notifications</Title>
            <List
                loading={loading}
                dataSource={notifications}
                renderItem={(notification) => (
                    <List.Item
                        actions={[
                            <Button
                                type="primary"
                                onClick={() => handleMarkAsRead(notification._id)}
                                disabled={notification.read}
                            >
                                {notification.read ? 'Read' : 'Mark as read'}
                            </Button>
                        ]}
                    >
                        <List.Item.Meta
                            title={notification.message}
                            description={new Date(notification.createdAt).toDateString()}
                        />
                    </List.Item>  
                )}
            />
        </div>
    );    
};

export default Notification;

