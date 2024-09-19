import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, selectedCuisine);
  };

  const handleCuisineChange = (e) => {
    setSelectedCuisine(e.target.value);
    onSearch(query, e.target.value);
  };

  const cuisines = [
    'African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese',
    'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian',
    'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American',
    'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern',
    'Spanish', 'Thai', 'Vietnamese'
  ];

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes..."
        />
        <button className='btnx' type="submit">Search</button>
      </div>
      <div className="cuisine-filter">
        <label htmlFor="cuisine-select">Filter by cuisine: </label>
        <select
          id="cuisine-select"
          value={selectedCuisine}
          onChange={handleCuisineChange}
        >
          <option value="">All cuisines</option>
          {cuisines.map((cuisine) => (
            <option key={cuisine} value={cuisine.toLowerCase()}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default SearchForm;