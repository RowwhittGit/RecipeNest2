import React from 'react';
import useAdminAuth from '../hooks/useAdminAuth';
import { FiMenu } from 'react-icons/fi';

export default function AdminHeader() {
  const { adminUser } = useAdminAuth();

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 h-16 flex items-center px-6 justify-between md:justify-end">
      <button className="md:hidden text-gray-600 p-2 -ml-2 rounded-lg hover:bg-gray-100">
        <FiMenu className="w-6 h-6" />
      </button>
      
      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-semibold text-gray-900">
            {adminUser?.firstName || 'Admin'} {adminUser?.lastName || 'User'}
          </p>
          <p className="text-xs text-gray-500 capitalize">{adminUser?.role || 'Administrator'}</p>
        </div>
        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#FFB703] to-[#FB8500] flex items-center justify-center text-white font-semibold text-sm shadow-sm ring-2 ring-white">
          {(adminUser?.firstName?.[0] || 'A').toUpperCase()}
        </div>
      </div>
    </header>
  );
}
