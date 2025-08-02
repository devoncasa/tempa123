import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

export interface UserState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  packageTier: 'none' | 'basic' | 'standard' | 'premium' | 'enterprise';
  downloadsRemaining: number;
  downloadsPerMonth: number;
  username: string;
}

const initialState: UserState = {
  isAuthenticated: false,
  isAdmin: false,
  packageTier: 'none',
  downloadsRemaining: 0,
  downloadsPerMonth: 0,
  username: '',
};

interface AuthContextType {
  user: UserState;
  login: (password: string) => boolean;
  logout: () => void;
  consumeDownload: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserState>(initialState);

  useEffect(() => {
    const session = localStorage.getItem('user_session');
    if (session) {
      try {
        const parsedSession = JSON.parse(session);
        // Basic check to see if the object is what we expect
        if (parsedSession.hasOwnProperty('isAuthenticated')) {
          setUser(parsedSession);
        } else {
           localStorage.removeItem('user_session');
        }
      } catch {
        localStorage.removeItem('user_session');
      }
    }
  }, []);

  const login = (password: string): boolean => {
    let userState: UserState | null = null;
    const quotaResetDate = localStorage.getItem('quota_reset_date');
    const today = new Date().getMonth();

    if (quotaResetDate === null || parseInt(quotaResetDate, 10) !== today) {
        // Reset quota if it's a new month
        localStorage.setItem('quota_reset_date', today.toString());
    }

    if (password === 'k0007') {
      userState = {
        isAuthenticated: true,
        isAdmin: true,
        packageTier: 'enterprise',
        downloadsRemaining: 250,
        downloadsPerMonth: 250,
        username: 'Admin',
      };
    } else if (password === 'user123') {
        userState = {
            isAuthenticated: true,
            isAdmin: false,
            packageTier: 'premium',
            downloadsRemaining: 100,
            downloadsPerMonth: 100,
            username: 'PremiumUser',
        };
    } else if (password === 'basic_user') {
        userState = {
            isAuthenticated: true,
            isAdmin: false,
            packageTier: 'basic',
            downloadsRemaining: 15,
            downloadsPerMonth: 15,
            username: 'BasicUser',
        };
    }

    if (userState) {
      // If the month has changed, reset the downloads remaining.
      if (quotaResetDate === null || parseInt(quotaResetDate, 10) !== today) {
          userState.downloadsRemaining = userState.downloadsPerMonth;
      }
      localStorage.setItem('user_session', JSON.stringify(userState));
      setUser(userState);
      return true;
    }
    return false;
  };

  const logout = useCallback(() => {
    localStorage.removeItem('user_session');
    setUser(initialState);
  }, []);

  const consumeDownload = useCallback(() => {
    setUser(prevState => {
      if(prevState.downloadsRemaining > 0) {
        const newState = { ...prevState, downloadsRemaining: prevState.downloadsRemaining - 1};
        localStorage.setItem('user_session', JSON.stringify(newState));
        return newState;
      }
      return prevState;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, consumeDownload }}>
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
