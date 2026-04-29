import React, { createContext, useState, useEffect } from 'react';

export const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || null);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    if (adminToken) {
      localStorage.setItem('adminToken', adminToken);
      // In a real scenario we might fetch user profile here. For now we just rely on token existence.
    } else {
      localStorage.removeItem('adminToken');
      setAdminUser(null);
    }
  }, [adminToken]);

  const login = (token, user) => {
    setAdminToken(token);
    setAdminUser(user);
  };

  const logout = () => {
    setAdminToken(null);
    setAdminUser(null);
  };

  return (
    <AdminAuthContext.Provider value={{ adminToken, adminUser, login, logout, isAuthenticated: !!adminToken }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
