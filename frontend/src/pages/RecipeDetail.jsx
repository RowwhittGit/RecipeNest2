import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiClock, FiHeart, FiBookmark, FiShare2, FiMessageCircle, FiUserPlus, FiUsers, FiCornerDownRight } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import HomeNavbar from '../components/HomeNavbar';
import Footer from '../components/Footer';

import { getRecipeByIdApi, getCommentsApi, addCommentApi } from '../api/recipeApi';
import { useSocialStore } from '../store/socialStore';
import useAuthStore from '../store/authStore';

// ─── Avatar ────────────────────────────────────────────────────────────────────
function Avatar({ src, name, size = 'md' }) {
  const dim = size === 'sm' ? 'w-8 h-8 text-xs' : size === 'lg' ? 'w-14 h-14 text-base' : 'w-10 h-10 text-sm';
  const initials = name ? name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?';
  if (src) {
    return <img src={src} alt={name} className={`${dim} rounded-full object-cover border-2 border-[#2b3d63] flex-shrink-0`} />;
  }
  return (
    <div className={`${dim} rounded-full bg-[#2b3d63] flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}

// ─── CommentItem ───────────────────────────────────────────────────────────────
function CommentItem({ comment, recipeId, onReplyAdded, depth = 0 }) {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuthStore();

  const authorName = comment.userId
    ? `${comment.userId.firstName || ''} ${comment.userId.lastName || ''}`.trim() || 'Unknown'
    : 'Unknown';

  const handleReply = async () => {
    if (!replyText.trim()) return;
    if (!user) { toast.error('Please log in to reply'); return; }
    setSubmitting(true);
    try {
      await addCommentApi(recipeId, { text: replyText.trim(), parentComment: comment._id });
      setReplyText('');
      setReplying(false);
      toast.success('Reply added');
      onReplyAdded(); // refetch full tree
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add reply');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={depth > 0 ? 'ml-8 border-l-2 border-[#2b3d63]/10 pl-4' : ''}>
      <div className="flex gap-3 mb-2">
        <Avatar src={comment.userId?.profileImage} name={authorName} size={depth > 0 ? 'sm' : 'md'} />
        <div className="flex-1">
          <div className="bg-[#f5f5f0] rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-bold text-[#2b3d63] text-sm">{authorName}</span>
              {comment.userId?.username && (
                <span className="text-[#2b3d63]/40 text-xs">@{comment.userId.username}</span>
              )}
              <span className="text-[#2b3d63]/30 text-xs ml-auto">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-[#2b3d63]/80 leading-relaxed">{comment.text}</p>
          </div>

          {depth < 3 && (
            <button
              onClick={() => setReplying(r => !r)}
              className="mt-1 ml-1 text-xs text-[#2b3d63]/50 hover:text-[#2b3d63] font-semibold flex items-center gap-1 transition-colors"
            >
              <FiCornerDownRight className="w-3 h-3" />
              {replying ? 'Cancel' : 'Reply'}
            </button>
          )}

          {replying && (
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleReply(); } }}
                placeholder="Write a reply..."
                autoFocus
                className="flex-1 px-3 py-2 text-sm border border-[#2b3d63]/20 rounded-full focus:border-[#fdd228] focus:outline-none bg-white text-[#2b3d63]"
              />
              <button
                onClick={handleReply}
                disabled={submitting || !replyText.trim()}
                className="px-4 py-2 bg-[#2b3d63] text-white rounded-full text-xs font-bold hover:bg-[#1f2d4a] disabled:opacity-50 transition-colors"
              >
                {submitting ? '...' : 'Post'}
              </button>
            </div>
          )}
        </div>
      </div>

      {comment.replies?.length > 0 && (
        <div className="space-y-3 mt-1">
          {comment.replies.map(reply => (
            <CommentItem
              key={reply._id}
              comment={reply}
              recipeId={recipeId}
              onReplyAdded={onReplyAdded}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── RecipeDetail ──────────────────────────────────────────────────────────────
export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likeCount, setLikeCount] = useState(0);

  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { likedRecipeIds, savedRecipeIds, followingIds, toggleLike, toggleSave, toggleFollow } = useSocialStore();

  const isLiked = likedRecipeIds.has(String(id));
  const isSaved = savedRecipeIds.has(String(id));
  const isFollowing = recipe?.authorId?._id ? followingIds.has(String(recipe.authorId._id)) : false;

  // ── Fetch recipe ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getRecipeByIdApi(id)
      .then(res => {
        const { recipe: r } = res.data.data;
        setRecipe(r);
        setLikeCount(r.likeCount || 0);
      })
      .catch(err => setError(err.response?.data?.message || 'Failed to fetch recipe.'))
      .finally(() => setLoading(false));
  }, [id]);

  // ── Fetch comments ────────────────────────────────────────────────────────
  const fetchComments = async () => {
    setCommentsLoading(true);
    try {
      const res = await getCommentsApi(id);
      setComments(res.data?.data || []);
    } catch {
      // non-critical
    } finally {
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchComments();
  }, [id]);

  // ── Post top-level comment ────────────────────────────────────────────────
  const handlePostComment = async () => {
    if (!commentText.trim()) return;
    if (!user) { toast.error('Please log in to comment'); return; }
    setSubmitting(true);
    try {
      await addCommentApi(id, { text: commentText.trim() });
      setCommentText('');
      setRecipe(prev => ({ ...prev, commentCount: (prev.commentCount || 0) + 1 }));
      toast.success('Comment added');
      fetchComments(); // refetch full tree to stay consistent
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = () => {
    if (!user) { toast.error('Please log in to like'); return; }
    toggleLike(id);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  // ── Loading / Error states ────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f5f5f0]">
        <HomeNavbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#2b3d63]/20 border-t-[#2b3d63] rounded-full animate-spin mb-4" />
          <p className="text-xl font-bold text-[#2b3d63]">Loading recipe...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f5f5f0]">
        <HomeNavbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <p className="text-xl font-bold text-red-500 mb-6">{error || 'Recipe not found'}</p>
          <button onClick={() => navigate('/home')} className="px-6 py-2.5 bg-[#2b3d63] text-white rounded-full font-bold shadow-md hover:bg-[#1f2d4a]">
            Back to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const authorName = recipe.authorId
    ? `${recipe.authorId.firstName || ''} ${recipe.authorId.lastName || ''}`.trim() || 'Unknown'
    : 'Unknown';
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col">
      <Toaster position="top-right" />
      <HomeNavbar />

      <main className="flex-1 py-10 md:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 text-[#2b3d63] hover:text-[#fdd228] transition-colors font-bold text-sm tracking-wide flex items-center gap-2"
          >
            ← Back to Recipes
          </button>

          <div className="bg-white rounded-xl shadow-md overflow-hidden border-[3px] border-[#2b3d63]">

            {/* HERO */}
            <div className="relative h-64 md:h-80 bg-[#f4f4f4]">
              {recipe.mainImage ? (
                <img src={recipe.mainImage} alt={recipe.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl">🍽️</div>
              )}
              {recipe.cuisineType && (
                <div className="absolute top-4 right-4 bg-[#fdd228] px-4 py-1.5 rounded-full text-xs font-black tracking-wide text-[#2b3d63] border-[2px] border-[#2b3d63] shadow-sm">
                  {recipe.cuisineType}
                </div>
              )}
            </div>

            <div className="p-6 md:p-10">

              {/* Title & Bookmark */}
              <div className="flex items-start justify-between mb-3">
                <h1 className="text-2xl md:text-4xl font-bold text-[#2b3d63] leading-snug">{recipe.title}</h1>
                <button
                  onClick={() => toggleSave(id)}
                  className={`p-3 rounded-full transition-colors border-2 flex-shrink-0 ml-4 ${isSaved ? 'bg-[#fdd228] border-[#2b3d63]' : 'bg-[#f5f5f0] border-transparent hover:bg-gray-200'}`}
                >
                  <FiBookmark className={`w-5 h-5 ${isSaved ? 'fill-[#2b3d63] text-[#2b3d63]' : 'text-[#2b3d63]'}`} />
                </button>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-[#2b3d63]/80 mb-8 font-medium text-sm">
                {totalTime > 0 && (
                  <div className="flex items-center gap-2">
                    <FiClock className="w-4 h-4" />
                    <span>{totalTime} min</span>
                  </div>
                )}
                {recipe.difficulty && (
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" /><line x1="6" y1="17" x2="18" y2="17" /></svg>
                    <span>{recipe.difficulty}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <FiUsers className="w-4 h-4" />
                  <span>{recipe.viewCount || 0} views</span>
                </div>
              </div>

              {/* Author */}
              <div className="mb-8 bg-[#f5f5f0] p-4 md:p-6 rounded-xl border border-[#2b3d63]/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar src={recipe.authorId?.profileImage} name={authorName} size="lg" />
                  <div>
                    <h3 className="font-bold text-[#2b3d63] text-lg">{authorName}</h3>
                    <p className="text-[#2b3d63]/60 text-sm mb-1">@{recipe.authorId?.username || ''}</p>
                    {recipe.authorId?.isProfessional && (
                      <span className="inline-block px-3 py-0.5 bg-[#fdd228] text-[#2b3d63] text-xs font-bold rounded-full">
                        Professional Chef
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => recipe?.authorId?._id && toggleFollow(recipe.authorId._id)}
                  className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-colors flex-shrink-0 ${isFollowing ? 'bg-[#2b3d63]/10 text-[#2b3d63] hover:bg-[#2b3d63]/20' : 'bg-[#fdd228] text-[#2b3d63] hover:bg-[#edc31f]'}`}
                >
                  <FiUserPlus className="w-4 h-4" />
                  {isFollowing ? 'Following' : 'Follow Chef'}
                </button>
              </div>

              {/* Description */}
              {recipe.description && (
                <div className="mb-6 lg:pr-10">
                  <p className="text-base text-[#2b3d63]/80 leading-relaxed">{recipe.description}</p>
                </div>
              )}

              {/* Engagement */}
              <div className="flex items-center gap-4 mb-10 pb-8 border-b border-[#2b3d63]/10">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-colors ${isLiked ? 'bg-red-50 text-[#e53e3e]' : 'bg-[#f5f5f0] text-[#2b3d63] hover:bg-[#e8e8e3]'}`}
                >
                  <FiHeart className={`w-4 h-4 ${isLiked ? 'fill-[#e53e3e]' : ''}`} />
                  <span>{likeCount}</span>
                </button>
                <button
                  onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success('Link copied!'); }}
                  className="flex items-center gap-2 px-5 py-2 bg-[#f5f5f0] hover:bg-[#e8e8e3] text-[#2b3d63] rounded-full font-semibold transition-colors"
                >
                  <FiShare2 className="w-4 h-4" />
                  <span>{recipe.shareCount || 0}</span>
                </button>
                <div className="flex items-center gap-2 px-5 py-2 bg-[#f5f5f0] text-[#2b3d63] rounded-full font-semibold">
                  <FiMessageCircle className="w-4 h-4" />
                  <span>{recipe.commentCount || 0}</span>
                </div>
              </div>

              {/* Ingredients */}
              {recipe.ingredients?.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-[#2b3d63] mb-5 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-[#fdd228] rounded" />
                    Ingredients
                  </h2>
                  <ul className="space-y-3">
                    {[...recipe.ingredients].sort((a, b) => a.order - b.order).map((item) => (
                      <li key={item._id || item.order} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-[#2b3d63]/40 rounded-full mt-2.5 flex-shrink-0" />
                        <span className="text-base text-[#2b3d63]/80">{item.ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Instructions */}
              {recipe.steps?.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-[#2b3d63] mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-[#fdd228] rounded" />
                    Instructions
                  </h2>
                  <ol className="space-y-6">
                    {[...recipe.steps].sort((a, b) => a.order - b.order).map((step) => (
                      <li key={step._id || step.order} className="flex gap-5">
                        <span className="min-w-[2rem] w-8 h-8 rounded-full bg-[#2b3d63] text-white flex items-center justify-center font-bold flex-shrink-0 text-sm">
                          {step.order}
                        </span>
                        <p className="text-base text-[#2b3d63]/80 leading-relaxed pt-1">{step.instruction}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* COMMENTS */}
              <div className="mt-8 pt-8 border-t border-[#2b3d63]/10">
                <h2 className="text-xl font-bold text-[#2b3d63] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#fdd228] rounded" />
                  Comments ({recipe.commentCount || 0})
                </h2>

                {/* Add comment box */}
                <div className="bg-[#f5f5f0] p-4 rounded-xl border border-[#2b3d63]/10 mb-8">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={user ? 'Share your thoughts about this recipe...' : 'Log in to leave a comment'}
                    disabled={!user}
                    className="w-full p-4 border border-[#2b3d63]/20 rounded-lg focus:border-[#fdd228] focus:outline-none resize-none bg-white text-sm text-[#2b3d63] disabled:opacity-60 disabled:cursor-not-allowed"
                    rows={3}
                  />
                  <button
                    onClick={handlePostComment}
                    disabled={submitting || !commentText.trim() || !user}
                    className="mt-3 px-6 py-2.5 bg-[#2b3d63] hover:bg-[#1f2d4a] text-white rounded-full font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Posting...' : 'Post Comment'}
                  </button>
                </div>

                {/* Comment list */}
                {commentsLoading ? (
                  <div className="text-center py-6 text-[#2b3d63]/50 text-sm font-medium">Loading comments...</div>
                ) : comments.length === 0 ? (
                  <div className="text-center py-6 text-[#2b3d63]/40 text-sm font-medium">No comments yet. Be the first!</div>
                ) : (
                  <div className="space-y-5">
                    {comments.map(comment => (
                      <CommentItem
                        key={comment._id}
                        comment={comment}
                        recipeId={id}
                        onReplyAdded={fetchComments}
                        depth={0}
                      />
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
