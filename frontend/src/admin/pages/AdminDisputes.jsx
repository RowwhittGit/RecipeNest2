import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAdminApi from '../hooks/useAdminApi';
import StatusBadge from '../components/StatusBadge';
import DisputeOutcomeChart from '../components/charts/DisputeOutcomeChart';
import { FiMessageSquare, FiExternalLink, FiClock, FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';

export default function AdminDisputes() {
  const adminApi = useAdminApi();
  const [disputes, setDisputes] = useState([]);
  const [chartDisputes, setChartDisputes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('pending');
  
  const [resolveModal, setResolveModal] = useState({ isOpen: false, item: null });
  const [resolveForm, setResolveForm] = useState({ actionTaken: 'Warning Issued', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchDisputes = useCallback(async () => {
    try {
      setIsLoading(true);
      const [listRes, resolvedRes] = await Promise.all([
        adminApi.get('/api/admin/disputes', { params: { status: statusFilter } }),
        adminApi.get('/api/admin/disputes', { params: { status: 'resolved' } })
      ]);
      setDisputes(listRes.data.data || []);
      setChartDisputes(resolvedRes.data.data || []);
    } catch (error) {
      toast.error('Failed to load disputes');
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchDisputes();
  }, [fetchDisputes]);

  const handleResolveSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await adminApi.patch(`/api/admin/disputes/${resolveModal.item._id}/resolve`, resolveForm);
      toast.success('Dispute resolved successfully');
      setDisputes(prev => prev.filter(d => d._id !== resolveModal.item._id));
      setResolveModal({ isOpen: false, item: null });
      setResolveForm({ actionTaken: 'Warning Issued', notes: '' });
      fetchDisputes(); // Refetch to update chart
    } catch (error) {
      toast.error('Failed to resolve dispute');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto overflow-x-hidden relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Disputes</h1>
          <p className="text-gray-500 mt-1">Review and resolve user reports.</p>
        </div>
        
        <div className="bg-gray-100 p-1 rounded-xl flex">
          <button onClick={() => setStatusFilter('pending')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${statusFilter === 'pending' ? 'bg-white shadow-sm text-[#FFB703]' : 'text-gray-500'}`}>Pending</button>
          <button onClick={() => setStatusFilter('resolved')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${statusFilter === 'resolved' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500'}`}>Resolved</button>
        </div>
      </div>

      <DisputeOutcomeChart disputes={chartDisputes} />

      {isLoading ? (
        <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-[#FFB703]/30 border-t-[#FFB703] rounded-full" /></div>
      ) : disputes.length === 0 ? (
        <div className="text-center bg-white rounded-2xl py-16 px-6 ring-1 ring-black/5"><FiCheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" /><p className="text-gray-500">All caught up!</p></div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {disputes.map((item, i) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                key={item._id} 
                className="bg-white p-6 rounded-2xl ring-1 ring-black/5 shadow-sm relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <StatusBadge status={item.status} />
                      <span className="text-xs font-medium text-gray-400 border px-2 py-0.5 rounded text-transform uppercase">{item.targetType}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Target Content:</h3>
                      {item.targetId ? (
                        <Link to={`/recipes/${item.targetId?._id || item.targetId}`} target="_blank" className="font-bold text-gray-900 flex items-center gap-2 group">
                          {item.targetId?.title || 'Unknown Target Document'} <FiExternalLink className="w-4 h-4 text-gray-400" />
                        </Link>
                      ) : (
                        <p className="text-gray-500 italic">Target has been removed</p>
                      )}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex gap-4">
                      <FiMessageSquare className="text-gray-400 w-5 h-5 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-800">"{item.reason}"</p>
                      </div>
                    </div>
                  </div>

                  {item.status === 'pending' && (
                    <button onClick={() => setResolveModal({ isOpen: true, item })} className="sm:w-32 py-2.5 px-4 text-sm font-medium bg-[#FFB703] hover:bg-[#FB8500] text-white rounded-xl shadow-sm transition-colors">Resolve</button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Resolve Slide-over */}
      <AnimatePresence>
        {resolveModal.isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setResolveModal({ isOpen: false, item: null })} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl flex flex-col"
            >
              <div className="px-6 py-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Resolve Dispute</h2>
              </div>
              <div className="flex-1 p-6 overflow-y-auto">
                <form id="resolve-form" onSubmit={handleResolveSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Action Taken</label>
                    <select required value={resolveForm.actionTaken} onChange={(e) => setResolveForm({ ...resolveForm, actionTaken: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-[#FFB703] focus:border-[#FFB703] text-sm">
                      <option value="Warning Issued">Warning Issued</option>
                      <option value="Content Removed">Content Removed</option>
                      <option value="No Action Taken">No Action Taken</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resolution Notes</label>
                    <textarea rows="4" value={resolveForm.notes} onChange={(e) => setResolveForm({ ...resolveForm, notes: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-[#FFB703] focus:border-[#FFB703] text-sm resize-none"></textarea>
                  </div>
                </form>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3 bg-gray-50">
                <button type="button" onClick={() => setResolveModal({ isOpen: false, item: null })} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 rounded-xl transition-colors">Cancel</button>
                <button type="submit" form="resolve-form" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-xl disabled:opacity-50 transition-colors flex items-center gap-2">
                  {isSubmitting && <span className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full" />}
                  Mark as Resolved
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
