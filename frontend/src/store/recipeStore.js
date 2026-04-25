import { create } from 'zustand';
import { fetchRecipesApi, searchApi } from '../api/recipeApi';
import toast from 'react-hot-toast';

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  searchQuery: '',
  activeCuisine: '',

  fetchRecipes: async (pageArg = 1) => {
    const { searchQuery, activeCuisine } = get();
    try {
      set({ loading: true, error: null });
      const params = {};
      if (activeCuisine) params.cuisine = activeCuisine;
      const { data } = await fetchRecipesApi(pageArg, 10, params);
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
      set({ error: err.response?.data?.message || 'Failed to fetch recipes', loading: false });
      toast.error('Failed to load recipes');
    }
  },

  search: async (q) => {
    if (!q.trim()) {
      set({ searchQuery: '', activeCuisine: '' });
      get().fetchRecipes(1);
      return;
    }
    try {
      set({ loading: true, error: null, searchQuery: q });
      const { data } = await searchApi(q);
      set({
        recipes: data.data?.recipes || [],
        page: 1,
        hasMore: false,
        loading: false
      });
    } catch (err) {
      set({ error: 'Search failed', loading: false });
    }
  },

  setCuisine: (cuisine) => {
    set({ activeCuisine: cuisine, searchQuery: '' });
    get().fetchRecipes(1);
  },
}));
