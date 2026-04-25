import axios from 'axios';
import { authFetch } from './axiosInstance';

const authHeader = (token) => ({ Authorization: `Bearer ${token}` });

// ── Recipes (public) ──────────────────────────────────────────────────────────
export const fetchRecipesApi = (page = 1, limit = 10, params = {}) =>
  axios.get('/api/recipes', { params: { page, limit, ...params } });

export const searchApi = (q) =>
  axios.get('/api/search', { params: { q } });

export const getCommentsApi = (recipeId) =>
  axios.get(`/api/social/comments/${recipeId}`);

// ── Recipes (protected) ───────────────────────────────────────────────────────
export const getRecipeByIdApi = (recipeId) =>
  authFetch((token) => axios.get(`/api/recipes/${recipeId}`, { headers: authHeader(token) }));

export const createRecipeApi = (data) =>
  authFetch((token) => axios.post('/api/recipes', data, { headers: authHeader(token) }));

export const updateRecipeApi = (recipeId, data) =>
  authFetch((token) => axios.put(`/api/recipes/${recipeId}`, data, { headers: authHeader(token) }));

export const getMyRecipesApi = () =>
  authFetch((token) => axios.get('/api/recipes/my/all', { headers: authHeader(token) }));

export const getMyRecipeByIdApi = (recipeId) =>
  authFetch((token) => axios.get(`/api/recipes/my/${recipeId}`, { headers: authHeader(token) }));

export const uploadImageApi = (file) => {
  const formData = new FormData();
  formData.append('hero', file);
  return authFetch((token) =>
    axios.post('/api/recipes/images/upload', formData, {
      headers: { ...authHeader(token), 'Content-Type': 'multipart/form-data' },
    })
  );
};

// ── Profile ───────────────────────────────────────────────────────────────────
export const getMyProfileApi = () =>
  authFetch((token) => axios.get('/api/profiles/me', { headers: authHeader(token) }));

export const updateProfileApi = (data) =>
  authFetch((token) => axios.put('/api/profiles/me', data, { headers: authHeader(token) }));

export const getUserProfileApi = (userId) =>
  authFetch((token) => axios.get(`/api/profiles/${userId}`, { headers: authHeader(token) }));

export const getRecipesByUserApi = (userId) =>
  authFetch((token) => axios.get(`/api/recipes/user/${userId}`, { headers: authHeader(token) }));

// ── Social — Follow ───────────────────────────────────────────────────────────
export const followUserApi = (userId) =>
  authFetch((token) => axios.post(`/api/social/follow/${userId}`, {}, { headers: authHeader(token) }));

export const unfollowUserApi = (userId) =>
  authFetch((token) => axios.delete(`/api/social/unfollow/${userId}`, { headers: authHeader(token) }));

export const getFollowingApi = (userId) =>
  axios.get(`/api/social/following/${userId}`);

export const getFollowersApi = (userId) =>
  axios.get(`/api/social/followers/${userId}`);

export const getFollowingListApi = (userId) =>
  axios.get(`/api/social/following/${userId}`);

// ── Social — Like ─────────────────────────────────────────────────────────────
export const likeRecipeApi = (recipeId) =>
  authFetch((token) => axios.post(`/api/social/like/${recipeId}`, {}, { headers: authHeader(token) }));

export const unlikeRecipeApi = (recipeId) =>
  authFetch((token) => axios.delete(`/api/social/unlike/${recipeId}`, { headers: authHeader(token) }));

export const getLikedRecipesApi = () =>
  authFetch((token) => axios.get('/api/social/liked', { headers: authHeader(token) }));

export const getFullLikedRecipesApi = () =>
  authFetch((token) => axios.get('/api/social/liked', { headers: authHeader(token) }));

// ── Social — Save ─────────────────────────────────────────────────────────────
export const saveRecipeApi = (recipeId) =>
  authFetch((token) => axios.post(`/api/social/save/${recipeId}`, {}, { headers: authHeader(token) }));

export const unsaveRecipeApi = (recipeId) =>
  authFetch((token) => axios.delete(`/api/social/unsave/${recipeId}`, { headers: authHeader(token) }));

export const getSavedRecipesApi = () =>
  authFetch((token) => axios.get('/api/social/saved', { headers: authHeader(token) }));

export const getFullSavedRecipesApi = () =>
  authFetch((token) => axios.get('/api/social/saved', { headers: authHeader(token) }));

// ── Social — Comments ─────────────────────────────────────────────────────────
export const addCommentApi = (recipeId, body) =>
  authFetch((token) => axios.post(`/api/social/comments/${recipeId}`, body, { headers: authHeader(token) }));
