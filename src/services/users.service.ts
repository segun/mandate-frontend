import { api } from '../lib/api';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
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

export const usersService = {
  async getAll(page = 1, limit = 50): Promise<PaginatedResponse<User>> {
    const response = await api.get('/users', { params: { page, limit } });
    return response.data;
  },
  async search(query: string, page = 1, limit = 50): Promise<PaginatedResponse<User>> {
    const response = await api.get('/users/search', { params: { q: query, page, limit } });
    return response.data;
  },
  async getById(id: string): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data.data;
  },
  async create(data: Partial<User>): Promise<User> {
    const response = await api.post('/users', data);
    return response.data.data;
  },
  async update(id: string, data: Partial<User>): Promise<User> {
    const response = await api.patch(`/users/${id}`, data);
    return response.data.data;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};
