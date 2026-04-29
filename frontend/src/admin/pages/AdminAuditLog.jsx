import React, { useState, useEffect, useMemo, useCallback } from 'react';
import useAdminApi from '../hooks/useAdminApi';
import DataTable from '../components/DataTable';
import AuditActionDonutChart from '../components/charts/AuditActionDonutChart';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

export default function AdminAuditLog() {
  const adminApi = useAdminApi();
  const [logs, setLogs] = useState([]);
  const [chartLogs, setChartLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [params, setParams] = useState({ page: 1, limit: 10, action: '', userId: '', from: '', to: '' });
  const [paginationMeta, setPaginationMeta] = useState(null);

  const fetchLogs = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await adminApi.get('/api/admin/audit-log', { params });
      setLogs(res.data.data || []);
      setPaginationMeta(res.data.pagination || { page: 1, limit: 10, total: 0, pages: 1 });
      
      // Fetch 100 recent for chart if page is 1
      if (params.page === 1) {
        const chartRes = await adminApi.get('/api/admin/audit-log', { params: { limit: 100 } });
        setChartLogs(chartRes.data.data || []);
      }
    } catch (error) {
      toast.error('Failed to load audit logs');
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: value, page: 1 }));
  };

  const columns = useMemo(() => [
    { header: 'Time', accessorKey: 'createdAt', cell: info => <span className="text-gray-500 text-xs whitespace-nowrap">{format(new Date(info.getValue()), 'MMM d, HH:mm')}</span> },
    { header: 'Action', accessorKey: 'action', cell: info => <span className="font-medium text-gray-800 bg-gray-100 px-2 py-1 rounded text-xs truncate max-w-[120px] block" title={info.getValue()}>{info.getValue()}</span> },
    { header: 'Target', accessorKey: 'targetModel', cell: info => <span className="text-gray-600 text-sm capitalize">{info.getValue() || '-'}</span> },
    { header: 'Details', accessorKey: 'details', cell: info => <span className="text-gray-500 text-xs max-w-[200px] truncate block" title={JSON.stringify(info.getValue())}>{JSON.stringify(info.getValue())}</span> }
  ], []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Audit Log</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <AuditActionDonutChart logs={chartLogs} />
        
        <div className="bg-white p-6 rounded-2xl ring-1 ring-black/5 shadow-sm space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Filter Logs</h3>
          <input type="text" name="action" placeholder="Action Type" value={params.action} onChange={handleFilterChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-[#FFB703]" />
          <input type="text" name="userId" placeholder="Admin ID" value={params.userId} onChange={handleFilterChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-[#FFB703]" />
          <div className="flex gap-2">
            <input type="date" name="from" value={params.from} onChange={handleFilterChange} className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg" />
            <input type="date" name="to" value={params.to} onChange={handleFilterChange} className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg" />
          </div>
          <button onClick={() => setParams({ page: 1, limit: 10, action: '', userId: '', from: '', to: '' })} className="w-full py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200">Clear Filters</button>
        </div>
      </div>

      <DataTable columns={columns} data={logs} isLoading={isLoading} pagination={paginationMeta} onPageChange={(page) => setParams(p => ({ ...p, page }))} />
    </div>
  );
}
