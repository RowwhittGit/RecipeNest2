import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiMessageCircle, FiX, FiEdit2 } from 'react-icons/fi';

// ─── ProfileAvatar ─────────────────────────────────────────────────────────────
export function ProfileAvatar({ src, name }) {
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

// ─── ProfileStatBlock ──────────────────────────────────────────────────────────
export function ProfileStatBlock({ value, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center ${onClick ? 'cursor-pointer hover:opacity-70 transition-opacity' : 'cursor-default'}`}
    >
      <span className="text-xl font-black text-[#1e2d4a]">{value ?? 0}</span>
      <span className="text-xs text-[#1e2d4a]/50 font-medium">{label}</span>
    </button>
  );
}

// ─── RecipeGridItem ────────────────────────────────────────────────────────────
export function RecipeGridItem({ recipe, onEdit }) {
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
      {/* Edit button — only shown when onEdit is provided */}
      {onEdit && (
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(recipe._id); }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
        >
          <FiEdit2 className="w-3.5 h-3.5 text-[#1e2d4a]" />
        </button>
      )}
      {recipe.status === 'draft' && (
        <span className="absolute top-2 left-2 bg-[#1e2d4a]/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Draft</span>
      )}
    </div>
  );
}

// ─── UserListModal ─────────────────────────────────────────────────────────────
// onUserClick: optional — if provided, clicking a user row navigates to their profile
export function UserListModal({ title, users, loading, onClose, onUserClick }) {
  const overlayRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e2d4a]/8">
          <h3 className="font-black text-[#1e2d4a] text-base">{title}</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center text-[#1e2d4a]/40 hover:text-[#1e2d4a] transition-colors">
            <FiX className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-80">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-7 h-7 border-4 border-[#1e2d4a]/20 border-t-[#1e2d4a] rounded-full animate-spin" />
            </div>
          ) : users.length === 0 ? (
            <p className="text-center text-[#1e2d4a]/40 text-sm font-medium py-10">No users yet.</p>
          ) : (
            <ul className="divide-y divide-[#1e2d4a]/6">
              {users.map((u) => {
                const name = `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Unknown';
                const initials = name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase();
                return (
                  <li
                    key={u._id}
                    onClick={() => onUserClick?.(u._id)}
                    className={`flex items-center gap-3 px-5 py-3 hover:bg-[#f5f3e8] transition-colors ${onUserClick ? 'cursor-pointer' : ''}`}
                  >
                    {u.profileImage ? (
                      <img src={u.profileImage} alt={name} className="w-10 h-10 rounded-full object-cover border-2 border-[#1e2d4a]/10 flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#1e2d4a] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {initials}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#1e2d4a] text-sm truncate">{name}</p>
                      <p className="text-[#1e2d4a]/40 text-xs truncate">@{u.username || '—'}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
