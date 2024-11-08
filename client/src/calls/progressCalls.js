import { axiosInstance } from "./index";

export const GetProgress = async (taskID) => {
    try {
        const response = await axiosInstance.get(`/api/progress/get-progress/${taskID}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}

export const UpdateProgress = async (taskID, value) => {
    try {
        const response = await axiosInstance.put(`/api/progress/update-progress/${taskID}`, value);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}