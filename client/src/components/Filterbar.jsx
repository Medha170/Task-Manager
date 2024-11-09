import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { GetCategories } from '../calls/categoryCalls';
import './../styles/Filterbar.css';

const { Option } = Select;

function FilterBar({ onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await GetCategories();
      if (response.success) {
        setCategories(response.data);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onFilterChange({ category: value, priority: selectedPriority });
  };

  const handlePriorityChange = (value) => {
    setSelectedPriority(value);
    onFilterChange({ category: selectedCategory, priority: value });
  };

  return (
    <div className="filter-bar">
      <Select
        placeholder="Filter by Category"
        style={{ width: 150, marginRight: 8 }}
        onChange={handleCategoryChange}
        allowClear
      >
        {categories.map(category => (
          <Option key={category._id} value={category._id}>{category.categoryName}</Option>
        ))}
      </Select>

      <Select
        placeholder="Filter by Priority"
        style={{ width: 150 }}
        onChange={handlePriorityChange}
        allowClear
      >
        <Option value="High">High</Option>
        <Option value="Medium">Medium</Option>
        <Option value="Low">Low</Option>
      </Select>
    </div>
  );
}

export default FilterBar;
