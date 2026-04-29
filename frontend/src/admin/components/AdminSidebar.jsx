import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiFileText, FiAlertCircle, FiActivity, FiLogOut, FiMenu, FiChevronLeft } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import useAdminAuth from '../hooks/useAdminAuth';

export default function AdminSidebar() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: FiHome, end: true },
    { name: 'Users', path: '/admin/users', icon: FiUsers },
    { name: 'Content', path: '/admin/content', icon: FiFileText },
    { name: 'Disputes', path: '/admin/disputes', icon: FiAlertCircle },
    { name: 'Audit Log', path: '/admin/audit-log', icon: FiActivity },
  ];

  const sidebarVariants = {
    expanded: { width: 240 },
    collapsed: { width: 64 }
  };

  return (
    <motion.aside 
      initial={false}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 bottom-0 bg-white border-r border-gray-200 z-40 hidden md:flex flex-col whitespace-nowrap overflow-hidden"
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between h-16">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.h2 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-xl font-bold bg-gradient-to-r from-[#219EBC] to-[#023047] bg-clip-text text-transparent"
            >
              RecipeNest
            </motion.h2>
          )}
        </AnimatePresence>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg mx-auto"
        >
          {isCollapsed ? <FiMenu className="w-5 h-5" /> : <FiChevronLeft className="w-5 h-5" />}
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                isActive 
                  ? 'bg-amber-50 text-[#FFB703] border border-amber-100 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 mx-auto'
              }`
            }
          >
            <item.icon className="w-5 h-5 min-w-[20px]" />
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-gray-600 font-medium rounded-xl hover:bg-red-50 hover:text-red-700 mx-auto transition-colors"
        >
          <FiLogOut className="w-5 h-5 min-w-[20px]" />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Log Out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
