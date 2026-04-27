import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUserPlus, FiUserCheck } from 'react-icons/fi';
import HomeNavbar from '../components/HomeNavbar';
import Footer from '../components/Footer';
import { getChefsApi } from '../api/recipeApi';
import { useSocialStore } from '../store/socialStore';
import useAuthStore from '../store/authStore';

// ─── Chef Avatar ───────────────────────────────────────────────────────────────
function ChefAvatar({ src, name }) {
  const initials = name
    ? name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '?';
  if (src) {
    return <img src={src} alt={name} className="w-16 h-16 rounded-full object-cover border-[3px] border-[#1e2d4a] flex-shrink-0" />;
  }
  return (
    <div className="w-16 h-16 rounded-full bg-[#1e2d4a] flex items-center justify-center text-white text-xl font-black flex-shrink-0 border-[3px] border-[#1e2d4a]">
      {initials}
    </div>
  );
}

// ─── Chef Card ─────────────────────────────────────────────────────────────────
function ChefCard({ chef }) {
  const navigate = useNavigate();
  const { followingIds, toggleFollow } = useSocialStore();
  const { user } = useAuthStore();

  const isFollowing = followingIds.has(String(chef._id));
  const fullName = `${chef.firstName || ''} ${chef.lastName || ''}`.trim() || 'Unknown';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#1e2d4a]/8 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
      {/* Avatar — click to view profile */}
      <button onClick={() => navigate(`/profile/${chef._id}`)} className="flex-shrink-0">
        <ChefAvatar src={chef.profileImage} name={fullName} />
      </button>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          <button
            onClick={() => navigate(`/profile/${chef._id}`)}
            className="font-black text-[#1e2d4a] text-base hover:opacity-70 transition-opacity truncate"
          >
            {fullName}
          </button>
          {chef.isProfessional && (
            <span className="px-2 py-0.5 bg-[#f5c518] text-[#1e2d4a] text-[10px] font-black rounded-full flex-shrink-0">
              Pro Chef
            </span>
          )}
        </div>
        <p className="text-[#1e2d4a]/50 text-xs mb-1">@{chef.username}</p>
        {chef.biography ? (
          <p className="text-[#1e2d4a]/60 text-xs line-clamp-2 leading-relaxed">{chef.biography}</p>
        ) : null}
        <p className="text-[#1e2d4a]/40 text-xs mt-1 font-semibold">
          {chef.recipeCount} {chef.recipeCount === 1 ? 'recipe' : 'recipes'} · {chef.followerCount ?? 0} followers
        </p>
      </div>

      {/* Follow button — only for logged-in users, hide own profile */}
      {user && user._id !== chef._id.toString() && (
        <button
          onClick={() => toggleFollow(chef._id)}
          className={`flex items-center gap-1.5 px-4 py-1.5 font-bold text-xs rounded-md transition-colors border-2 flex-shrink-0 ${
            isFollowing
              ? 'border-[#1e2d4a]/20 text-[#1e2d4a] hover:bg-[#1e2d4a]/5'
              : 'bg-[#1e2d4a] border-[#1e2d4a] text-white hover:opacity-90'
          }`}
        >
          {isFollowing
            ? <><FiUserCheck className="w-3.5 h-3.5" /> Following</>
            : <><FiUserPlus className="w-3.5 h-3.5" /> Follow</>
          }
        </button>
      )}
    </div>
  );
}

// ─── ChefList ──────────────────────────────────────────────────────────────────
export default function ChefListPage() {
  const [chefs, setChefs]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    getChefsApi()
      .then(res => setChefs(res.data.data || []))
      .catch(() => setError('Failed to load chefs.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f3e8] flex flex-col">
      <HomeNavbar />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-black text-[#1e2d4a]">Chef List</h1>
            <p className="text-sm text-[#1e2d4a]/50 mt-1">Top recipe creators on recipeNest</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#1e2d4a]/20 border-t-[#1e2d4a] rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-500 font-bold">{error}</div>
          ) : chefs.length === 0 ? (
            <div className="text-center py-20 text-[#1e2d4a]/40 font-semibold">No chefs found.</div>
          ) : (
            <div className="flex flex-col gap-3">
              {chefs.map((chef, index) => (
                <div key={chef._id} className="flex items-center gap-3">
                  {/* Rank number */}
                  <span className="w-7 text-right text-sm font-black text-[#1e2d4a]/30 flex-shrink-0">
                    #{index + 1}
                  </span>
                  <div className="flex-1">
                    <ChefCard chef={chef} />
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
