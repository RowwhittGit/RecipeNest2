import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useAdminApi from '../hooks/useAdminApi';
import StatusBadge from '../components/StatusBadge';
import ConfirmModal from '../components/ConfirmModal';
import { FiArrowLeft, FiUser, FiMail, FiCalendar, FiShield, FiAlertTriangle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';

export default function AdminUserDetail() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const adminApi = useAdminApi();
  
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, isLoading: false });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await adminApi.get(`/api/admin/users/${userId}`);
        setUser(res.data.data);
      } catch (error) {
        toast.error('Failed to load user details');
        navigate('/admin/users');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [userId, navigate]);

  const handleToggleSuspend = async () => {
    const action = user.isActive ? 'suspend' : 'reinstate';
    try {
      await adminApi.patch(`/api/admin/users/${userId}/${action}`);
      toast.success(`User ${action}d successfully`);
      setUser(prev => ({ ...prev, isActive: !prev.isActive }));
    } catch (error) {
      toast.error(`Failed to ${action} user`);
    }
  };

  const handleDelete = async () => {
    try {
      setConfirmModal(prev => ({ ...prev, isLoading: true }));
      await adminApi.delete(`/api/admin/users/${userId}`);
      toast.success('User deleted successfully');
      navigate('/admin/users');
    } catch (error) {
      toast.error('Failed to delete user');
      setConfirmModal(prev => ({ ...prev, isLoading: false }));
    }
  };

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin w-8 h-8 border-4 border-[#FFB703]/30 border-t-[#FFB703] rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link to="/admin/users" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
        <FiArrowLeft /> Back to Users
      </Link>

      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-[#219EBC] to-[#023047]"></div>
        
        <div className="px-6 pb-6 relative">
          <div className="flex justify-between items-end mb-6">
            <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-600 shadow-sm -mt-12 overflow-hidden">
              {user.profileImage ? (
                <img src={user.profileImage} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <>{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleToggleSuspend}
                className={`px-4 py-2 text-sm font-medium rounded-xl border transition-colors ${
                  user.isActive 
                    ? 'border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100'
                    : 'border-green-200 text-green-700 bg-green-50 hover:bg-green-100'
                }`}
              >
                {user.isActive ? 'Suspend Account' : 'Reinstate Account'}
              </button>
              <button
                onClick={() => setConfirmModal({ isOpen: true, isLoading: false })}
                className="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors"
              >
                Delete User
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.firstName} {user.lastName}</h1>
              <p className="text-gray-500">@{user.username || 'unknown'}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <StatusBadge status={user.isActive ? 'active' : 'suspended'} />
              <StatusBadge status={user.role} />
              {user.isProfessional && <StatusBadge status="professional" />}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-gray-50 rounded-lg"><FiMail className="text-gray-400" /></div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email</p>
                  <p className="text-sm font-medium text-gray-900">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-gray-50 rounded-lg"><FiCalendar className="text-gray-400" /></div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Joined</p>
                  <p className="text-sm font-medium text-gray-900">{format(new Date(user.createdAt), 'MMMM d, yyyy')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-gray-50 rounded-lg"><FiShield className="text-gray-400" /></div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Verified</p>
                  <p className="text-sm font-medium text-gray-900">{user.isEmailVerified ? 'Yes' : 'No'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-gray-50 rounded-lg"><FiUser className="text-gray-400" /></div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Social Stats</p>
                  <p className="text-sm font-medium text-gray-900">
                    {user.followerCount || 0} Followers &nbsp;•&nbsp; {user.followingCount || 0} Following
                  </p>
                </div>
              </div>
            </div>
            
            {user.biography && (
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Biography</h3>
                <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">{user.biography}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, isLoading: false })}
        onConfirm={handleDelete}
        title="Delete User Account"
        message={`Are you sure you want to permanently delete ${user.firstName}? All their data and recipes will be lost.`}
        isLoading={confirmModal.isLoading}
      />
    </div>
  );
}
