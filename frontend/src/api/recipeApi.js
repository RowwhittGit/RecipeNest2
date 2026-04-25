import axios from 'axios';

const getToken = () => localStorage.getItem('token') || '';

export const fetchRecipesApi = (page = 1, limit = 10, params = {}) => {
  return axios.get(`/api/recipes`, {
    params: { page, limit, ...params }
  });
};

export const searchApi = (q) => {
  return axios.get(`/api/search`, { params: { q } });
};

export const getCommentsApi = (recipeId) => {
  return axios.get(`/api/social/comments/${recipeId}`);
};

export const addCommentApi = (recipeId, body) => {
  return axios.post(`/api/social/comments/${recipeId}`, body, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const getRecipeByIdApi = (recipeId) => {
  return axios.get(`/api/recipes/${recipeId}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
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

export const likeRecipeApi = (recipeId) => {
  return axios.post(`/api/social/like/${recipeId}`, {}, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const unlikeRecipeApi = (recipeId) => {
  return axios.delete(`/api/social/unlike/${recipeId}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const followUserApi = (userId) => {
  return axios.post(`/api/social/follow/${userId}`, {}, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const unfollowUserApi = (userId) => {
  return axios.delete(`/api/social/unfollow/${userId}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const getFollowingApi = (userId) => {
  return axios.get(`/api/social/following/${userId}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const getSavedRecipesApi = () => {
  return axios.get(`/api/social/saved`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const getLikedRecipesApi = () => {
  return axios.get(`/api/social/liked`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const uploadImageApi = (file) => {
  const formData = new FormData();
  formData.append('hero', file);
  return axios.post(`/api/recipes/images/upload`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const createRecipeApi = (data) => {
  return axios.post(`/api/recipes`, data, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};
