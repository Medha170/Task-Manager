import React, { useState, useEffect } from 'react';
import { List, Card, Button, message, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, RedoOutlined } from '@ant-design/icons';
import FilterBar from './../components/Filterbar'; 
import { GetTasks, CreateTask, UpdateTask, DeleteTask } from '../calls/taskCalls';
import moment from 'moment';
import TaskForm from './../components/TaskForm';
import ProgressBar from '../components/ProgressBar';
import './../styles/Home.css';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await GetTasks();
      if (response?.success) {
        await deleteExpiredTasks(response.data);  
        setTasks(response.data);
        setFilteredTasks(response.data); // Initialize filtered tasks with all tasks
      } else {
        message.error(response?.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    setLoading(false);
  };

  const handleFilterChange = ({ category, priority }) => {
    let filtered = tasks;
    if (category) {
      filtered = filtered.filter(task => task.categoryID._id === category);
    }
    if (priority) {
      filtered = filtered.filter(task => task.priority === priority);
    }
    setFilteredTasks(filtered);
  };

  const openModal = (task = null) => {
    setEditingTask(task);
    setIsModalVisible(true);
  };

  const isExpired = (task) => {
    const oneDayAfterDueDate = new Date(task.dueDate);
    oneDayAfterDueDate.setDate(oneDayAfterDueDate.getDate() + 1);
    return new Date() > oneDayAfterDueDate;
  };

  const deleteExpiredTasks = async (tasks) => {
    const currentTime = new Date();
    for (const task of tasks) {
      const oneDayAfterDueDate = new Date(task.dueDate);
      oneDayAfterDueDate.setDate(oneDayAfterDueDate.getDate() + 1);
      if (currentTime > oneDayAfterDueDate) {
        await handleDeleteTask(task._id); // Delete expired task
      }
    }
    // Filter out expired tasks from the tasks array
    setTasks(tasks.filter(task => {
      const oneDayAfterDueDate = new Date(task.dueDate);
      oneDayAfterDueDate.setDate(oneDayAfterDueDate.getDate() + 1);
      return currentTime <= oneDayAfterDueDate;
    }));
  };

  const handleSubmit = async (values) => {
    try {
      if (editingTask) {
        const response = await UpdateTask(editingTask._id, values);
        if (response.success) {
          message.success('Task updated successfully');
          fetchTasks();
          setEditingTask(null);
        } else {
          message.error(response.message);
        }
      } else {
        const response = await CreateTask(values);
        if (response.success) {
          message.success('Task created successfully');
          fetchTasks();
        } else {
          message.error(response.message);
        }
      }
    } catch (error) {
      message.error(error.message);
    }
    setIsModalVisible(false);
  };

  const handleDeleteTask = async (taskID) => {
    try {
      const response = await DeleteTask(taskID);
      if (response.success) {
        message.success('Task deleted successfully');
        fetchTasks();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="task-page">
      <h1 className="page-title">Your Tasks</h1>

      <FilterBar onFilterChange={handleFilterChange} />

      <Button
          type="primary"
          onClick={() => openModal()}
          icon={<PlusOutlined />}
          loading={loading}
          className="add-task-button"
      >
          Add Task
      </Button>

      <Button
          type="default"
          onClick={() => fetchTasks()}
          icon={<RedoOutlined />}
          loading={loading}
          className="refresh-task-button"
      >
          Refresh Tasks
      </Button>

      <List
          grid={{ gutter: 16, column: 3 }}
          loading={loading}
          dataSource={filteredTasks}
          renderItem={task => (
              <List.Item>
                  <Card
                      title={task.title}
                      extra={
                          <div>
                              <Button type="link" onClick={() => openModal(task)}><EditOutlined /></Button>
                              <Button type="link" onClick={() => handleDeleteTask(task._id)}><DeleteOutlined /></Button>
                          </div>
                      }
                      className="task-card"
                  >
                      <p className="task-info"><b>Description:</b> {task.description}</p>
                      <p className="task-info"><b>Due Date:</b> {moment(task.dueDate).format('YYYY-MM-DD')}</p>
                      <p className="task-info"><b>Priority:</b> <span className={`priority-${task.priority.toLowerCase()}`}>{task.priority}</span></p>
                      <p className="task-info"><b>Category:</b> {task.categoryID.categoryName}</p>
                      <p className="task-info"><b>Status:</b> <span className={isExpired(task) ? 'status-expired' : 'status-active'}>{isExpired(task) ? 'Expired' : 'Active'}</span></p>

                      <div className="progress-bar">
                          <ProgressBar taskId={task._id} />
                      </div>
                  </Card>
              </List.Item>
          )}
      />

      <Modal
          title={editingTask ? 'Edit Task' : 'Create a new Task'}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
      >
          <TaskForm
              initialValues={editingTask ? {
                  title: editingTask.title,
                  description: editingTask.description,
                  dueDate: moment(editingTask.dueDate),
                  categoryID: editingTask.categoryID._id,
                  priority: editingTask.priority
              } : null}
              onFinish={handleSubmit}
              className="task-form"
          />
      </Modal>
  </div>
  );
};

export default Home;