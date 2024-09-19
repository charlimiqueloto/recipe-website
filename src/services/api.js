const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return response.json();
};

export const searchRecipes = async (query, cuisine, offset = 0) => {
  try {
    const url = `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&cuisine=${cuisine}&offset=${offset}&number=5`;
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    console.error('Error to search recipe:', error);
    throw error;
  }
};

export const getRecipeDetails = async (id) => {
  try {
    const url = `${BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}`;
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    console.error('Error to search recipe detail:', error);
    throw error;
  }
};