import { api } from '../lib/api';

// Geo reference data (read-only)
export interface GeoState {
  id: string;
  name: string;
}

export interface GeoLga {
  id: string;
  name: string;
  stateId: string;
}

// Tenant-scoped state (references GeoState)
export interface State {
  id: string;
  geoStateId: string;
  geoState?: GeoState;
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
  lgas?: Lga[];
}

export interface Lga {
  id: string;
  geoLgaId: string;
  geoLga?: GeoLga;
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

// Helper to get state name from nested geoState
export function getStateName(state: State): string {
  return state.geoState?.name || '';
}

export const statesService = {
  async getAll(page = 1, limit = 50, name?: string): Promise<PaginatedResponse<State>> {
    const params: Record<string, unknown> = { page, limit };
    if (name) params.name = name;
    const response = await api.get('/states', { params });
    return response.data;
  },
  async getById(id: string): Promise<State> {
    const response = await api.get(`/states/${id}`);
    return response.data.data;
  },
  async addStates(geoStateIds: string[]): Promise<{ added: State[]; skipped: string[] }> {
    const response = await api.post('/states', { geoStateIds });
    return response.data.data;
  },
  async update(id: string, data: { isActive?: boolean }): Promise<State> {
    const response = await api.patch(`/states/${id}`, data);
    return response.data.data;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/states/${id}`);
  },
  async deleteBulk(stateIds: string[]): Promise<{ removed: string[]; notFound: string[] }> {
    const response = await api.delete('/states/bulk', { data: { stateIds } });
    return response.data.data;
  },
  async assignCoordinator(id: string, coordinatorId: string): Promise<State> {
    const response = await api.post(`/states/${id}/coordinator/${coordinatorId}`);
    return response.data.data;
  },
  async removeCoordinator(id: string): Promise<State> {
    const response = await api.delete(`/states/${id}/coordinator`);
    return response.data.data;
  },
  async getStatistics(id: string) {
    const response = await api.get(`/states/${id}/statistics`);
    return response.data.data;
  },
};
