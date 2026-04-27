import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiGrid, FiBookmark, FiHeart, FiSettings, FiLogOut } from 'react-icons/fi';
import HomeNavbar from '../components/HomeNavbar';
import Footer from '../components/Footer';
import { ProfileAvatar, ProfileStatBlock, RecipeGridItem, UserListModal } from '../components/ProfileComponents';
import useAuthStore from '../store/authStore';
import {
  getMyProfileApi,
  getMyRecipesApi,
  getFullSavedRecipesApi,
  getFullLikedRecipesApi,
  getFollowersApi,
  getFollowingListApi,
} from '../api/recipeApi';

const TABS = [
  { id: 'recipes', label: 'My Recipes', icon: FiGrid },
  { id: 'saved',   label: 'Saved',      icon: FiBookmark },
  { id: 'liked',   label: 'Liked',      icon: FiHeart },
];

export default function MyProfilePage() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const [user, setUser]   = useState(null);
  const [stats, setStats] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError]     = useState(null);

  const [activeTab, setActiveTab] = useState('recipes');
  const [myRecipes,    setMyRecipes]    = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [tabLoading, setTabLoading] = useState(false);
  const [fetched, setFetched] = useState({ recipes: false, saved: false, liked: false });

  const [modal, setModal]           = useState(null);
  const [modalUsers, setModalUsers] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const settingsRef = useRef(null);

  // Close settings dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    setSettingsOpen(false);
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    getMyProfileApi()
      .then(res => { setUser(res.data.data.user); setStats(res.data.data.stats); })
      .catch((err) => {
        const status = err.response?.status;
        setProfileError(status === 401 || status === 403 ? 'auth' : 'error');
      })
      .finally(() => setProfileLoading(false));
  }, []);

  useEffect(() => {
    if (fetched[activeTab]) return;
    setTabLoading(true);
    const calls = {
      recipes: () => getMyRecipesApi().then(res => setMyRecipes(res.data.data || [])),
      saved:   () => getFullSavedRecipesApi().then(res => setSavedRecipes(res.data.data || [])),
      liked:   () => getFullLikedRecipesApi().then(res => setLikedRecipes(res.data.data || [])),
    };
    calls[activeTab]()
      .catch(() => {})
      .finally(() => { setFetched(prev => ({ ...prev, [activeTab]: true })); setTabLoading(false); });
  }, [activeTab]);

  const openModal = async (type) => {
    if (!user?._id) return;
    setModal(type);
    setModalUsers([]);
    setModalLoading(true);
    try {
      const res = type === 'followers'
        ? await getFollowersApi(user._id)
        : await getFollowingListApi(user._id);
      setModalUsers((res.data.data || []).filter(Boolean));
    } catch {
      setModalUsers([]);
    } finally {
      setModalLoading(false);
    }
  };

  const handleUserClick = (userId) => {
    setModal(null);
    navigate(`/profile/${userId}`);
  };

  const closeModal = () => { setModal(null); setModalUsers([]); };
  const fullName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '';
  const tabContent = { recipes: myRecipes, saved: savedRecipes, liked: likedRecipes };

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
              <button onClick={() => navigate('/login')} className="px-6 py-2.5 bg-[#1e2d4a] text-white font-bold text-sm rounded-md hover:opacity-90 transition-opacity">
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

      {modal && (
        <UserListModal
          title={modal === 'followers' ? 'Followers' : 'Following'}
          users={modalUsers}
          loading={modalLoading}
          onClose={closeModal}
          onUserClick={handleUserClick}
        />
      )}

      {/* Logout confirmation dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6 text-center">
            <p className="font-black text-[#1e2d4a] text-base mb-1">Log out?</p>
            <p className="text-[#1e2d4a]/50 text-sm mb-6">Are you sure you want to log out?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 border-2 border-[#1e2d4a]/20 text-[#1e2d4a] font-bold text-sm rounded-lg hover:bg-[#1e2d4a]/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 py-2.5 bg-red-500 text-white font-bold text-sm rounded-lg hover:bg-red-600 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto">

          <div className="bg-white rounded-2xl shadow-md border border-[#1e2d4a]/8 p-6 md:p-8 mb-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <ProfileAvatar src={user?.profileImage} name={fullName} />
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 flex-wrap">
                  <h1 className="text-xl font-black text-[#1e2d4a]">{user?.username || 'unknown'}</h1>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <button onClick={() => navigate('/my-profile/edit')} className="px-4 py-1.5 border-2 border-[#1e2d4a]/20 text-[#1e2d4a] font-bold text-xs rounded-md hover:bg-[#1e2d4a]/5 transition-colors">
                      Edit Profile
                    </button>
                    <button onClick={() => navigate('/recipes/create')} className="px-4 py-1.5 bg-[#f5c518] text-[#1e2d4a] font-bold text-xs rounded-md hover:opacity-90 transition-opacity border-2 border-[#f5c518]">
                      + Create
                    </button>
                    <div ref={settingsRef} className="relative">
                      <button
                        onClick={() => setSettingsOpen(o => !o)}
                        className="w-7 h-7 flex items-center justify-center text-[#1e2d4a]/40 hover:text-[#1e2d4a] transition-colors"
                      >
                        <FiSettings className="w-4 h-4" />
                      </button>
                      {settingsOpen && (
                        <div className="absolute right-0 top-9 bg-white rounded-xl shadow-lg border border-[#1e2d4a]/10 py-1 w-36 z-10">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <FiLogOut className="w-4 h-4" />
                            Log Out
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-8 mb-3">
                  <ProfileStatBlock value={stats?.recipeCount} label="recipes" />
                  <ProfileStatBlock value={user?.followerCount} label="followers" onClick={() => openModal('followers')} />
                  <ProfileStatBlock value={user?.followingCount} label="following" onClick={() => openModal('following')} />
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="font-bold text-[#1e2d4a] text-sm">{fullName}</span>
                  {user?.isProfessional && (
                    <span className="px-2 py-0.5 bg-[#f5c518] text-[#1e2d4a] text-[10px] font-black rounded-full">Professional Chef</span>
                  )}
                </div>
                {user?.biography
                  ? <p className="text-sm text-[#1e2d4a]/60 leading-relaxed max-w-sm">{user.biography}</p>
                  : <p className="text-sm text-[#1e2d4a]/30 italic">No bio yet.</p>
                }
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-[#1e2d4a]/8 overflow-hidden">
            <div className="flex border-b border-[#1e2d4a]/8">
              {TABS.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-bold transition-all border-b-2 ${
                      activeTab === tab.id ? 'border-[#1e2d4a] text-[#1e2d4a]' : 'border-transparent text-[#1e2d4a]/40 hover:text-[#1e2d4a]/70'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="p-4 md:p-6">
              {tabLoading ? (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-4 border-[#1e2d4a]/20 border-t-[#1e2d4a] rounded-full animate-spin" />
                </div>
              ) : tabContent[activeTab].length > 0 ? (
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {tabContent[activeTab].map(r => (
                    <RecipeGridItem
                      key={r._id}
                      recipe={r}
                      onEdit={activeTab === 'recipes' ? (id) => navigate(`/recipes/${id}/edit`) : undefined}
                    />
                  ))}
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
