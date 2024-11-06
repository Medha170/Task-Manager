import React from 'react';
import { Button, Form, Input, DatePicker, Select } from 'antd';
import moment from 'moment';

const { Option } = Select;

const TaskForm = ({ initialValues, onFinish }) => {
    console.log(initialValues);
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

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {initialValues ? 'Update Task' : 'Create Task'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default TaskForm;
