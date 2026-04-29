import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AdminAuthProvider } from '../context/AdminAuthContext';
import AdminLayout from '../components/AdminLayout';

import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';
import AdminUsers from '../pages/AdminUsers';
import AdminUserDetail from '../pages/AdminUserDetail';
import AdminContent from '../pages/AdminContent';
import AdminDisputes from '../pages/AdminDisputes';
import AdminAuditLog from '../pages/AdminAuditLog';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<AdminLogin />} />
        
        {/* Protected Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/users/:userId" element={<AdminUserDetail />} />
          <Route path="/content" element={<AdminContent />} />
          <Route path="/disputes" element={<AdminDisputes />} />
          <Route path="/audit-log" element={<AdminAuditLog />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <AnimatedRoutes />
    </AdminAuthProvider>
  );
}
