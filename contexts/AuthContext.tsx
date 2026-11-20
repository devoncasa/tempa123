import React, { createContext, useContext } from 'react';

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

// Legacy account screens remain unavailable until verified server identity is provided.
const guest: AuthContextType = { user: initialState, login: () => false, logout: () => {}, consumeDownload: () => {} };
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  <AuthContext.Provider value={guest}>{children}</AuthContext.Provider>;
export const useAuth = () => useContext(AuthContext) ?? guest;
