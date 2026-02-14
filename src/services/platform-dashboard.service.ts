import { api, DEFAULT_MODAL_PAGE_LIMIT } from '../lib/api';

interface ApiMeta {
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

export interface PlatformOverview {
  tenants: {
    total: number;
    active: number;
    disabled: number;
  };
  entities: {
    users: number;
    states: number;
    lgas: number;
    wards: number;
    pollingUnits: number;
    voters: number;
  };
  geodata: {
    states: number;
    lgas: number;
    wards: number;
    pollingUnits: number;
  };
}

export interface PlatformStatsTenant {
  id: string;
  name: string;
  slug: string;
  isDisabled: boolean;
  subscriptionStatus: string;
  stats: {
    users: number;
    states: number;
    lgas: number;
    wards: number;
    pollingUnits: number;
    voters: number;
  };
}

export interface PlatformStatsTenantsParams {
  page?: number;
  limit?: number;
  search?: string;
  isDisabled?: boolean;
  subscriptionStatus?: string;
}

export interface PlatformGeoOverview {
  states: number;
  lgas: number;
  wards: number;
  pollingUnits: number;
}

export type PlatformGeoLevel = 'state' | 'lga' | 'ward' | 'polling-unit';

export interface PlatformGeoItem {
  id: string;
  name: string;
  childCount: number;
  code?: string;
}

export interface PlatformGeoDrilldownParams {
  page?: number;
  limit?: number;
  search?: string;
  stateId?: string;
  lgaId?: string;
  wardId?: string;
}

function sanitizeParams<T extends Record<string, unknown>>(params: T): Record<string, unknown> {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== ''));
}

export const platformDashboardService = {
  async getOverview(): Promise<PlatformOverview> {
    const response = await api.get<ApiResponse<PlatformOverview>>('/platform/stats/overview');
    return response.data.data;
  },

  async getTenants(params: PlatformStatsTenantsParams = {}): Promise<{ data: PlatformStatsTenant[]; meta: ApiMeta }> {
    const query = sanitizeParams({
      page: params.page ?? 1,
      limit: params.limit ?? DEFAULT_MODAL_PAGE_LIMIT,
      search: params.search,
      isDisabled: params.isDisabled,
      subscriptionStatus: params.subscriptionStatus,
    });

    const response = await api.get<ApiResponse<PlatformStatsTenant[]>>('/platform/stats/tenants', { params: query });

    return {
      data: response.data.data,
      meta: response.data.meta || { page: 1, limit: DEFAULT_MODAL_PAGE_LIMIT, total: 0, totalPages: 1 },
    };
  },

  async getGeoOverview(): Promise<PlatformGeoOverview> {
    const response = await api.get<ApiResponse<PlatformGeoOverview>>('/platform/stats/geodata/overview');
    return response.data.data;
  },

  async getGeoDrilldown(
    level: PlatformGeoLevel,
    params: PlatformGeoDrilldownParams = {}
  ): Promise<{ data: PlatformGeoItem[]; meta: ApiMeta }> {
    const query = sanitizeParams({
      page: params.page ?? 1,
      limit: params.limit ?? DEFAULT_MODAL_PAGE_LIMIT,
      search: params.search,
      stateId: params.stateId,
      lgaId: params.lgaId,
      wardId: params.wardId,
    });

    const response = await api.get<ApiResponse<PlatformGeoItem[]>>(`/platform/stats/geodata/${level}`, {
      params: query,
    });

    return {
      data: response.data.data,
      meta: response.data.meta || { page: 1, limit: DEFAULT_MODAL_PAGE_LIMIT, total: 0, totalPages: 1 },
    };
  },
};
