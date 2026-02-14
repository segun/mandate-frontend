import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserRole } from '../lib/permissions';
import type { TenantSubscriptionAccessStatus, TenantMeta } from '../services/auth.service';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  tenantId: string | null;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  subscriptionAccessStatus: TenantSubscriptionAccessStatus | null;
  tenant: TenantMeta | null;
  login: (user: User, token: string, subscriptionAccessStatus?: TenantSubscriptionAccessStatus, tenant?: TenantMeta) => void;
  logout: () => void;
  updateSubscriptionStatus: (subscriptionAccessStatus: TenantSubscriptionAccessStatus, tenant?: TenantMeta) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      subscriptionAccessStatus: null,
      tenant: null,
      login: (user, token, subscriptionAccessStatus, tenant) => {
        localStorage.setItem('accessToken', token);
        set({ 
          user, 
          accessToken: token, 
          isAuthenticated: true,
          subscriptionAccessStatus: subscriptionAccessStatus || null,
          tenant: tenant || null
        });
      },
      logout: () => {
        localStorage.removeItem('accessToken');
        set({ 
          user: null, 
          accessToken: null, 
          isAuthenticated: false,
          subscriptionAccessStatus: null,
          tenant: null
        });
      },
      updateSubscriptionStatus: (subscriptionAccessStatus, tenant) => {
        set({ subscriptionAccessStatus, tenant: tenant || null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
