import { create } from 'zustand';
import toast from 'react-hot-toast';
import {
  saveRecipeApi,
  unsaveRecipeApi,
  likeRecipeApi,
  unlikeRecipeApi,
  followUserApi,
  unfollowUserApi
} from '../api/recipeApi';

export const useRecipeInteractionStore = create((set, get) => ({
  isLiked: false,
  isSaved: false,
  isFollowing: false,
  loading: {
    like: false,
    save: false,
    follow: false
  },

  initialize: (liked, saved, following = false) => {
    set({
      isLiked: Boolean(liked),
      isSaved: Boolean(saved),
      isFollowing: Boolean(following)
    });
  },

  toggleLike: async (recipeId) => {
    if (!recipeId) return;
    const { isLiked } = get();
    
    // Optimistic UI
    set({ isLiked: !isLiked });

    try {
      set((state) => ({ loading: { ...state.loading, like: true } }));
      
      if (!isLiked) {
        await likeRecipeApi(recipeId);
        toast.success("Liked");
      } else {
        await unlikeRecipeApi(recipeId);
        toast.success("Unliked");
      }
    } catch (err) {
      const code = err.response?.data?.code;
      // If unliking and the error is NOT_FOUND, ignore because it's technically successful in UI
      if (isLiked && code === "NOT_FOUND") {
        toast.success("Unliked");
      } else {
        // Revert on real failure
        set({ isLiked });
        toast.error("Action failed");
      }
    } finally {
      set((state) => ({ loading: { ...state.loading, like: false } }));
    }
  },

  toggleSave: async (recipeId) => {
    if (!recipeId) return;
    const { isSaved } = get();
    
    // Optimistic UI
    set({ isSaved: !isSaved });

    try {
      set((state) => ({ loading: { ...state.loading, save: true } }));
      
      if (!isSaved) {
        await saveRecipeApi(recipeId);
        toast.success("Recipe saved");
      } else {
        await unsaveRecipeApi(recipeId);
        toast.success("Recipe removed");
      }
    } catch {
      // Revert
      set({ isSaved });
      toast.error("Action failed");
    } finally {
      set((state) => ({ loading: { ...state.loading, save: false } }));
    }
  },

  toggleFollow: async (userId) => {
    if (!userId) return;
    const { isFollowing } = get();
    
    // Optimistic UI
    set({ isFollowing: !isFollowing });

    try {
      set((state) => ({ loading: { ...state.loading, follow: true } }));
      
      if (!isFollowing) {
        await followUserApi(userId);
        toast.success("Following");
      } else {
        await unfollowUserApi(userId);
        toast.success("Unfollowed");
      }
    } catch (err) {
      // Revert
      set({ isFollowing });
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      set((state) => ({ loading: { ...state.loading, follow: false } }));
    }
  }
}));
