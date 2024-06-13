import React, { useState } from 'react';
import './Search.css'

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onSearch function passed from the parent component
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="Search">
      <input
        type="text"
        placeholder="Search for anime..."
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
