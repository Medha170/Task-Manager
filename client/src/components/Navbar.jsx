import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../styles/Navbar.css'; // Import Navbar styles
import Cookies from 'js-cookie';
import { axiosInstance } from '../calls'; // Ensure axios instance is imported

const Navbar = () => {
    const navigate = useNavigate();
    const [priority, setPriority] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');

    // Handle priority change and navigate to the corresponding route
    const handlePriorityChange = async (e) => {
        const selectedPriority = e.target.value;
        setPriority(selectedPriority);
        if (selectedPriority) {
            // Fetch tasks by priority and navigate
            try {
                await axiosInstance.get(`/tasks/priority/${selectedPriority}`);
                navigate(`/tasks/priority/${selectedPriority}`);
            } catch (error) {
                console.error("Error fetching tasks by priority:", error);
            }
        } else {
            navigate('/tasks'); // Fallback to all tasks if no priority is selected
        }
    };

    // Handle category change and navigate to the corresponding route
    const handleCategoryChange = async (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        if (selectedCategory) {
            // Fetch tasks by category and navigate
            try {
                await axiosInstance.get(`/tasks/category/${selectedCategory}`);
                navigate(`/tasks/category/${selectedCategory}`);
            } catch (error) {
                console.error("Error fetching tasks by category:", error);
            }
        } else {
            navigate('/tasks'); // Fallback to all tasks if no category is selected
        }
    };

    // Handle title search and navigate to the corresponding route
    const handleTitleChange = async (e) => {
        const searchTitle = e.target.value;
        setTitle(searchTitle);
        if (searchTitle) {
            // Fetch tasks by title and navigate
            try {
                await axiosInstance.get(`/tasks/title/${searchTitle}`);
                navigate(`/tasks/title/${searchTitle}`);
            } catch (error) {
                console.error("Error fetching tasks by title:", error);
            }
        } else {
            navigate('/tasks'); // Fallback to all tasks if no title is entered
        }
    };

    const handleLogout = async () => {
        try {
            // Call the backend logout route
            await axiosInstance.post('/users/logout');
            // Clear the token cookie
            Cookies.remove('token');
            // Redirect to the login page
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-logo">Task Manager</h1>
                <ul className="navbar-menu">
                    <li>
                        <label htmlFor="priority">Priority:</label>
                        <select id="priority" value={priority} onChange={handlePriorityChange}>
                            <option value="">All</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </li>
                    <li>
                        <label htmlFor="category">Category:</label>
                        <input
                            type="text"
                            id="category"
                            value={category}
                            onChange={handleCategoryChange}
                            placeholder="Enter category"
                        />
                    </li>
                    <li>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="Search by title"
                        />
                    </li>
                </ul>
                <div className="navbar-dropdown">
                    <button className="dropdown-btn">≡</button>
                    <div className="dropdown-content">
                        <Link to="/settings">Settings</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
