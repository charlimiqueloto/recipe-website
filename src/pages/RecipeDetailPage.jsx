import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeDetails } from '../services/api';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const data = await getRecipeDetails(id);
        setRecipe(data);
      } catch (err) {
        setError('Error loading recipe details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!recipe) return null;

  const healthLabels = [
    { key: 'vegetarian', label: 'Vegetarian' },
    { key: 'vegan', label: 'Vegan' },
    { key: 'glutenFree', label: 'Gluten Free' },
    { key: 'dairyFree', label: 'Dairy Free' },
    { key: 'veryHealthy', label: 'Very Healthy' },
    { key: 'cheap', label: 'Cheap' },
    { key: 'veryPopular', label: 'Very Popular' },
    { key: 'sustainable', label: 'Sustainable' },
    { key: 'lowFodmap', label: 'Low FODMAP' },
    { key: 'ketogenic', label: 'Ketogenic' },
    { key: 'whole30', label: 'Whole30' }
  ];

  return (
    <main className='main-content'>
      <div className="recipe-detail">
        <h1>{recipe.title}</h1>
        <img src={recipe.image} alt={recipe.title} />
        
        <h2>Health and Diet Information</h2>
        <ul className="health-labels">
          {healthLabels.map(({ key, label }) => (
            recipe[key] === true && <li key={key}>{label}</li>
          ))}
        </ul>

        <h2>Ingredients</h2>
        <ul className="ingredients">
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>
              <strong>{ingredient.name}</strong>: {ingredient.amount} {ingredient.unit}
            </li>
          ))}
        </ul>

        <h2>Cooking Instructions</h2>
        <div className="instructions">
          {recipe.instructions ? (
            <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
          ) : (
            <p>Instructions not available for this recipe.</p>
          )}
        </div>

        <h2>Additional Information</h2>
        <div className="additional-info">
          <p>Preparation Time: {recipe.readyInMinutes} minutes</p>
          <p>Servings: {recipe.servings}</p>
          <p>Health Score: {recipe.healthScore}</p>
          <p>Price per Serving: ${(recipe.pricePerServing / 100).toFixed(2)}</p>
        </div>
      </div>
    </main>
  );
};

export default RecipeDetailPage;