import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiUserPlus, FiUserCheck } from 'react-icons/fi';
import HomeNavbar from '../components/HomeNavbar';
import Footer from '../components/Footer';
import { ProfileAvatar, ProfileStatBlock, RecipeGridItem, UserListModal } from '../components/ProfileComponents';
import { getUserProfileApi, getRecipesByUserApi, getFollowersApi, getFollowingListApi } from '../api/recipeApi';
import { useSocialStore } from '../store/socialStore';

export default function ViewProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { followingIds, toggleFollow } = useSocialStore();

  const [user, setUser]               = useState(null);
  const [recipeCount, setRecipeCount] = useState(0);
  const [recipes, setRecipes]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [recipesLoading, setRecipesLoading] = useState(false);

  const [modal, setModal]           = useState(null);
  const [modalUsers, setModalUsers] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  const isFollowing = followingIds.has(String(userId));

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getUserProfileApi(userId)
      .then(res => { setUser(res.data.data.user); setRecipeCount(res.data.data.recipeCount); })
      .catch(() => setError('Failed to load profile.'))
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    setRecipesLoading(true);
    getRecipesByUserApi(userId)
      .then(res => setRecipes(res.data.data || []))
      .catch(() => {})
      .finally(() => setRecipesLoading(false));
  }, [userId]);

  const openModal = async (type) => {
    if (!userId) return;
    setModal(type);
    setModalUsers([]);
    setModalLoading(true);
    try {
      const res = type === 'followers'
        ? await getFollowersApi(userId)
        : await getFollowingListApi(userId);
      setModalUsers((res.data.data || []).filter(Boolean));
    } catch {
      setModalUsers([]);
    } finally {
      setModalLoading(false);
    }
  };

  const handleUserClick = (uid) => {
    setModal(null);
    navigate(`/profile/${uid}`);
  };

  const closeModal = () => { setModal(null); setModalUsers([]); };
  const fullName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '';

  if (loading) {
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

  if (error || !user) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f5f3e8]">
        <HomeNavbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500 font-bold">{error || 'User not found.'}</p>
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

      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto">

          {/* ── PROFILE CARD ─────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-md border border-[#1e2d4a]/8 p-6 md:p-8 mb-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <ProfileAvatar src={user.profileImage} name={fullName} />
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 flex-wrap">
                  <h1 className="text-xl font-black text-[#1e2d4a]">{user.username || 'unknown'}</h1>
                  <button
                    onClick={() => toggleFollow(userId)}
                    className={`flex items-center gap-1.5 px-4 py-1.5 font-bold text-xs rounded-md transition-colors border-2 ${
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
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-8 mb-3">
                  <ProfileStatBlock value={recipeCount} label="recipes" />
                  <ProfileStatBlock value={user.followerCount} label="followers" onClick={() => openModal('followers')} />
                  <ProfileStatBlock value={user.followingCount} label="following" onClick={() => openModal('following')} />
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="font-bold text-[#1e2d4a] text-sm">{fullName}</span>
                  {user.isProfessional && (
                    <span className="px-2 py-0.5 bg-[#f5c518] text-[#1e2d4a] text-[10px] font-black rounded-full">Professional Chef</span>
                  )}
                </div>
                {user.biography
                  ? <p className="text-sm text-[#1e2d4a]/60 leading-relaxed max-w-sm">{user.biography}</p>
                  : <p className="text-sm text-[#1e2d4a]/30 italic">No bio yet.</p>
                }
              </div>
            </div>
          </div>

          {/* ── RECIPES GRID ─────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-md border border-[#1e2d4a]/8 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#1e2d4a]/8">
              <span className="text-xs font-black text-[#1e2d4a] tracking-wide uppercase">Recipes</span>
            </div>
            <div className="p-4 md:p-6">
              {recipesLoading ? (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-4 border-[#1e2d4a]/20 border-t-[#1e2d4a] rounded-full animate-spin" />
                </div>
              ) : recipes.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {recipes.map(r => <RecipeGridItem key={r._id} recipe={r} />)}
                </div>
              ) : (
                <div className="py-16 text-center text-[#1e2d4a]/40 font-semibold text-sm">No recipes yet.</div>
              )}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
