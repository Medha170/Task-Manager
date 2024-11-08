import React, {useState, useEffect} from 'react';
import { List, Card, Button, message, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, RedoOutlined } from '@ant-design/icons';
import { GetTasks, CreateTask, UpdateTask, DeleteTask } from '../calls/taskCalls';
import moment from 'moment';
import TaskForm from './../components/TaskForm';
import ProgressBar from '../components/ProgressBar';
import { GetProgress } from '../calls/progressCalls';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskProgress, setTaskProgress] = useState(0);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try{
      const response = await GetTasks();
      if (response.success) {
        setTasks(response.data);
        fetchProgress(response.data);
      } else {
        message.error(response.message);
      }
    }
    catch (error) {
      message.error(error.message);
    }
    setLoading(false);
  }

  const fetchProgress = async (tasks) => {
    const progressData = {};
    for (let task of tasks) {
      const response = await GetProgress(task._id);
      if (response.success) {
        progressData[task._id] = response.data.completionPercentage;
      }
    }
    setTaskProgress(progressData);
  }

  const openModal = (task = null) => {
    setEditingTask(task);
    setIsModalVisible(true);
  }

  const handleSubmit = async (values) => {
    try {
      if (editingTask) {
        // Update Task
        const response = await UpdateTask(editingTask._id, values);
        if (response.success) {
          message.success('Task updated successfully');
          fetchTasks();
          setEditingTask(null);
        } else {
          message.error(response.message);
        }
      }
      else{
        // Create a new Task
        const response = await CreateTask(values);
        if (response.success) {
          message.success('Task created successfully');
          fetchTasks();
        } else {
          message.error(response.message);
        }
      }
    }
    catch (error) {
      message.error(error.message);
    }
    setIsModalVisible(false);
  }

  const handleDeleteTask = async (taskID) => {
    try {
      const response = await DeleteTask(taskID);
      if (response.success) {
        message.success('Task deleted successfully');
        fetchTasks();
      } else {
        message.error(response.message);
      }
    }
    catch (error) {
      message.error(error.message);
    }
  }

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
  }

  return (
    <div className='task-page'>
      <h1 className='page-title' style={{ marginBottom: '1rem', color: 'black' }}>Your Tasks</h1>

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
        dataSource={tasks}
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

              {/* Add ProgressBar component */}
              <div style={{ marginTop: '1rem' }}>
                <b>Progress:</b>
                <ProgressBar
                  taskId={task._id}
                  initialProgress={taskProgress[task._id] || 0} // Pass initial progress if available
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
  )
};

export default Home;