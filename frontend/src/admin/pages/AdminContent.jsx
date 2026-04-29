import React, { useState, useEffect, useMemo, useCallback } from 'react';
import useAdminApi from '../hooks/useAdminApi';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import ConfirmModal from '../components/ConfirmModal';
import RecipeStatusPieChart from '../components/charts/RecipeStatusPieChart';
import { FiCheck, FiX, FiTrash2, FiExternalLink } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';

export default function AdminContent() {
  const adminApi = useAdminApi();
  const [content, setContent] = useState([]);
  const [allContentForChart, setAllContentForChart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterMode, setFilterMode] = useState('all'); 
  const [paginationMeta, setPaginationMeta] = useState(null);
  const [page, setPage] = useState(1);
  
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, targetId: null, isLoading: false });

  // Fetch paginated for table
  const fetchContent = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = { page, limit: 10 };
      if (filterMode === 'flagged') {
        params.status = 'flagged';
      }
      const res = await adminApi.get('/api/admin/content', { params });
      setContent(res.data.data || []);
      setPaginationMeta(res.data.pagination || { page: 1, limit: 10, total: 0, pages: 1 });
      
      // For charting, API doesn't paginate if we don't pass page/limit
      // Actually listContent doesn't natively paginate but if we simulate it, 
      // let's grab without params to get chart stats for "All"
      const chartRes = await adminApi.get('/api/admin/content');
      setAllContentForChart(chartRes.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch content');
    } finally {
      setIsLoading(false);
    }
  }, [filterMode, page]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const handleAction = async (id, actionType) => { 
    try {
      await adminApi.patch(`/api/admin/content/${id}/${actionType}`);
      toast.success(`Content ${actionType}d successfully`);
      setContent(prev => prev.map(item => {
        if (item._id === id) {
          return { ...item, status: actionType === 'approve' ? 'published' : 'draft', isFlagged: false };
        }
        return item;
      }));
    } catch (error) {
      toast.error(`Failed to ${actionType} content`);
    }
  };

  const handleDelete = async () => {
    if (!confirmModal.targetId) return;
    try {
      setConfirmModal(prev => ({ ...prev, isLoading: true }));
      await adminApi.delete(`/api/admin/content/${confirmModal.targetId}`);
      toast.success('Content deleted successfully');
      setContent(prev => prev.filter(c => c._id !== confirmModal.targetId));
      setConfirmModal({ isOpen: false, targetId: null, isLoading: false });
    } catch (error) {
      toast.error('Failed to delete content');
      setConfirmModal({ isOpen: false, targetId: null, isLoading: false });
    }
  };

  const columns = useMemo(() => [
    { header: 'Title', accessorKey: 'title', cell: info => <span className="font-medium text-gray-900 block max-w-xs">{info.getValue()}</span> },
    { header: 'Author', id: 'author', cell: info => <span className="text-gray-600 text-sm">{info.row.original.author?.firstName} {info.row.original.author?.lastName}</span> },
    { header: 'Status', accessorKey: 'status', cell: info => <StatusBadge status={info.getValue()} /> },
    { header: 'Flagged', accessorKey: 'isFlagged', cell: info => info.getValue() ? <span className="text-red-600 font-medium text-sm">Yes</span> : <span className="text-gray-400 text-sm">-</span> },
    { header: 'Actions', id: 'actions', cell: info => {
        const item = info.row.original;
        return (
          <div className="flex gap-2">
            <button onClick={() => handleAction(item._id, 'approve')} className="p-1.5 text-gray-500 hover:text-green-600 rounded-lg"><FiCheck /></button>
            <button onClick={() => handleAction(item._id, 'reject')} className="p-1.5 text-gray-500 hover:text-amber-600 rounded-lg"><FiX /></button>
            <button onClick={() => setConfirmModal({ isOpen: true, targetId: item._id })} className="p-1.5 text-gray-500 hover:text-red-600 rounded-lg"><FiTrash2 /></button>
          </div>
        );
      }
    }
  ], []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Content Moderation</h1>
        </div>
        <div className="bg-gray-100 p-1 rounded-xl flex">
          <button onClick={() => { setFilterMode('all'); setPage(1); }} className={`px-4 py-2 text-sm font-medium rounded-lg ${filterMode === 'all' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>All Content</button>
          <button onClick={() => { setFilterMode('flagged'); setPage(1); }} className={`px-4 py-2 text-sm font-medium rounded-lg ${filterMode === 'flagged' ? 'bg-white shadow-sm text-amber-700' : 'text-gray-500'}`}>Flagged</button>
        </div>
      </div>

      <RecipeStatusPieChart recipes={allContentForChart} />

      <DataTable columns={columns} data={content} isLoading={isLoading} pagination={paginationMeta} onPageChange={(p) => setPage(p)} />

      <ConfirmModal isOpen={confirmModal.isOpen} onClose={() => setConfirmModal({ isOpen: false, targetId: null, isLoading: false })} onConfirm={handleDelete} title="Delete Content" message="Are you sure you want to permanently delete this recipe?" isLoading={confirmModal.isLoading} />
    </div>
  );
}
