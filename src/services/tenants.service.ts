import { api } from '../lib/api';

export type RegisterTenantRequest = {
  organizationName: string;
  organizationType:
    | 'POLITICAL_CAMPAIGN'
    | 'POLITICAL_PARTY'
    | 'NGO_CIVIL_SOCIETY'
    | 'GOVERNMENT_INSTITUTION'
    | 'TECHNOLOGY_PARTNER'
    | 'OTHER';
  useCases?: string;
  contactName: string;
  email: string;
  phone?: string;
  password: string;
  subscriptionMode: 'AUTO' | 'MANUAL';
  token: string | undefined;
};

export type RegisterTenantResponse = {
  tenant: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    organizationType: RegisterTenantRequest['organizationType'];
    useCases: string | null;
    isActive: boolean;
    subscriptionStatus: 'PENDING_PAYMENT' | 'ACTIVE' | 'PAST_DUE' | 'EXPIRED' | 'CANCELED';
    subscriptionAccessStatus?: string | null;
    subscriptionInterval: 'MONTHLY' | 'YEARLY' | null;
    subscriptionMode: 'AUTO' | 'MANUAL' | null;
    subscriptionEndsAt: string | null;
    gracePeriodEndsAt: string | null;
    maxUsers: number | null;
    defaultUserLimit?: number | null;
    totalLicences?: number | null;
    extraLicencesPurchased?: number | null;
    settings: Record<string, unknown> | null;
    createdAt: string;
    updatedAt: string;
  };
  adminUser: {
    id: string;
    fullName: string;
    email: string;
    phone: string | null;
    role: 'SUPER_ADMIN';
    isActive: boolean;
    requirePasswordChange: boolean;
    tenantId: string;
    createdAt: string;
    updatedAt: string;
  };
  subscription: {
    id: string;
    tenantId: string;
    paystackPlanCode: string | null;
    paystackSubscriptionCode: string | null;
    interval: 'MONTHLY' | 'YEARLY';
    amount: number;
    currency: string;
    status: 'PENDING_PAYMENT' | 'ACTIVE' | 'PAST_DUE' | 'EXPIRED' | 'CANCELED';
    mode: 'AUTO' | 'MANUAL';
    nextPaymentAt: string | null;
    endedAt: string | null;
    metadata: Record<string, unknown> | null;
    createdAt: string;
    updatedAt: string;
  };
  payment: {
    authorizationUrl: string;
    reference: string;
    accessCode: string;
    amount: number;
  };
};

export type SubscribeTenantRequest = {
  subscriptionMode: 'AUTO' | 'MANUAL';
};

export type SubscribeTenantResponse = {
  payment: {
    authorizationUrl: string;
    reference: string;
    accessCode: string;
    amount: number;
  };
};

export const tenantsService = {
  async registerTenant(data: RegisterTenantRequest): Promise<RegisterTenantResponse> {
    const response = await api.post('/tenants/register', data);
    return response.data.data;
  },

  async getTenant(tenantId: string): Promise<RegisterTenantResponse['tenant']> {
    const response = await api.get(`/tenants/${tenantId}`);
    return response.data.data;
  },

  async subscribe(data: SubscribeTenantRequest): Promise<SubscribeTenantResponse> {
    const response = await api.post('/tenants/subscribe', data);
    return response.data.data;
  }
};
