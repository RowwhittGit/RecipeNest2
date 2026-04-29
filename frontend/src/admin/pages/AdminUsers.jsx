import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdminApi from '../hooks/useAdminApi';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import ConfirmModal from '../components/ConfirmModal';
import { FiEye, FiToggleLeft, FiToggleRight, FiTrash2, FiSearch } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';

export default function AdminUsers() {
  const adminApi = useAdminApi();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useState({ page: 1, limit: 10, q: '', status: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [paginationMeta, setPaginationMeta] = useState(null);
  
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, targetId: null, isLoading: false });

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await adminApi.get('/api/admin/users', { params });
      setUsers(res.data.data || []);
      setPaginationMeta(res.data.pagination || { page: 1, limit: 10, total: 0, pages: 1 });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setParams(p => ({ ...p, q: searchTerm, page: 1 }));
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleToggleSuspend = async (user) => {
    const action = user.isActive ? 'suspend' : 'reinstate';
    try {
      await adminApi.patch(`/api/admin/users/${user._id}/${action}`);
      toast.success(`User ${action}d successfully`);
      setUsers(users.map(u => u._id === user._id ? { ...u, isActive: !u.isActive } : u));
    } catch (error) {
      toast.error(`Failed to ${action} user`);
    }
  };

  const handleDelete = async () => {
    if (!confirmModal.targetId) return;
    try {
      setConfirmModal(prev => ({ ...prev, isLoading: true }));
      await adminApi.delete(`/api/admin/users/${confirmModal.targetId}`);
      toast.success('User deleted successfully');
      setUsers(users.filter(u => u._id !== confirmModal.targetId));
      setConfirmModal({ isOpen: false, targetId: null, isLoading: false });
    } catch (error) {
      toast.error('Failed to delete user');
      setConfirmModal(prev => ({ ...prev, isLoading: false }));
    }
  };

  const columns = useMemo(() => [
    {
      header: 'Name',
      accessorKey: 'firstName',
      cell: info => {
        const user = info.row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
              {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
            </div>
            <span className="font-medium text-gray-900">{user.firstName} {user.lastName}</span>
          </div>
        );
      }
    },
    { header: 'Email', accessorKey: 'email' },
    {
      header: 'Status',
      accessorKey: 'isActive',
      cell: info => <StatusBadge status={info.getValue() ? 'active' : 'suspended'} />
    },
    {
      header: 'Joined',
      accessorKey: 'createdAt',
      cell: info => <span className="text-gray-500">{format(new Date(info.getValue()), 'MMM d, yyyy')}</span>
    },
    {
      header: 'Actions',
      id: 'actions',
      cell: info => {
        const user = info.row.original;
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/admin/users/${user._id}`)}
              className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="View Detail"
            >
              <FiEye className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleToggleSuspend(user)}
              className={`p-1.5 rounded-lg transition-colors ${
                user.isActive 
                  ? 'text-amber-600 hover:bg-amber-50' 
                  : 'text-green-600 hover:bg-green-50'
              }`}
              title={user.isActive ? 'Suspend User' : 'Reinstate User'}
            >
              {user.isActive ? <FiToggleLeft className="w-4 h-4" /> : <FiToggleRight className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setConfirmModal({ isOpen: true, targetId: user._id, isLoading: false })}
              className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete User"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        );
      }
    }
  ], [navigate]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Users Management</h1>
          <p className="text-gray-500 mt-1">View, manage, and moderate user accounts.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFB703] focus:border-[#FFB703] transition-shadow outline-none"
            />
          </div>
          <select
            value={params.status}
            onChange={(e) => setParams({ ...params, status: e.target.value, page: 1 })}
            className="py-2 pl-3 pr-8 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFB703] focus:border-[#FFB703] outline-none"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        pagination={paginationMeta}
        onPageChange={(page) => setParams(p => ({ ...p, page }))}
      />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, targetId: null, isLoading: false })}
        onConfirm={handleDelete}
        title="Delete User Account"
        message="Are you sure you want to delete this user? This action cannot be undone and will permanently remove their data."
        isLoading={confirmModal.isLoading}
      />
    </div>
  );
}
