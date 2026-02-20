import { api, DEFAULT_PAGE_LIMIT } from '../lib/api';

export interface GeoState {
  id: string;
  name: string;
}

export interface GeoLga {
  id: string;
  name: string;
  stateId?: string;
}

export interface State {
  id: string;
  geoStateId: string;
  geoState?: GeoState;
}

export interface LGA {
  id: string;
  geoLgaId: string;
  stateId?: string;
  geoLga?: GeoLga;
}

export interface Ward {
  id: string;
  geoWardId: string;
  lgaId?: string;
  geoWard?: {
    id: string;
    name: string;
    lgaId?: string;
  };
}

export interface PollingUnit {
  id: string;
  geoPollingUnitId: string;
  wardId?: string;
  geoPollingUnit?: {
    id: string;
    name: string;
    wardId?: string;
  };
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
  notes?: string;
  isActive: boolean;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
  state?: State;
  lga?: LGA;
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
  return voter.pollingUnit?.geoPollingUnit?.name || '';
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
    notes: string;
    isActive: boolean;
  }>): Promise<Voter> {
    const response = await api.patch(`/voters/${id}`, data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/voters/${id}`);
  },

  async recordContact(id: string, data: { engagementStatus: string; notes?: string }): Promise<void> {
    await api.post(`/voters/${id}/contact`, data);
  },

  async deactivate(id: string): Promise<void> {
    await api.delete(`/voters/${id}/deactivate`);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getResponsibilityChain(id: string): Promise<any> {
    const response = await api.get(`/voters/${id}/responsibility-chain`);
    return response.data.data;
  },

  async searchAdvanced(
    params: Record<string, string | number | undefined>,
    page = 1,
    limit = DEFAULT_PAGE_LIMIT
  ): Promise<PaginatedResponse<Voter>> {
    const response = await api.get('/voters/search', {
      params: { ...params, page, limit },
    });
    return response.data;
  },

  async findByState(stateId: string, page = 1, limit = DEFAULT_PAGE_LIMIT): Promise<PaginatedResponse<Voter>> {
    const response = await api.get(`/voters/by-state/${stateId}`, {
      params: { page, limit },
    });
    return response.data;
  },

  async findByLga(lgaId: string, page = 1, limit = DEFAULT_PAGE_LIMIT): Promise<PaginatedResponse<Voter>> {
    const response = await api.get(`/voters/by-lga/${lgaId}`, {
      params: { page, limit },
    });
    return response.data;
  },

  async findByWard(wardId: string, page = 1, limit = DEFAULT_PAGE_LIMIT): Promise<PaginatedResponse<Voter>> {
    const response = await api.get(`/voters/by-ward/${wardId}`, {
      params: { page, limit },
    });
    return response.data;
  },

  async findByPollingUnit(pollingUnitId: string, page = 1, limit = DEFAULT_PAGE_LIMIT): Promise<PaginatedResponse<Voter>> {
    const response = await api.get(`/voters/by-polling-unit/${pollingUnitId}`, {
      params: { page, limit },
    });
    return response.data;
  },

  async findByCanvasser(canvasserId: string, page = 1, limit = DEFAULT_PAGE_LIMIT): Promise<PaginatedResponse<Voter>> {
    const response = await api.get(`/voters/by-canvasser/${canvasserId}`, {
      params: { page, limit },
    });
    return response.data;
  },
};
