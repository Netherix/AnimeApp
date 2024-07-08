import React from 'react';
import './CategoryDropdown.css'

const CategoryDropdown = ({ categories, selectedCategory, onChange }) => {
  return (
    <div className="dropdown-container">
      <label htmlFor="category-select">Select a Category:&nbsp;&nbsp;&nbsp;</label>
      <select
        id="category-select"
        onChange={onChange}
        value={selectedCategory || ''}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category.toLowerCase()}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
