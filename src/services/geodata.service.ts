import { api, DEFAULT_PAGE_LIMIT } from '../lib/api';

// Geo reference entities (read-only)
export interface GeoState {
  id: string;
  name: string;
}

export interface GeoLga {
  id: string;
  name: string;
  stateId: string;
  state?: GeoState;
}

export interface GeoWard {
  id: string;
  name: string;
  lgaId: string;
  stateId: string;
  lga?: GeoLga;
  state?: GeoState;
}

export interface GeoPollingUnit {
  id: string;
  name: string;
  code: string;
  wardId: string;
  lgaId: string;
  stateId: string;
  ward?: GeoWard;
  lga?: GeoLga;
  state?: GeoState;
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

export const geodataService = {
  // Get all reference states
  async getAllStates(page = 1, limit = DEFAULT_PAGE_LIMIT): Promise<PaginatedResponse<GeoState>> {
    const response = await api.get('/geodata/states', { params: { page, limit } });
    return response.data;
  },

  // Get all reference LGAs
  async getAllLgas(page = 1, limit = DEFAULT_PAGE_LIMIT): Promise<PaginatedResponse<GeoLga>> {
    const response = await api.get('/geodata/lgas', { params: { page, limit } });
    return response.data;
  },

  // Get reference LGAs by state
  async getLgasByState(stateId: string, page = 1, limit = DEFAULT_PAGE_LIMIT): Promise<PaginatedResponse<GeoLga>> {
    const response = await api.get(`/geodata/states/${stateId}/lgas`, { params: { page, limit } });
    return response.data;
  },

  // Get all reference wards
  async getAllWards(page = 1, limit = DEFAULT_PAGE_LIMIT): Promise<PaginatedResponse<GeoWard>> {
    const response = await api.get('/geodata/wards', { params: { page, limit } });
    return response.data;
  },

  // Get reference wards by LGA
  async getWardsByLga(lgaId: string, page = 1, limit = DEFAULT_PAGE_LIMIT): Promise<PaginatedResponse<GeoWard>> {
    const response = await api.get(`/geodata/lgas/${lgaId}/wards`, { params: { page, limit } });
    return response.data;
  },

  // Get reference wards by state
  async getWardsByState(stateId: string, page = 1, limit = DEFAULT_PAGE_LIMIT): Promise<PaginatedResponse<GeoWard>> {
    const response = await api.get(`/geodata/states/${stateId}/wards`, { params: { page, limit } });
    return response.data;
  },

  // Get all reference polling units
  async getAllPollingUnits(page = 1, limit = DEFAULT_PAGE_LIMIT): Promise<PaginatedResponse<GeoPollingUnit>> {
    const response = await api.get('/geodata/polling-units', { params: { page, limit } });
    return response.data;
  },

  // Get reference polling units by ward
  async getPollingUnitsByWard(wardId: string, page = 1, limit = DEFAULT_PAGE_LIMIT): Promise<PaginatedResponse<GeoPollingUnit>> {
    const response = await api.get(`/geodata/wards/${wardId}/polling-units`, { params: { page, limit } });
    return response.data;
  },

  // Get reference polling units by LGA
  async getPollingUnitsByLga(lgaId: string, page = 1, limit = DEFAULT_PAGE_LIMIT): Promise<PaginatedResponse<GeoPollingUnit>> {
    const response = await api.get(`/geodata/lgas/${lgaId}/polling-units`, { params: { page, limit } });
    return response.data;
  },

  // Get reference polling units by state
  async getPollingUnitsByState(stateId: string, page = 1, limit = DEFAULT_PAGE_LIMIT): Promise<PaginatedResponse<GeoPollingUnit>> {
    const response = await api.get(`/geodata/states/${stateId}/polling-units`, { params: { page, limit } });
    return response.data;
  },
};
