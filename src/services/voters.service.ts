import { api } from '../lib/api';

export interface Voter {
  id: string;
  fullName: string;
  phone: string;
  houseAddress: string;
  pvcNumber?: string;
  pvcStatus: string;
  supportLevel: string;
  engagementStatus: string;
  votingCommitment: string;
  wardId: string;
  pollingUnitId: string;
  assignedCanvasserId: string;
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

export const votersService = {
  async getAll(page = 1, limit = 20, filters?: Record<string, string>): Promise<PaginatedResponse<Voter>> {
    const response = await api.get('/voters', { params: { page, limit, ...filters } });
    return response.data;
  },

  async getById(id: string): Promise<Voter> {
    const response = await api.get(`/voters/${id}`);
    return response.data.data;
  },

  async search(query: string, page = 1, limit = 20): Promise<PaginatedResponse<Voter>> {
    const response = await api.get('/voters/search', { params: { q: query, page, limit } });
    return response.data;
  },

  async create(data: Partial<Voter>): Promise<Voter> {
    const response = await api.post('/voters', data);
    return response.data.data;
  },

  async update(id: string, data: Partial<Voter>): Promise<Voter> {
    const response = await api.patch(`/voters/${id}`, data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/voters/${id}`);
  },

  async recordContact(id: string, data: { type: string; notes?: string }): Promise<void> {
    await api.post(`/voters/${id}/contacts`, data);
  },
};
