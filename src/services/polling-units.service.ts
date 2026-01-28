import { api } from '../lib/api';

export interface PollingUnit {
  id: string;
  name: string;
  code: string;
  wardId: string;
  description?: string;
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

export const pollingUnitsService = {
  async getAll(page = 1, limit = 50): Promise<PaginatedResponse<PollingUnit>> {
    const response = await api.get('/polling-units', { params: { page, limit } });
    return response.data;
  },
  async search(query: string, page = 1, limit = 50): Promise<PaginatedResponse<PollingUnit>> {
    const response = await api.get('/polling-units/search', { params: { q: query, page, limit } });
    return response.data;
  },
  async getById(id: string): Promise<PollingUnit> {
    const response = await api.get(`/polling-units/${id}`);
    return response.data.data;
  },
  async create(data: Partial<PollingUnit>): Promise<PollingUnit> {
    const response = await api.post('/polling-units', data);
    return response.data.data;
  },
  async update(id: string, data: Partial<PollingUnit>): Promise<PollingUnit> {
    const response = await api.patch(`/polling-units/${id}`, data);
    return response.data.data;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/polling-units/${id}`);
  },
};
