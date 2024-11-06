const { axiosInstance } = require('./index');

// Get all tasks
export const GetTasks = async () => {
    try {
        const reponse = await axiosInstance.get('/api/tasks/get-tasks');
        return reponse.data;
    }
    catch (error) {
        return error.response.data;
    }
}

// Create a new task
export const CreateTask = async (value) => {
    try {
        const response = await axiosInstance.post('/api/tasks/create-task', value);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}

// Update a task
export const UpdateTask = async (id, value) => {
    try {
        const response = await axiosInstance.put(`/api/tasks/update-task/${id}`, value);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}

// Delete a task
export const DeleteTask = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/tasks/delete-task/${id}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}