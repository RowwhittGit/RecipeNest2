import { create } from 'zustand';
import { fetchRecipesApi, saveRecipeApi, unsaveRecipeApi } from '../api/recipeApi';
import toast from 'react-hot-toast';

export const useRecipeStore = create((set) => ({
  recipes: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,

  fetchRecipes: async (pageArg = 1) => {
    try {
      set({ loading: true, error: null });
      const { data } = await fetchRecipesApi(pageArg, 10);
      
      if (data.success) {
        set((state) => ({
          recipes: pageArg === 1 ? data.data : [...state.recipes, ...data.data],
          page: pageArg,
          hasMore: pageArg < data.pagination.pages,
          loading: false
        }));
      } else {
        set({ loading: false });
      }
    } catch (err) {
      set({ 
        error: err.response?.data?.message || 'Failed to fetch recipes',
        loading: false 
      });
      toast.error('Failed to load recipes');
    }
  },

  saveRecipe: async (recipeId) => {
    try {
      const { data } = await saveRecipeApi(recipeId);
      if (data.success) {
        toast.success('Recipe saved');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save recipe');
      throw err;
    }
  },

  unsaveRecipe: async (recipeId) => {
    try {
      const { data } = await unsaveRecipeApi(recipeId);
      if (data.success) {
        toast.success('Recipe removed');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove recipe');
      throw err;
    }
  }
}));
