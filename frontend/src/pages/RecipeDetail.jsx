import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiClock, FiHeart, FiBookmark, FiShare2, FiMessageCircle, FiUserPlus, FiUsers } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';

import HomeNavbar from '../components/HomeNavbar';
import Footer from '../components/Footer';

import { getRecipeByIdApi } from '../api/recipeApi';
import { useRecipeInteractionStore } from '../store/recipeInteractionStore';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [likeCount, setLikeCount] = useState(0); 
  const [commentText, setCommentText] = useState('');

  const {
    isLiked,
    isSaved,
    isFollowing,
    initialize,
    toggleLike,
    toggleSave,
    toggleFollow
  } = useRecipeInteractionStore();

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getRecipeByIdApi(id);
        if (res.data?.data) {
          const { recipe: fetchedRecipe, isLiked: apiIsLiked, isSaved: apiIsSaved } = res.data.data;
          setRecipe(fetchedRecipe);
          
          setLikeCount(fetchedRecipe.likeCount || 0);

          // Initialise store states
          initialize(apiIsLiked, apiIsSaved, false); // Initialize everything
        } else {
          setError('Recipe data missing from response.');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch recipe.');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchRecipe();
    }
  }, [id, initialize]);

  const handleLike = () => {
    toggleLike(id);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    toggleSave(id);
  };

  const handleFollow = () => {
    if (recipe?.authorId?._id) {
      toggleFollow(recipe.authorId._id);
    }
  };

  const handleShare = () => {
    alert("Link copied to clipboard!");
  };

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

  const authorName = recipe.authorId ? `${recipe.authorId.firstName || ''} ${recipe.authorId.lastName || ''}`.trim() : 'Unknown';
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col">
      <Toaster position="top-right" />
      <HomeNavbar />
      
      <main className="flex-1 py-10 md:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-8 text-[#2b3d63] hover:text-[#fdd228] transition-colors font-bold text-sm tracking-wide flex items-center gap-2"
          >
            ← Back to Recipes
          </button>

          {/* Recipe Card container */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border-[3px] border-[#2b3d63]">
            
            {/* HERO SECTION */}
            <div className="relative h-64 md:h-80 bg-[#f4f4f4]">
              {recipe.mainImage ? (
                <img
                  src={recipe.mainImage}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
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
              
              {/* Title & Bookmark Row */}
              <div className="flex items-start justify-between mb-3">
                <h1 className="text-2xl md:text-4xl font-bold text-[#2b3d63] leading-snug">
                  {recipe.title}
                </h1>
                
                <button
                  onClick={handleSave}
                  className={`p-3 rounded-full transition-colors border-2 flex-shrink-0 ml-4 ${
                    isSaved
                      ? 'bg-[#fdd228] border-[#2b3d63]'
                      : 'bg-[#f5f5f0] border-transparent hover:bg-gray-200'
                  }`}
                >
                  <FiBookmark className={`w-5 h-5 ${isSaved ? 'fill-[#2b3d63] text-[#2b3d63]' : 'text-[#2b3d63]'}`} />
                </button>
              </div>

              {/* Recipe Meta */}
              <div className="flex flex-wrap items-center gap-6 text-[#2b3d63]/80 mb-8 font-medium text-sm">
                {totalTime > 0 && (
                  <div className="flex items-center gap-2">
                    <FiClock className="w-4 h-4" />
                    <span>{totalTime} min</span>
                  </div>
                )}
                {recipe.difficulty && (
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path><line x1="6" y1="17" x2="18" y2="17"></line></svg>
                    <span>{recipe.difficulty}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <FiUsers className="w-4 h-4" />
                  <span>{recipe.viewCount || 0} views</span>
                </div>
              </div>

              {/* Author Profile Block */}
              <div className="mb-8 bg-[#f5f5f0] p-4 md:p-6 rounded-xl border border-[#2b3d63]/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${authorName}`}
                    alt={authorName}
                    className="w-14 h-14 rounded-full border-2 border-[#2b3d63]"
                  />
                  <div>
                    <h3 className="font-bold text-[#2b3d63] text-lg">{authorName}</h3>
                    <p className="text-[#2b3d63]/60 text-sm mb-1">@{recipe.authorId?.username || authorName.toLowerCase().replace(' ', '_')}</p>
                    <span className="inline-block px-3 py-0.5 bg-[#fdd228] text-[#2b3d63] text-xs font-bold rounded-full">
                      Professional Chef
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleFollow}
                  className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-colors ${
                    isFollowing
                      ? 'bg-[#2b3d63]/10 text-[#2b3d63] hover:bg-[#2b3d63]/20'
                      : 'bg-[#fdd228] text-[#2b3d63] hover:bg-[#edc31f]'
                  }`}
                >
                  <FiUserPlus className="w-4 h-4" />
                  {isFollowing ? 'Following' : 'Follow Chef'}
                </button>
              </div>

              {/* DESCRIPTION */}
              {recipe.description && (
                <div className="mb-6 lg:pr-10">
                  <p className="text-base text-[#2b3d63]/80 leading-relaxed">
                    {recipe.description}
                  </p>
                </div>
              )}

              {/* ENGAGEMENT PILLS */}
              <div className="flex items-center gap-4 mb-10 pb-8 border-b border-[#2b3d63]/10">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-colors ${
                    isLiked ? 'bg-[#fdd228] text-[#2b3d63]' : 'bg-[#f5f5f0] text-[#2b3d63] hover:bg-[#e8e8e3]'
                  }`}
                >
                  <FiHeart className={`w-4 h-4 ${isLiked ? 'fill-[#2b3d63]' : ''}`} />
                  <span>{likeCount}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-5 py-2 bg-[#f5f5f0] hover:bg-[#e8e8e3] text-[#2b3d63] rounded-full font-semibold transition-colors"
                >
                  <FiShare2 className="w-4 h-4" />
                  <span>{recipe.shareCount || 0}</span>
                </button>

                <button className="flex items-center gap-2 px-5 py-2 bg-[#f5f5f0] hover:bg-[#e8e8e3] text-[#2b3d63] rounded-full font-semibold transition-colors">
                  <FiMessageCircle className="w-4 h-4" />
                  <span>{recipe.commentCount || 0}</span>
                </button>
              </div>

              {/* INGREDIENTS */}
              {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-[#2b3d63] mb-5 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-[#fdd228] rounded"></span>
                    Ingredients
                  </h2>
                  <ul className="space-y-3">
                    {recipe.ingredients
                      .sort((a, b) => a.order - b.order)
                      .map((item) => (
                      <li key={item._id || item.order} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-[#2b3d63]/40 rounded-full mt-2.5 flex-shrink-0"></span>
                        <span className="text-base text-[#2b3d63]/80">{item.ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* INSTRUCTIONS */}
              {recipe.steps && recipe.steps.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-[#2b3d63] mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-[#fdd228] rounded"></span>
                    Instructions
                  </h2>
                  <ol className="space-y-6">
                    {recipe.steps
                      .sort((a, b) => a.order - b.order)
                      .map((step) => (
                      <li key={step._id || step.order} className="flex gap-5">
                        <span className="min-w-[2rem] w-8 h-8 rounded-full bg-[#2b3d63] text-white flex items-center justify-center font-bold flex-shrink-0 text-sm">
                          {step.order}
                        </span>
                        <p className="text-base text-[#2b3d63]/80 leading-relaxed pt-1">
                          {step.instruction}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* COMMENTS BOX */}
              <div className="mb-4 mt-8 pt-8 border-t border-[#2b3d63]/10">
                <h2 className="text-xl font-bold text-[#2b3d63] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#fdd228] rounded"></span>
                  Comments ({recipe.commentCount || 0})
                </h2>

                <div className="bg-[#f5f5f0] p-4 rounded-xl border border-[#2b3d63]/10">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Share your thoughts about this recipe..."
                    className="w-full p-4 border border-[#2b3d63]/20 rounded-lg focus:border-[#fdd228] focus:outline-none resize-none bg-[#f5f5f0] text-sm text-[#2b3d63]"
                    rows={3}
                  />
                  <button
                    onClick={() => {
                      if (commentText.trim()) { setCommentText(''); alert('Comment added!'); }
                    }}
                    className="mt-3 px-6 py-2.5 bg-[#2b3d63] hover:bg-[#1f2d4a] text-white rounded-full font-bold text-sm transition-colors"
                  >
                    Post Comment
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
