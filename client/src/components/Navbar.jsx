import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../styles/Navbar.css'; // Import Navbar styles

const Navbar = () => {
    const navigate = useNavigate();
    const [priority, setPriority] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');

    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
        if (e.target.value) {
            navigate(`/tasks/priority/${e.target.value}`);
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        if (e.target.value) {
            navigate(`/tasks/category/${e.target.value}`);
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        if (e.target.value) {
            navigate(`/tasks/title/${e.target.value}`);
        }
    };

    const handleLogout = () => {
        // Clear the cookie by setting its expiry to a past date
        document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
        // Navigate to login page
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-logo">Task Manager</h1>
                <ul className="navbar-menu">
                    {/* Filter options */}
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
                            placeholder="Enter category ID"
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
