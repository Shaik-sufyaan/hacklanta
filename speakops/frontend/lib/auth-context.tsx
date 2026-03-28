'use client';

import { createContext, useContext, useMemo } from 'react';

import { demoUser } from '@/lib/mock-data';
import type { DashboardUser } from '@/types';

const AuthContext = createContext<{ user: DashboardUser | null }>({
  user: demoUser
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(() => ({ user: demoUser }), []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
