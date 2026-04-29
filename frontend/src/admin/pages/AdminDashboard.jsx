import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAdminApi from '../hooks/useAdminApi';
import StatCard from '../components/StatCard';
import MetricBarChart from '../components/charts/MetricBarChart';
import UserRatioPieChart from '../components/charts/UserRatioPieChart';
import ModerationHealthChart from '../components/charts/ModerationHealthChart';
import { FiUsers, FiBook, FiAlertTriangle, FiUserPlus, FiCheck, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
  const adminApi = useAdminApi();
  const [stats, setStats] = useState(null);
  const [flaggedContent, setFlaggedContent] = useState([]);
  const [pendingDisputes, setPendingDisputes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [statsRes, contentRes, disputesRes] = await Promise.all([
        adminApi.get('/api/admin/dashboard-stats'),
        adminApi.get('/api/admin/content?status=flagged&limit=5'),
        adminApi.get('/api/admin/disputes?status=pending')
      ]);

      setStats(statsRes.data.data);
      setFlaggedContent(contentRes.data.data || []);
      setPendingDisputes(disputesRes.data.data || []);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveContent = async (id) => {
    try {
      await adminApi.patch(`/api/admin/content/${id}/approve`);
      toast.success('Content approved');
      setFlaggedContent((prev) => prev.filter((item) => item._id !== id));
      if (stats) setStats({ ...stats, flaggedItems: Math.max(0, stats.flaggedItems - 1) });
    } catch (error) {
      toast.error('Failed to approve content');
    }
  };

  const handleDeleteContent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this content?')) return;
    try {
      await adminApi.delete(`/api/admin/content/${id}`);
      toast.success('Content deleted');
      setFlaggedContent((prev) => prev.filter((item) => item._id !== id));
      if (stats) setStats({ ...stats, flaggedItems: Math.max(0, stats.flaggedItems - 1) });
    } catch (error) {
      toast.error('Failed to delete content');
    }
  };

  if (isLoading || !stats) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin w-8 h-8 border-4 border-[#FFB703]/30 border-t-[#FFB703] rounded-full" />
      </div>
    );
  }

  const metricBarData = [
    { name: 'Users', value: stats.totalUsers },
    { name: 'Recipes', value: stats.totalRecipes },
    { name: 'Flagged', value: stats.flaggedItems }
  ];

  const userPieData = [
    { name: 'Regular', value: Math.max(0, stats.totalUsers - stats.professionalUsers) },
    { name: 'Professional', value: stats.professionalUsers }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Monitor your platform's key metrics at a glance.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard index={0} title="Total Users" value={stats.totalUsers} icon={FiUsers} />
        <StatCard index={1} title="Total Recipes" value={stats.totalRecipes} icon={FiBook} />
        <StatCard index={2} 
          title="Flagged Items" 
          value={stats.flaggedItems} 
          icon={FiAlertTriangle} 
          highlighting={stats.flaggedItems > 0} 
        />
        <StatCard index={3} title="New Signups" value={stats.newSignupsThisWeek} icon={FiUserPlus} />
      </div>

      <div className="space-y-6">
        <MetricBarChart data={metricBarData} />
        <div className="grid md:grid-cols-2 gap-6">
          <UserRatioPieChart data={userPieData} />
          <ModerationHealthChart flaggedCount={stats.flaggedItems} totalCount={stats.totalRecipes} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl ring-1 ring-black/5 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Flagged</h3>
            <Link to="/admin/content?status=flagged" className="text-sm font-medium text-[#FFB703] hover:text-[#FB8500]">View all</Link>
          </div>
          <div className="flex-1">
            {flaggedContent.length === 0 ? (
              <div className="text-center py-8 text-gray-500 flex flex-col items-center">
                <FiCheck className="w-8 h-8 text-green-500 mb-2" />
                <p>No flagged content to review.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {flaggedContent.map((item) => (
                  <li key={item._id} className="py-4 flex items-center justify-between group">
                    <div className="min-w-0 pr-4">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">Author: {item.author?.firstName} {item.author?.lastName}</p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleApproveContent(item._id)} className="p-1.5 text-green-600 bg-green-50 hover:bg-green-100 rounded-md"><FiCheck className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteContent(item._id)} className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-md"><FiTrash2 className="w-4 h-4" /></button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl ring-1 ring-black/5 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pending Disputes</h3>
            <Link to="/admin/disputes" className="text-sm font-medium text-[#FFB703] hover:text-[#FB8500]">View all</Link>
          </div>
          <div className="flex-1">
            {pendingDisputes.length === 0 ? (
              <div className="text-center py-8 text-gray-500 flex flex-col items-center">
                <FiCheck className="w-8 h-8 text-green-500 mb-2" />
                <p>No pending disputes.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {pendingDisputes.map((item) => (
                  <li key={item._id} className="py-4">
                    <p className="text-sm font-medium text-gray-900">Reporter: {item.reporter?.firstName}</p>
                    <p className="text-xs text-gray-500 my-1 truncate truncate text-ellipsis">Reason: {item.reason}</p>
                    <Link to={`/admin/disputes`} className="inline-flex text-xs px-2 py-1 bg-gray-100 rounded mt-1">Resolve</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
