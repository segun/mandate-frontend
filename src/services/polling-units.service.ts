import { api, DEFAULT_PAGE_LIMIT } from '../lib/api';

export interface Ward {
  id: string;
  geoWardId: string;
  geoWard?: {
    id: string;
    name: string;
  };
  lga?: {
    id: string;
    geoLga?: {
      id: string;
      name: string;
    };
  };
}

export interface PollingUnit {
  id: string;
  name: string;
  code: string;
  address?: string;
  description?: string;
  wardId: string;
  ward?: Ward;
  geoPollingUnitId?: string;
  supervisorId?: string | null;
  supervisor?: {
    id: string;
    fullName: string;
    email: string;
  } | null;
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

// Helper to get ward name from nested ward.geoWard
export function getPollingUnitWardName(unit: PollingUnit): string {
  if (unit.ward?.geoWard?.name) {
    return unit.ward.geoWard.name;
  }
  return 'N/A';
}

// Helper to get LGA name from nested ward.lga.geoLga
export function getPollingUnitLgaName(unit: PollingUnit): string {
  return unit.ward?.lga?.geoLga?.name || '';
}

export const pollingUnitsService = {
  async getAll(page = 1, limit = DEFAULT_PAGE_LIMIT, wardId?: string, name?: string): Promise<PaginatedResponse<PollingUnit>> {
    const params: Record<string, unknown> = { page, limit };
    if (wardId) params.wardId = wardId;
    if (name) params.name = name;
    const response = await api.get('/polling-units', { params });
    return response.data;
  },
  async search(query: string, page = 1, limit = DEFAULT_PAGE_LIMIT): Promise<PaginatedResponse<PollingUnit>> {
    const response = await api.get('/polling-units/search', { params: { q: query, page, limit } });
    return response.data;
  },
  async getById(id: string): Promise<PollingUnit> {
    const response = await api.get(`/polling-units/${id}`);
    return response.data.data;
  },
  async addPollingUnits(geoPollingUnitIds: string[]): Promise<{ added: PollingUnit[]; skipped: string[] }> {
    const response = await api.post('/polling-units/bulk', { geoPollingUnitIds });
    return response.data.data;
  },
  async create(data: { name: string; code: string; wardId: string; address?: string; description?: string }): Promise<PollingUnit> {
    const response = await api.post('/polling-units', data);
    return response.data.data;
  },
  async update(id: string, data: Partial<{ name: string; code: string; address: string; description: string; isActive: boolean }>): Promise<PollingUnit> {
    const response = await api.patch(`/polling-units/${id}`, data);
    return response.data.data;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/polling-units/${id}`);
  },
  async assignSupervisor(id: string, supervisorId: string): Promise<PollingUnit> {
    const response = await api.post(`/polling-units/${id}/supervisor/${supervisorId}`);
    return response.data.data;
  },
  async removeSupervisor(id: string): Promise<PollingUnit> {
    const response = await api.delete(`/polling-units/${id}/supervisor`);
    return response.data.data;
  },
  async getStatistics(id: string) {
    const response = await api.get(`/polling-units/${id}/statistics`);
    return response.data.data;
  },
  async createPollingUnitByName(data: { name: string; code: string; geoStateId: string; geoLgaId: string; geoWardId: string; address?: string; description?: string; supervisorId?: string }): Promise<PollingUnit> {
    const response = await api.post('/polling-units/create-by-name', data);
    return response.data.data || response.data;
  },
};
