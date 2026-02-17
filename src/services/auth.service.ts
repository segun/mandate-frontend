import { api } from '../lib/api';
import { UserRole } from '../lib/permissions';

export interface LoginRequest {
  email: string;
  password: string;
  token: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}

export const TenantSubscriptionAccessStatus = {
  NO_SUBSCRIPTION: 'NO_SUBSCRIPTION',
  SUBSCRIPTION_PENDING: 'SUBSCRIPTION_PENDING',
  SUBSCRIPTION_ACTIVE: 'SUBSCRIPTION_ACTIVE',
  SUBSCRIPTION_GRACE: 'SUBSCRIPTION_GRACE',
  SUBSCRIPTION_PAST_DUE: 'SUBSCRIPTION_PAST_DUE',
  SUBSCRIPTION_EXPIRED: 'SUBSCRIPTION_EXPIRED',
  SUBSCRIPTION_CANCELED: 'SUBSCRIPTION_CANCELED',
} as const;

export type TenantSubscriptionAccessStatus = typeof TenantSubscriptionAccessStatus[keyof typeof TenantSubscriptionAccessStatus];

export type TenantMeta = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  subscriptionStatus: string;
  subscriptionAccessStatus?: TenantSubscriptionAccessStatus;
  subscriptionInterval: 'MONTHLY' | 'YEARLY' | null;
  subscriptionMode: 'AUTO' | 'MANUAL' | null;
  subscriptionEndsAt: string | null;
  gracePeriodEndsAt: string | null;
};

export interface AuthResponse {
  success: boolean;
  data: {
    accessToken: string;
    user: {
      id: string;
      fullName: string;
      email: string;
      role: UserRole;
      tenantId: string | null;
      phone?: string;
      isActive: boolean;
      requirePasswordChange: boolean;
      lastLoginAt: string | null;
      createdAt: string;
      updatedAt: string;
      parentOfficerId: string | null;
      assignedStateId: string | null;
      assignedLgaId: string | null;
      assignedWardId: string | null;
      assignedPollingUnitId: string | null;
    };
  };
  message: string;
  meta?: {
    tenant: TenantMeta;
    subscriptionAccessStatus: TenantSubscriptionAccessStatus;
  };
}

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async getProfile(): Promise<AuthResponse['data']['user']> {
    const response = await api.get('/auth/me');
    return response.data.data;
  },
};
