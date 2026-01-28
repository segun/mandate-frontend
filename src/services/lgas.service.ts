import { api } from '../lib/api';

export interface LGA {
  id: string;
  name: string;
  code: string;
  stateId: string;
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

export const lgasService = {
  async getAll(stateId?: string, page = 1, limit = 50): Promise<PaginatedResponse<LGA>> {
    const params: { page: number; limit: number; stateId?: string } = { page, limit };
    if (stateId && stateId !== '1') params.stateId = stateId;
    const response = await api.get('/lgas', { params });
    return response.data;
  },
  async getById(id: string): Promise<LGA> {
    const response = await api.get(`/lgas/${id}`);
    return response.data.data;
  },
  async create(data: Partial<LGA>): Promise<LGA> {
    const response = await api.post('/lgas', data);
    return response.data.data;
  },
  async update(id: string, data: Partial<LGA>): Promise<LGA> {
    const response = await api.patch(`/lgas/${id}`, data);
    return response.data.data;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/lgas/${id}`);
  },
  async search(query: string, stateId?: string, page = 1, limit = 50): Promise<PaginatedResponse<LGA>> {
    const params: { q: string; page: number; limit: number; stateId?: string } = { q: query, page, limit };
    if (stateId && stateId !== '1') params.stateId = stateId;
    const response = await api.get('/lgas/search', { params });
    return response.data;
  },
};
