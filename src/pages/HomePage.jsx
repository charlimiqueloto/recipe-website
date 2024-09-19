import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import RecipeCard from '../components/RecipeCard';
import Pagination from '../components/Pagination';
import { searchRecipes } from '../services/api';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastQuery, setLastQuery] = useState('');
  const [lastCuisine, setLastCuisine] = useState('');

  const handleSearch = async (query, cuisine, page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const offset = (page - 1) * 5;
      const data = await searchRecipes(query, cuisine, offset);
      setRecipes(data.results);
      setTotalResults(data.totalResults);
      setCurrentPage(page);
      setLastQuery(query);
      setLastCuisine(cuisine);
    } catch (err) {
      setError('Error fetching recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    handleSearch(lastQuery, lastCuisine, newPage);
  };

  useEffect(() => {
    handleSearch('', '');
  }, []);

  return (
    <div className="home-page">
      <h1>Recipe Search</h1>
      <SearchForm onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      {totalResults > 5 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalResults / 5)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default HomePage;