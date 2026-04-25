import axios from 'axios';

const getToken = () => localStorage.getItem('token') || '';

export const fetchRecipesApi = (page = 1, limit = 10) => {
  return axios.get(`/api/recipes`, {
    params: { page, limit }
  });
};

export const saveRecipeApi = (recipeId) => {
  return axios.post(`/api/social/save/${recipeId}`, {}, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const unsaveRecipeApi = (recipeId) => {
  return axios.delete(`/api/social/unsave/${recipeId}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};
