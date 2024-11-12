import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import { GetCurrentUser, UpdateUserProfile } from '../calls/userCalls';
import './../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        setUser(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error('Failed to load profile data');
    }
    setLoading(false);
  };

  const handleFormSubmit = async (values) => {
    setFormLoading(true);
    try {
      const response = await UpdateUserProfile(values);
      if (response.success) {
        message.success('Profile updated successfully');
        setUser(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error('Failed to update profile');
    }
    setFormLoading(false);
  };

  return (
    <div className="profile-page">
      <h2 className="profile-title">Profile</h2>
      {loading ? (
        <Spin size="large" className="profile-spinner" />
      ) : (
        <Form
          initialValues={user}
          onFinish={handleFormSubmit}
          layout="vertical"
          className="profile-form"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="User Type" name="userType">
            <Input readOnly className="readonly-input" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={formLoading}
              className="profile-update-button"
            >
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default Profile;
