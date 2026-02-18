import { api, DEFAULT_PAGE_LIMIT } from '../lib/api';

// Geo reference data (read-only)
export interface GeoWard {
  id: string;
  name: string;
  lgaId: string;
  stateId: string;
}

export interface GeoLga {
  id: string;
  name: string;
  stateId: string;
}

export interface GeoState {
  id: string;
  name: string;
}

export interface Lga {
  id: string;
  geoLgaId: string;
  geoLga?: GeoLga;
  state?: {
    id: string;
    geoState?: GeoState;
  };
}

// Tenant-scoped Ward (references GeoWard)
export interface Ward {
  id: string;
  geoWardId: string;
  geoWard?: GeoWard;
  lgaId: string;
  lga?: Lga;
  coordinatorId?: string | null;
  coordinator?: {
    id: string;
    fullName: string;
    email: string;
  } | null;
  pollingUnits?: Array<{
    id: string;
    address?: string | null;
    description?: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    tenantId: string;
    wardId: string;
    geoPollingUnitId: string;
    supervisorId?: string | null;
    geoPollingUnit?: {
      id: string;
      name: string;
      code: string;
      wardId: string;
      lgaId: string;
      stateId: string;
    };
  }>;
  isActive: boolean;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Helper to get ward name from nested geoWard
export function getWardName(ward: Ward): string {
  return ward.geoWard?.name || '';
}

// Helper to get LGA name from nested lga.geoLga
export function getWardLgaName(ward: Ward): string {
  return ward.lga?.geoLga?.name || '';
}

// Helper to get state name from nested lga.state.geoState
export function getWardStateName(ward: Ward): string {
  return ward.lga?.state?.geoState?.name || '';
}

export const wardsService = {
  async getAll(page = 1, limit = DEFAULT_PAGE_LIMIT, lgaId?: string, name?: string): Promise<PaginatedResponse<Ward>> {
    const params: Record<string, unknown> = { page, limit };
    if (lgaId) params.lgaId = lgaId;
    if (name) params.name = name;
    const response = await api.get('/wards', { params });
    return response.data;
  },

  async getById(id: string): Promise<Ward> {
    const response = await api.get(`/wards/${id}`);
    return response.data.data || response.data;
  },

  async addWards(geoWardIds: string[]): Promise<{ added: Ward[]; skipped: string[] }> {
    const response = await api.post('/wards', { geoWardIds });
    return response.data.data || response.data;
  },

  async update(id: string, data: { isActive?: boolean }): Promise<Ward> {
    const response = await api.patch(`/wards/${id}`, data);
    return response.data.data || response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/wards/${id}`);
  },

  async deleteBulk(wardIds: string[]): Promise<{ removed: string[]; notFound: string[] }> {
    const response = await api.delete('/wards/bulk', { data: { wardIds } });
    return response.data.data || response.data;
  },

  async assignCoordinator(id: string, coordinatorId: string): Promise<Ward> {
    const response = await api.post(`/wards/${id}/coordinator/${coordinatorId}`);
    return response.data.data || response.data;
  },

  async removeCoordinator(id: string): Promise<Ward> {
    const response = await api.delete(`/wards/${id}/coordinator`);
    return response.data.data || response.data;
  },

  async getStatistics(id: string) {
    const response = await api.get(`/wards/${id}/statistics`);
    return response.data.data || response.data;
  },

  async createWardByName(name: string, geoStateId: string, geoLgaId: string): Promise<Ward> {
    const response = await api.post('/wards/create-by-name', { name, geoStateId, geoLgaId });
    return response.data.data || response.data;
  },
};
