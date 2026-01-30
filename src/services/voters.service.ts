import { api, DEFAULT_PAGE_LIMIT } from '../lib/api';

export interface Ward {
  id: string;
  geoWardId: string;
  geoWard?: {
    id: string;
    name: string;
  };
}

export interface PollingUnit {
  id: string;
  name: string;
  code: string;
}

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
  ward?: Ward;
  pollingUnitId: string;
  pollingUnit?: PollingUnit;
  assignedCanvasserId?: string;
  assignedCanvasser?: {
    id: string;
    fullName: string;
  };
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

// Helper to get ward name
export function getVoterWardName(voter: Voter): string {
  return voter.ward?.geoWard?.name || '';
}

// Helper to get polling unit name
export function getVoterPollingUnitName(voter: Voter): string {
  return voter.pollingUnit?.name || '';
}

export const votersService = {
  async getAll(page = 1, limit = DEFAULT_PAGE_LIMIT, filters?: Record<string, string>): Promise<PaginatedResponse<Voter>> {
    const response = await api.get('/voters', { params: { page, limit, ...filters } });
    return response.data;
  },

  async getById(id: string): Promise<Voter> {
    const response = await api.get(`/voters/${id}`);
    return response.data.data;
  },

  async search(query: string, page = 1, limit = DEFAULT_PAGE_LIMIT): Promise<PaginatedResponse<Voter>> {
    const response = await api.get('/voters/search', { params: { q: query, page, limit } });
    return response.data;
  },

  async create(data: {
    fullName: string;
    phone: string;
    houseAddress?: string;
    pvcNumber?: string;
    pvcStatus?: string;
    supportLevel?: string;
    engagementStatus?: string;
    votingCommitment?: string;
    wardId: string;
    pollingUnitId: string;
    assignedCanvasserId?: string;
  }): Promise<Voter> {
    const response = await api.post('/voters', data);
    return response.data.data;
  },

  async update(id: string, data: Partial<{
    fullName: string;
    phone: string;
    houseAddress: string;
    pvcNumber: string;
    pvcStatus: string;
    supportLevel: string;
    engagementStatus: string;
    votingCommitment: string;
    wardId: string;
    pollingUnitId: string;
    assignedCanvasserId: string;
    isActive: boolean;
  }>): Promise<Voter> {
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
