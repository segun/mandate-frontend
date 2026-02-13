import { api, DEFAULT_PAGE_LIMIT } from '../lib/api';

// Geo reference data (read-only)
export interface GeoLga {
  id: string;
  name: string;
  stateId: string;
}

export interface GeoState {
  id: string;
  name: string;
}

export interface State {
  id: string;
  geoStateId: string;
  geoState?: GeoState;
}

// Tenant-scoped LGA (references GeoLga)
export interface LGA {
  id: string;
  geoLgaId: string;
  geoLga?: GeoLga;
  stateId: string;
  state?: State;
  coordinatorId?: string;
  coordinator?: {
    id: string;
    fullName: string;
    email: string;
  };
  isActive: boolean;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
  wards?: Ward[];
}

export interface Ward {
  id: string;
  geoWardId: string;
  geoWard?: { id: string; name: string };
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    data: T[];
  };
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Helper to get LGA name from nested geoLga
export function getLgaName(lga: LGA): string {
  return lga.geoLga?.name || '';
}

// Helper to get state name from nested state.geoState
export function getLgaStateName(lga: LGA): string {
  return lga.state?.geoState?.name || '';
}

export const lgasService = {
  async getAll(stateId?: string, page = 1, limit = DEFAULT_PAGE_LIMIT, name?: string): Promise<PaginatedResponse<LGA>> {
    const params: Record<string, unknown> = { page, limit };
    if (stateId) params.stateId = stateId;
    if (name) params.name = name;
    const response = await api.get('/lgas', { params });
    return response.data;
  },
  async getById(id: string): Promise<LGA> {
    const response = await api.get(`/lgas/${id}`);
    return response.data.data;
  },
  async addLgas(geoLgaIds: string[]): Promise<{ added: LGA[]; skipped: string[] }> {
    const response = await api.post('/lgas', { geoLgaIds });
    return response.data;
  },
  async update(id: string, data: { isActive?: boolean }): Promise<LGA> {
    const response = await api.patch(`/lgas/${id}`, data);
    return response.data;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/lgas/${id}`);
  },
  async deleteBulk(lgaIds: string[]): Promise<{ removed: string[]; notFound: string[] }> {
    const response = await api.delete('/lgas/bulk', { data: { lgaIds } });
    return response.data;
  },
  async assignCoordinator(id: string, coordinatorId: string): Promise<LGA> {
    const response = await api.post(`/lgas/${id}/coordinator/${coordinatorId}`);
    return response.data;
  },
  async removeCoordinator(id: string): Promise<LGA> {
    const response = await api.delete(`/lgas/${id}/coordinator`);
    return response.data;
  },
  async getStatistics(id: string) {
    const response = await api.get(`/lgas/${id}/statistics`);
    return response.data;
  },
  async createLgaByName(name: string, geoStateId: string): Promise<LGA> {
    const response = await api.post('/lgas/create-by-name', { name, geoStateId });
    return response.data.data || response.data;
  },
};
