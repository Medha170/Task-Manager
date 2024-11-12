import { axiosInstance } from './index';

export const GetNotifications = async () => {
    try {
        const response = await axiosInstance.get('/api/notifications/get-notifications');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const MarkNotificationAsRead = async (id) => {
    try {
        const response = await axiosInstance.put(`/api/notifications/get-notifications/${id}/read`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const DeleteNotifications = async () => {
    try {
        const response = await axiosInstance.delete('/api/notifications/delete-notifications');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}