import { api } from '../lib/api';

export interface State {
  id: string;
  name: string;
  code: string;
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

export const statesService = {
  async getAll(page = 1, limit = 50): Promise<PaginatedResponse<State>> {
    const response = await api.get('/states', { params: { page, limit } });
    return response.data;
  },
  async getById(id: string): Promise<State> {
    const response = await api.get(`/states/${id}`);
    return response.data.data;
  },
  async create(data: Partial<State>): Promise<State> {
    const response = await api.post('/states', data);
    return response.data.data;
  },
  async update(id: string, data: Partial<State>): Promise<State> {
    const response = await api.patch(`/states/${id}`, data);
    return response.data.data;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/states/${id}`);
  },
  async search(query: string, page = 1, limit = 50): Promise<PaginatedResponse<State>> {
    const response = await api.get('/states/search', { params: { q: query, page, limit } });
    return response.data;
  },
};
