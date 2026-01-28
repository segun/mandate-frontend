import { api } from '../lib/api';

export interface Ward {
  id: string;
  name: string;
  code: string;
  description?: string;
  coordinatorId?: string;
  tenantId?: string;
  isActive: boolean;
  createdAt: string;
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

export const wardsService = {
  async getAll(page = 1, limit = 20): Promise<PaginatedResponse<Ward>> {
    const response = await api.get('/wards', { params: { page, limit } });
    return response.data;
  },

  async search(query: string, page = 1, limit = 20): Promise<PaginatedResponse<Ward>> {
    const response = await api.get('/wards/search', { params: { q: query, page, limit } });
    return response.data;
  },

  async getById(id: string): Promise<Ward> {
    const response = await api.get(`/wards/${id}`);
    return response.data.data;
  },

  async create(data: Partial<Ward>): Promise<Ward> {
    const response = await api.post('/wards', data);
    return response.data.data;
  },

  async update(id: string, data: Partial<Ward>): Promise<Ward> {
    const response = await api.patch(`/wards/${id}`, data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/wards/${id}`);
  },

  async getStatistics(id: string) {
    const response = await api.get(`/wards/${id}/statistics`);
    return response.data.data;
  },
};
