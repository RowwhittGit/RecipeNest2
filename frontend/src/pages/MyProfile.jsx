import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiGrid, FiBookmark, FiHeart, FiSettings, FiMessageCircle } from 'react-icons/fi';
import HomeNavbar from '../components/HomeNavbar';
import Footer from '../components/Footer';
import {
  getMyProfileApi,
  getMyRecipesApi,
  getFullSavedRecipesApi,
  getFullLikedRecipesApi,
} from '../api/recipeApi';

// ─── Avatar ────────────────────────────────────────────────────────────────────
function Avatar({ src, name }) {
  const initials = name
    ? name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '?';
  if (src) {
    return <img src={src} alt={name} className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-[3px] border-[#1e2d4a] shadow-md flex-shrink-0" />;
  }
  return (
    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#1e2d4a] flex items-center justify-center text-white text-3xl font-black flex-shrink-0 border-[3px] border-[#1e2d4a] shadow-md">
      {initials}
    </div>
  );
}

// ─── Stat Block ────────────────────────────────────────────────────────────────
function StatBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xl font-black text-[#1e2d4a]">{value ?? 0}</span>
      <span className="text-xs text-[#1e2d4a]/50 font-medium">{label}</span>
    </div>
  );
}

// ─── Recipe Grid Item ──────────────────────────────────────────────────────────
function RecipeGridItem({ recipe }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/recipes/${recipe._id}`)}
      className="relative aspect-square bg-[#f4f4f4] rounded-xl overflow-hidden cursor-pointer group border border-[#1e2d4a]/8 hover:shadow-lg transition-all duration-200"
    >
      {recipe.mainImage ? (
        <img src={recipe.mainImage} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-4xl bg-[#f5f3e8]">🍽️</div>
      )}
      <div className="absolute inset-0 bg-[#1e2d4a]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-5">
        <div className="flex items-center gap-1.5 text-white font-black text-sm">
          <FiHeart className="w-5 h-5 fill-white" />
          <span>{recipe.likeCount ?? 0}</span>
        </div>
        <div className="flex items-center gap-1.5 text-white font-black text-sm">
          <FiMessageCircle className="w-5 h-5 fill-white" />
          <span>{recipe.commentCount ?? 0}</span>
        </div>
      </div>
      {recipe.status === 'draft' && (
        <span className="absolute top-2 left-2 bg-[#1e2d4a]/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Draft</span>
      )}
    </div>
  );
}

// ─── Tabs ──────────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'recipes', label: 'My Recipes', icon: FiGrid },
  { id: 'saved',   label: 'Saved',      icon: FiBookmark },
  { id: 'liked',   label: 'Liked',      icon: FiHeart },
];

// ─── MyProfile ─────────────────────────────────────────────────────────────────
export default function MyProfilePage() {
  const navigate = useNavigate();

  // ── Profile state ─────────────────────────────────────────────────────────
  const [user, setUser]   = useState(null);
  const [stats, setStats] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError]     = useState(null);

  // ── Tab state ─────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('recipes');

  const [myRecipes,    setMyRecipes]    = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);

  const [tabLoading, setTabLoading] = useState(false);
  // Track which tabs have already been fetched
  const [fetched, setFetched] = useState({ recipes: false, saved: false, liked: false });

  // ── Fetch profile on mount ────────────────────────────────────────────────
  useEffect(() => {
    getMyProfileApi()
      .then(res => {
        setUser(res.data.data.user);
        setStats(res.data.data.stats);
      })
      .catch((err) => {
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          setProfileError('auth');
        } else {
          setProfileError('error');
        }
      })
      .finally(() => setProfileLoading(false));
  }, []);

  // ── Fetch tab data lazily ─────────────────────────────────────────────────
  useEffect(() => {
    if (fetched[activeTab]) return; // already loaded

    setTabLoading(true);

    const calls = {
      recipes: () => getMyRecipesApi().then(res => setMyRecipes(res.data.data || [])),
      saved:   () => getFullSavedRecipesApi().then(res => setSavedRecipes(res.data.data || [])),
      liked:   () => getFullLikedRecipesApi().then(res => setLikedRecipes(res.data.data || [])),
    };

    calls[activeTab]()
      .catch(() => {}) // fail silently per tab
      .finally(() => {
        setFetched(prev => ({ ...prev, [activeTab]: true }));
        setTabLoading(false);
      });
  }, [activeTab]);

  // ── Derived ───────────────────────────────────────────────────────────────
  const fullName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '';

  const tabContent = {
    recipes: myRecipes,
    saved:   savedRecipes,
    liked:   likedRecipes,
  };

  // ── Loading / Error ───────────────────────────────────────────────────────
  if (profileLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f5f3e8]">
        <HomeNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#1e2d4a]/20 border-t-[#1e2d4a] rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f5f3e8]">
        <HomeNavbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4">
          {profileError === 'auth' ? (
            <>
              <p className="text-[#1e2d4a] font-bold text-center">Please log in to view your profile.</p>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2.5 bg-[#1e2d4a] text-white font-bold text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Go to Login
              </button>
            </>
          ) : (
            <p className="text-red-500 font-bold text-center">Failed to load profile. Please try again.</p>
          )}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f3e8] flex flex-col">
      <HomeNavbar />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto">

          {/* ── PROFILE CARD ─────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#1e2d4a]/8 p-6 md:p-8 mb-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

              <Avatar src={user?.profileImage} name={fullName} />

              <div className="flex-1 text-center sm:text-left">
                {/* Username + actions */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 flex-wrap">
                  <h1 className="text-xl font-black text-[#1e2d4a]">{user?.username || 'unknown'}</h1>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <button className="px-4 py-1.5 border-2 border-[#1e2d4a]/20 text-[#1e2d4a] font-bold text-xs rounded-md hover:bg-[#1e2d4a]/5 transition-colors">
                      Edit Profile
                    </button>
                    <button
                      onClick={() => setActiveTab('recipes')}
                      className="px-4 py-1.5 bg-[#f5c518] text-[#1e2d4a] font-bold text-xs rounded-md hover:opacity-90 transition-opacity border-2 border-[#f5c518]"
                    >
                      See Drafts
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center text-[#1e2d4a]/40 hover:text-[#1e2d4a] transition-colors">
                      <FiSettings className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center sm:justify-start gap-8 mb-3">
                  <StatBlock value={stats?.recipeCount} label="recipes" />
                  <StatBlock value={user?.followerCount} label="followers" />
                  <StatBlock value={user?.followingCount} label="following" />
                </div>

                {/* Name + badge */}
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="font-bold text-[#1e2d4a] text-sm">{fullName}</span>
                  {user?.isProfessional && (
                    <span className="px-2 py-0.5 bg-[#f5c518] text-[#1e2d4a] text-[10px] font-black rounded-full">
                      Professional Chef
                    </span>
                  )}
                </div>

                {/* Bio */}
                {user?.biography ? (
                  <p className="text-sm text-[#1e2d4a]/60 leading-relaxed max-w-sm">{user.biography}</p>
                ) : (
                  <p className="text-sm text-[#1e2d4a]/30 italic">No bio yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* ── TABS ─────────────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#1e2d4a]/8 overflow-hidden">

            {/* Tab bar */}
            <div className="flex border-b border-[#1e2d4a]/8">
              {TABS.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-bold transition-all border-b-2 ${
                      activeTab === tab.id
                        ? 'border-[#1e2d4a] text-[#1e2d4a]'
                        : 'border-transparent text-[#1e2d4a]/40 hover:text-[#1e2d4a]/70'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Grid */}
            <div className="p-4 md:p-6">
              {tabLoading ? (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-4 border-[#1e2d4a]/20 border-t-[#1e2d4a] rounded-full animate-spin" />
                </div>
              ) : tabContent[activeTab].length > 0 ? (
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {tabContent[activeTab].map(r => <RecipeGridItem key={r._id} recipe={r} />)}
                </div>
              ) : (
                <div className="py-16 text-center text-[#1e2d4a]/40 font-semibold text-sm">
                  {activeTab === 'saved' ? 'No saved recipes yet.' : activeTab === 'liked' ? 'No liked recipes yet.' : 'No recipes yet.'}
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
