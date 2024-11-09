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

export const UpdateProgress = async (taskID, {completionPercentage}) => {
    try {
        const response = await axiosInstance.put(`/api/progress/update-progress/${taskID}`, {completionPercentage});
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}