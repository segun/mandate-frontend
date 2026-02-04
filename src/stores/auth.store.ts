import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserRole } from '../lib/permissions';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  tenantId: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      login: (user, token) => {
        localStorage.setItem('accessToken', token);
        set({ user, accessToken: token, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem('accessToken');
        set({ user: null, accessToken: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
