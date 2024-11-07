import { axiosInstance } from "./index";

export const GetCategories = async () => {
    try {
        const response = await axiosInstance.get('/api/categories/get-categories');
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}

export const CreateCategory = async (value) => {
    try {
        const response = await axiosInstance.post('/api/categories/create-category', value);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}

export const UpdateCategory = async (id, value) => {
    try {
        const response = await axiosInstance.put(`/api/categories/update-category/${id}`, value);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}

export const DeleteCategory = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/categories/delete-category/${id}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}