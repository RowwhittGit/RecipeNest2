import { create } from 'zustand';
import toast from 'react-hot-toast';
import {
  saveRecipeApi,
  unsaveRecipeApi,
  likeRecipeApi,
  unlikeRecipeApi,
  followUserApi,
  unfollowUserApi,
  getFollowingApi,
  getSavedRecipesApi,
  getLikedRecipesApi
} from '../api/recipeApi';

export const useSocialStore = create((set, get) => ({
  followingIds: new Set(),
  savedRecipeIds: new Set(),
  likedRecipeIds: new Set(),

  loading: {
    following: false,
    saved: false,
    liked: false
  },

  initialized: false,

  initializeSocialState: async (userId) => {
    if (!userId || get().initialized) return;

    try {
      set(state => ({
        loading: { ...state.loading, following: true, saved: true, liked: true }
      }));

      const [followingRes, savedRes, likedRes] = await Promise.all([
        getFollowingApi(userId),
        getSavedRecipesApi(),
        getLikedRecipesApi()
      ]);

      // following: array of user objects
      const followingList = followingRes.data?.data || [];
      const validFollowingIds = followingList.filter(Boolean).map(u => String(u._id));

      // saved: array of full recipe objects (populated)
      const savedList = savedRes.data?.data || [];
      const validSavedIds = savedList.filter(Boolean).map(r => String(r._id));

      // liked: array of recipeId strings
      const likedList = likedRes.data?.data || [];
      const validLikedIds = likedList.filter(Boolean).map(id => String(id));

      set({
        followingIds: new Set(validFollowingIds),
        savedRecipeIds: new Set(validSavedIds),
        likedRecipeIds: new Set(validLikedIds),
        initialized: true,
        loading: { following: false, saved: false, liked: false }
      });
    } catch (err) {
      console.error('Failed to initialize social state', err);
      set({ loading: { following: false, saved: false, liked: false } });
    }
  },

  reset: () => {
    set({
      followingIds: new Set(),
      savedRecipeIds: new Set(),
      likedRecipeIds: new Set(),
      initialized: false,
      loading: { following: false, saved: false, liked: false }
    });
  },

  toggleFollow: async (userId) => {
    if (!userId) return;
    const strUserId = String(userId);
    const { followingIds } = get();
    const isFollowing = followingIds.has(strUserId);

    const newFollowingIds = new Set(followingIds);
    if (isFollowing) {
      newFollowingIds.delete(strUserId);
    } else {
      newFollowingIds.add(strUserId);
    }
    set({ followingIds: newFollowingIds });

    try {
      if (isFollowing) {
        await unfollowUserApi(strUserId);
        toast.success("Unfollowed");
      } else {
        await followUserApi(strUserId);
        toast.success("Following");
      }
    } catch (err) {
      set({ followingIds });
      toast.error(err.response?.data?.message || "Action failed");
    }
  },

  toggleSave: async (recipeId) => {
    if (!recipeId) return;
    const strRecipeId = String(recipeId);
    const { savedRecipeIds } = get();
    const isSaved = savedRecipeIds.has(strRecipeId);

    const newSavedIds = new Set(savedRecipeIds);
    if (isSaved) {
      newSavedIds.delete(strRecipeId);
    } else {
      newSavedIds.add(strRecipeId);
    }
    set({ savedRecipeIds: newSavedIds });

    try {
      if (isSaved) {
        await unsaveRecipeApi(strRecipeId);
        toast.success("Recipe removed");
      } else {
        await saveRecipeApi(strRecipeId);
        toast.success("Recipe saved");
      }
    } catch (err) {
      set({ savedRecipeIds });
      toast.error(err.response?.data?.message || "Action failed");
    }
  },

  toggleLike: async (recipeId) => {
    if (!recipeId) return;
    const strRecipeId = String(recipeId);
    const { likedRecipeIds } = get();
    const isLiked = likedRecipeIds.has(strRecipeId);

    const newLikedIds = new Set(likedRecipeIds);
    if (isLiked) {
      newLikedIds.delete(strRecipeId);
    } else {
      newLikedIds.add(strRecipeId);
    }
    set({ likedRecipeIds: newLikedIds });

    try {
      if (isLiked) {
        await unlikeRecipeApi(strRecipeId);
        toast.success("Unliked");
      } else {
        await likeRecipeApi(strRecipeId);
        toast.success("Liked");
      }
    } catch (err) {
      const code = err.response?.data?.code;
      if (isLiked && code === "NOT_FOUND") {
        toast.success("Unliked");
      } else {
        set({ likedRecipeIds });
        toast.error(err.response?.data?.message || "Action failed");
      }
    }
  }
}));
