import React, {useState, useEffect} from 'react';
import { Button, Form, Input, DatePicker, Select, Modal, Slider } from 'antd';
import moment from 'moment';
import { GetCategories, CreateCategory } from '../calls/categoryCalls';

const { Option } = Select;

const TaskForm = ({ initialValues, onFinish }) => {
    console.log(initialValues);
    const [categories, setCategories] = useState([]);
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await GetCategories();
        if (response.success) {
            setCategories(response.data);
        }
    }

    const handleCategoryCreate = async () => {
        const response = await CreateCategory({ categoryName: newCategory });
        if (response.success) {
            setCategories([...categories, response.data]);
            setNewCategory('');
            setIsCategoryModalVisible(false);
        }
    };

    return (
        <Form
            layout='vertical'
            onFinish={onFinish}
            initialValues={initialValues ? {
                ...initialValues,
                dueDate: initialValues.dueDate ? moment(initialValues.dueDate) : null
            } : {}}
        >
            <Form.Item
                label='Title'
                name="title"
                rules={[{ required: true, message: 'Please enter a title' }]}
            >
                <Input placeholder='Enter a task title' />
            </Form.Item>

            <Form.Item
                label='Description'
                name="description"
                rules={[{ required: true, message: 'Please enter a description' }]}
            >
                <Input.TextArea rows={4} placeholder="Enter task description" />
            </Form.Item>

            <Form.Item
                label='Due Date'
                name="dueDate"
                rules={[{ required: true, message: 'Please select a due date' }]}
            >
                <DatePicker style={{ width: '100%' }}/>
            </Form.Item>

            <Form.Item
                label='Priority'
                name="priority"
                rules={[{ required: true, message: 'Please select a priority' }]}
            >
                <Select placeholder='Select a priority'>
                    <Option value='Low'>Low</Option>
                    <Option value='Medium'>Medium</Option>
                    <Option value='High'>High</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label='Category'
                name="category"
                rules={[{ required: true, message: 'Please select a category' }]}
            >
                <Select placeholder='Select a category' onChange= {(value) => {
                    if (value === 'Others') {
                        setIsCategoryModalVisible(true);
                    }
                }}>
                    {categories.map((category) => (
                        <Option key={category._id} value={category._id}>{category.categoryName}</Option>
                    ))}
                    <Option value='Others'>Others</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label='Progress'
                name="progress"
                >
                <Slider
                    min={0}
                    max={100}
                    />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {initialValues ? 'Update Task' : 'Create Task'}
                </Button>
            </Form.Item>

            <Modal
                title="Create New Category"
                open={isCategoryModalVisible}
                onOk={handleCategoryCreate}
                onCancel={() => setIsCategoryModalVisible(false)}
            >
                <Input 
                    placeholder="Category name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
            </Modal>
        </Form>
    );
};

export default TaskForm;
