import React, { useState, useEffect } from 'react';
import { List, Card, Button, message, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, RedoOutlined } from '@ant-design/icons';
import FilterBar from './../components/Filterbar'; // Import FilterBar
import { GetTasks, CreateTask, UpdateTask, DeleteTask } from '../calls/taskCalls';
import moment from 'moment';
import TaskForm from './../components/TaskForm';
import ProgressBar from '../components/ProgressBar';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskProgress, setTaskProgress] = useState(0);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await GetTasks();
      if (response?.success) {
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
    return new Date(task.dueDate) < new Date();
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'orange';
      case 'Low':
        return 'green';
      default:
        return 'blue';
    }
  };

  return (
    <div className='task-page'>
      <h1 className='page-title' style={{ marginBottom: '1rem', color: 'black' }}>Your Tasks</h1>

      {/* Filter Bar */}
      <FilterBar onFilterChange={handleFilterChange} />

      {/* Button to open the modal for creating a new task */}
      <Button
        type="primary"
        onClick={() => openModal()}
        icon={<PlusOutlined />}
        loading={loading}
        style={{ marginBottom: '1rem', marginLeft: '0.5rem' }}
      >
        Add Task
      </Button>

      <Button
        type="default"
        onClick={() => fetchTasks()}
        icon={<RedoOutlined />}
        loading={loading}
        style={{ marginBottom: '1rem', marginLeft: '0.5rem' }}
      >
        Refresh Tasks
      </Button>

      {/* List of tasks */}
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
            >
              <p><b>Description:</b> {task.description}</p>
              <p><b>Due Date:</b> {moment(task.dueDate).format('YYYY-MM-DD')}</p>
              <p><b>Priority:</b> <span style={{ color: getPriorityColor(task.priority) }}>{task.priority}</span></p>
              <p><b>Category:</b> {task.categoryID.categoryName}</p>
              <p><b>Status:</b> {isExpired(task) ? 'Expired' : 'Active'}</p>

              <div style={{ marginTop: '1rem' }}>
                <b>Progress:</b>
                <ProgressBar
                  taskId={task._id}
                  initialProgress={taskProgress}
                />
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
          } : null }
          onFinish={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default Home;