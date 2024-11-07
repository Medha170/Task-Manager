import React, {useState, useEffect} from 'react';
import { List, Card, Button, Modal, Form, Input, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { GetCategories, CreateCategory, UpdateCategory, DeleteCategory } from '../calls/categoryCalls';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try{
            const response = await GetCategories();
            setCategories(response.data || []);
        }
        catch (error) {
            message.error(error.message);
        }
        setLoading(false);
    }
    
    const handleSubmit = async (values) => {
        try {
            if (editingCategory) {
                const response = await UpdateCategory(editingCategory._id, values);
                if (response.success) {
                    message.success('Category updated successfully');
                } else {
                    message.error(response.message);
                }
            }
            else{
                await CreateCategory(values);
                message.success('Category created successfully');
            }
            fetchCategories();
            setIsModalVisible(false);
            setEditingCategory(null);
        }
        catch (error) {
            message.error(error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await DeleteCategory(id);
            if (response.success) {
                message.success('Category deleted successfully');
            } else {
                message.error(response.message);
            }
            fetchCategories();
        }
        catch (error) {
            message.error(error.message);
        }
    };

    const openModal = (category = null) => {
        setEditingCategory(category);
        setIsModalVisible(true);
    };

    return (
        <div>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => openModal()}
                style={{ marginBottom: '1rem' }}
            >
                Add Category
            </Button>

            <List
                grid={{ gutter: 16, column: 4 }}
                loading={loading}
                dataSource={categories}
                renderItem={(category) => (
                    <List.Item>
                        <Card
                            title={category.categoryName}
                            extra={
                                <div>
                                    <Button
                                        type='link'
                                        icon={<EditOutlined />}
                                        onClick={() => openModal(category)}
                                    />
                                    <Button
                                        type='link'
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleDelete(category._id)}
                                        danger
                                    />
                                </div>
                            }
                        >
                        </Card>
                    </List.Item>
                )}
            />

            <Modal
                title={editingCategory ? 'Edit Category' : 'Create Category'}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditingCategory(null);
                }}
                footer={null}
            >
                <Form
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={editingCategory || { categoryName: ''}}
                >
                    <Form.Item
                        label="Category Name"
                        name="categoryName"
                        rules={[{ required: true, message: 'Please enter a category name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingCategory ? 'Update' : 'Create'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>

    );
};

export default Category;

