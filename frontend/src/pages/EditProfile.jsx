import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import HomeNavbar from '../components/HomeNavbar';
import { getMyProfileApi, updateProfileApi, uploadAvatarApi } from '../api/recipeApi';

const BIO_MAX = 150;

// ─── Field Row ─────────────────────────────────────────────────────────────────
function FieldRow({ label, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-3 py-5 border-b border-[#1e2d4a]/8 last:border-0">
      <label className="sm:w-32 sm:text-right text-sm font-bold text-[#1e2d4a] pt-2.5 flex-shrink-0">
        {label}
      </label>
      <div className="flex-1">{children}</div>
    </div>
  );
}

const inputClass =
  'w-full px-3 py-2.5 border border-[#1e2d4a]/20 rounded-lg text-sm text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] bg-white transition-colors';

// ─── EditProfile ───────────────────────────────────────────────────────────────
export default function EditProfilePage() {
  const navigate = useNavigate();
  const avatarInputRef = useRef(null);

  const [loading, setLoading]     = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    biography: '',
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState(null); // cloudinary URL after upload
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [originalUsername, setOriginalUsername] = useState('');

  // ── Fetch current profile to pre-fill ────────────────────────────────────
  useEffect(() => {
    getMyProfileApi()
      .then(res => {
        const u = res.data.data.user;
        setForm({
          firstName: u.firstName || '',
          lastName:  u.lastName  || '',
          username:  u.username  || '',
          email:     u.email     || '',
          biography: u.biography || '',
        });
        setOriginalUsername(u.username || '');
        setAvatarPreview(u.profileImage || null);
      })
      .catch(() => toast.error('Failed to load profile'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Show local preview immediately
    setAvatarPreview(URL.createObjectURL(file));
    // Upload to Cloudinary
    setAvatarUploading(true);
    try {
      const res = await uploadAvatarApi(file);
      setUploadedAvatarUrl(res.data.data.profileImage);
      toast.success('Photo uploaded!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload photo');
      setAvatarPreview(null); // revert preview on failure
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim() || !form.username.trim()) {
      toast.error('First name, last name and username are required');
      return;
    }
    if (avatarUploading) {
      toast.error('Please wait for the photo to finish uploading');
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        firstName: form.firstName.trim(),
        lastName:  form.lastName.trim(),
        username:  form.username.trim(),
        email:     form.email.trim(),
        biography: form.biography.trim(),
      };
      // Include the cloudinary URL if a new avatar was uploaded
      if (uploadedAvatarUrl) payload.profileImage = uploadedAvatarUrl;

      await updateProfileApi(payload);
      toast.success('Profile updated!');
      navigate('/my-profile');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f5f3e8]">
        <HomeNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#1e2d4a]/20 border-t-[#1e2d4a] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f3e8] flex flex-col">
      <Toaster position="top-right" />
      <HomeNavbar />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md border border-[#1e2d4a]/8 overflow-hidden">

            {/* Header */}
            <div className="px-6 md:px-10 py-5 border-b border-[#1e2d4a]/8">
              <h1 className="text-xl font-black text-[#1e2d4a]">Edit Profile</h1>
            </div>

            <form onSubmit={handleSubmit} className="px-6 md:px-10">

              {/* ── Avatar row ─────────────────────────────────────────── */}
              <div className="flex items-center gap-5 py-5 border-b border-[#1e2d4a]/8">
                <button
                  type="button"
                  onClick={() => !avatarUploading && avatarInputRef.current?.click()}
                  className="w-14 h-14 rounded-full border-2 border-[#1e2d4a] overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity relative"
                >
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#1e2d4a] flex items-center justify-center text-white text-lg font-black">
                      {form.username?.[0]?.toUpperCase() || '?'}
                    </div>
                  )}
                  {avatarUploading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                </button>
                <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                <div>
                  <p className="font-bold text-[#1e2d4a] text-sm">{form.username}</p>
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    className="text-sm font-bold text-[#1e2d4a] hover:opacity-70 transition-opacity mt-0.5"
                  >
                    Change profile photo
                  </button>
                </div>
              </div>

              {/* ── First Name ─────────────────────────────────────────── */}
              <FieldRow label="First Name">
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="First name"
                />
              </FieldRow>

              {/* ── Last Name ──────────────────────────────────────────── */}
              <FieldRow label="Last Name">
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Last name"
                />
              </FieldRow>

              {/* ── Username ───────────────────────────────────────────── */}
              <FieldRow label="Username">
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="username"
                />
                {form.username !== originalUsername && originalUsername && (
                  <p className="text-xs text-[#1e2d4a]/40 mt-1.5">
                    In most cases, you'll be able to change your username back to {originalUsername} for another 14 days.
                  </p>
                )}
              </FieldRow>

              {/* ── Email ──────────────────────────────────────────────── */}
              <FieldRow label="Email">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="email@example.com"
                />
              </FieldRow>

              {/* ── Bio ────────────────────────────────────────────────── */}
              <FieldRow label="Bio">
                <textarea
                  name="biography"
                  value={form.biography}
                  onChange={handleChange}
                  maxLength={BIO_MAX}
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell people about yourself..."
                />
                <p className="text-xs text-[#1e2d4a]/40 mt-1.5">
                  {form.biography.length} / {BIO_MAX}
                </p>
              </FieldRow>

              {/* ── Actions ────────────────────────────────────────────── */}
              <div className="flex items-center gap-4 py-5">
                <button
                  type="submit"
                  disabled={submitting || avatarUploading}
                  className="px-8 py-2.5 bg-[#1e2d4a] text-white font-bold text-sm rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : avatarUploading ? 'Uploading photo...' : 'Submit'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/my-profile')}
                  disabled={submitting}
                  className="text-sm font-bold text-[#1e2d4a] hover:opacity-70 transition-opacity"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
