import { api, DEFAULT_PAGE_LIMIT } from '../lib/api';

export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: ApiMeta;
}

export interface PlatformTenant {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  isDisabled: boolean;
  disabledAt: string | null;
  disabledByUserId: string | null;
  subscriptionStatus: string;
  createdAt: string;
  updatedAt: string;
  stats?: {
    users: number;
    states: number;
    lgas: number;
    wards: number;
    pollingUnits: number;
    voters: number;
  };
}

export interface TenantState {
  id: string;
  isActive?: boolean;
  geoState?: {
    id: string;
    name: string;
  };
}

export interface TenantLga {
  id: string;
  isActive?: boolean;
  geoLga?: {
    id: string;
    name: string;
  };
}

export interface TenantWard {
  id: string;
  isActive?: boolean;
  geoWard?: {
    id: string;
    name: string;
  };
}

export interface TenantPollingUnit {
  id: string;
  isActive?: boolean;
  geoPollingUnit?: {
    id: string;
    name: string;
    code?: string;
  };
}

export interface TenantVoter {
  id: string;
  fullName: string;
  phone: string;
  tenantId: string;
}

export interface TenantUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface PlatformListParams {
  page?: number;
  limit?: number;
  search?: string;
  isDisabled?: boolean;
  subscriptionStatus?: string;
}

export interface DrilldownListParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}

export interface TenantUsersParams extends DrilldownListParams {
  role?: string;
}

function sanitizeParams<T extends Record<string, unknown>>(params: T): Record<string, unknown> {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== ''));
}

export const platformTenantsService = {
  async listTenants(params: PlatformListParams = {}): Promise<{ data: PlatformTenant[]; meta: ApiMeta }> {
    const query = sanitizeParams({
      page: params.page ?? 1,
      limit: params.limit ?? DEFAULT_PAGE_LIMIT,
      search: params.search,
      isDisabled: params.isDisabled,
      subscriptionStatus: params.subscriptionStatus,
    });

    const response = await api.get<ApiResponse<PlatformTenant[]>>('/platform/tenants', { params: query });

    return {
      data: response.data.data,
      meta: response.data.meta || { page: 1, limit: DEFAULT_PAGE_LIMIT, total: 0, totalPages: 1 },
    };
  },

  async getTenant(id: string): Promise<PlatformTenant> {
    const response = await api.get<ApiResponse<PlatformTenant>>(`/platform/tenants/${id}`);
    return response.data.data;
  },

  async disableTenant(id: string): Promise<PlatformTenant> {
    const response = await api.patch<ApiResponse<PlatformTenant>>(`/platform/tenants/${id}/disable`);
    return response.data.data;
  },

  async enableTenant(id: string): Promise<PlatformTenant> {
    const response = await api.patch<ApiResponse<PlatformTenant>>(`/platform/tenants/${id}/enable`);
    return response.data.data;
  },

  async listTenantStates(tenantId: string, params: DrilldownListParams = {}): Promise<{ data: TenantState[]; meta: ApiMeta }> {
    const query = sanitizeParams({ page: params.page ?? 1, limit: params.limit ?? DEFAULT_PAGE_LIMIT, search: params.search, isActive: params.isActive });
    const response = await api.get<ApiResponse<TenantState[]>>(`/platform/tenants/${tenantId}/states`, { params: query });
    return {
      data: response.data.data,
      meta: response.data.meta || { page: 1, limit: DEFAULT_PAGE_LIMIT, total: 0, totalPages: 1 },
    };
  },

  async listTenantLgas(tenantId: string, stateId: string, params: DrilldownListParams = {}): Promise<{ data: TenantLga[]; meta: ApiMeta }> {
    const query = sanitizeParams({ page: params.page ?? 1, limit: params.limit ?? DEFAULT_PAGE_LIMIT, search: params.search, isActive: params.isActive });
    const response = await api.get<ApiResponse<TenantLga[]>>(`/platform/tenants/${tenantId}/states/${stateId}/lgas`, { params: query });
    return {
      data: response.data.data,
      meta: response.data.meta || { page: 1, limit: DEFAULT_PAGE_LIMIT, total: 0, totalPages: 1 },
    };
  },

  async listTenantWards(tenantId: string, lgaId: string, params: DrilldownListParams = {}): Promise<{ data: TenantWard[]; meta: ApiMeta }> {
    const query = sanitizeParams({ page: params.page ?? 1, limit: params.limit ?? DEFAULT_PAGE_LIMIT, search: params.search, isActive: params.isActive });
    const response = await api.get<ApiResponse<TenantWard[]>>(`/platform/tenants/${tenantId}/lgas/${lgaId}/wards`, { params: query });
    return {
      data: response.data.data,
      meta: response.data.meta || { page: 1, limit: DEFAULT_PAGE_LIMIT, total: 0, totalPages: 1 },
    };
  },

  async listTenantPollingUnits(tenantId: string, wardId: string, params: DrilldownListParams = {}): Promise<{ data: TenantPollingUnit[]; meta: ApiMeta }> {
    const query = sanitizeParams({ page: params.page ?? 1, limit: params.limit ?? DEFAULT_PAGE_LIMIT, search: params.search, isActive: params.isActive });
    const response = await api.get<ApiResponse<TenantPollingUnit[]>>(`/platform/tenants/${tenantId}/wards/${wardId}/polling-units`, { params: query });
    return {
      data: response.data.data,
      meta: response.data.meta || { page: 1, limit: DEFAULT_PAGE_LIMIT, total: 0, totalPages: 1 },
    };
  },

  async listTenantVoters(tenantId: string, pollingUnitId: string, params: DrilldownListParams = {}): Promise<{ data: TenantVoter[]; meta: ApiMeta }> {
    const query = sanitizeParams({ page: params.page ?? 1, limit: params.limit ?? DEFAULT_PAGE_LIMIT, search: params.search, isActive: params.isActive });
    const response = await api.get<ApiResponse<TenantVoter[]>>(`/platform/tenants/${tenantId}/polling-units/${pollingUnitId}/voters`, { params: query });
    return {
      data: response.data.data,
      meta: response.data.meta || { page: 1, limit: DEFAULT_PAGE_LIMIT, total: 0, totalPages: 1 },
    };
  },

  async listTenantUsers(tenantId: string, params: TenantUsersParams = {}): Promise<{ data: TenantUser[]; meta: ApiMeta }> {
    const query = sanitizeParams({
      page: params.page ?? 1,
      limit: params.limit ?? DEFAULT_PAGE_LIMIT,
      search: params.search,
      isActive: params.isActive,
      role: params.role,
    });
    const response = await api.get<ApiResponse<TenantUser[]>>(`/platform/tenants/${tenantId}/users`, { params: query });
    return {
      data: response.data.data,
      meta: response.data.meta || { page: 1, limit: DEFAULT_PAGE_LIMIT, total: 0, totalPages: 1 },
    };
  },
};
