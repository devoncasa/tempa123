
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const session = localStorage.getItem('admin_session');
    if (session) {
      try {
        const { expiry } = JSON.parse(session);
        if (new Date().getTime() < expiry) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('admin_session');
          setIsAuthenticated(false);
        }
      } catch {
        localStorage.removeItem('admin_session');
        setIsAuthenticated(false);
      }
    }
  }, []);

  const login = (password: string): boolean => {
    if (password === 'k0007') {
      const expiry = new Date().getTime() + 8 * 60 * 60 * 1000; // 8 hours
      localStorage.setItem('admin_session', JSON.stringify({ expiry }));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = useCallback(() => {
    localStorage.removeItem('admin_session');
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
