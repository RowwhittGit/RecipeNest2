import { useNavigate } from 'react-router-dom';
import { FiClock, FiUsers, FiBookmark, FiHeart } from 'react-icons/fi';
import { useSocialStore } from '../store/socialStore';

const tagColors = {
  'Asian': '#fdd228',
  'Korean': '#fdd228',
  'American': '#fdd228',
  'Italian': '#fdd228',
  'Mexican': '#fdd228',
  'Japanese': '#fdd228',
  'Spicy': '#fdd228',
  'New': '#fdd228',
  'Popular': '#fdd228',
}

export default function RecipeCard({ _id, image, tag, title, time, servings }) {
  const navigate = useNavigate();
  const { savedRecipeIds, likedRecipeIds, toggleSave, toggleLike } = useSocialStore();
  const isSaved = savedRecipeIds.has(String(_id));
  const isLiked = likedRecipeIds.has(String(_id));

  const tagBg = tagColors[tag] || '#fdd228';

  const handleBookmark = (e) => {
    e.stopPropagation();
    toggleSave(_id);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    toggleLike(_id);
  };

  return (
    <div
      onClick={() => navigate(`/recipes/${_id}`)}
      className="bg-white rounded-md overflow-hidden border-[3px] border-[#2b3d63] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col p-2.5"
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-52 w-full bg-[#f4f4f4] overflow-hidden">
        {/* Bookmark Icon */}
        <div
          onClick={handleBookmark}
          className="absolute top-2 left-2 z-10 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <FiBookmark className={`w-4 h-4 transition-colors ${isSaved ? 'fill-[#2b3d63] text-[#2b3d63]' : 'text-[#2b3d63]'}`} />
        </div>

        {/* Like Icon */}
        <div
          onClick={handleLike}
          className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <FiHeart className={`w-4 h-4 transition-colors ${isLiked ? 'fill-[#e53e3e] text-[#e53e3e]' : 'text-[#2b3d63]'}`} />
        </div>

        {/* Category Tag */}
        {tag && (
          <span
            className="absolute bottom-2 left-2 z-10 rounded-full px-3 py-1 text-xs font-bold text-[#2b3d63] border-2 border-[#2b3d63]"
            style={{ backgroundColor: tagBg }}
          >
            {tag}
          </span>
        )}

        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-[#f4f4f4] flex items-center justify-center text-4xl">🍽️</div>
        )}
      </div>

      {/* Info Container */}
      <div className="pt-5 pb-2 px-2 text-center flex-1 flex flex-col justify-between bg-white">
        <h3 className="text-[#2b3d63] font-bold text-[1.1rem] mb-4 leading-snug line-clamp-2">{title}</h3>
        <div className="flex items-center justify-center gap-6 text-[#2b3d63]/70 text-sm">
          {time && (
            <div className="flex items-center gap-1.5">
              <FiClock className="w-4 h-4 text-[#2b3d63]" />
              <span>{time}</span>
            </div>
          )}
          {servings && (
            <div className="flex items-center gap-1.5">
              <FiUsers className="w-4 h-4 text-[#2b3d63]" />
              <span>{servings}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}