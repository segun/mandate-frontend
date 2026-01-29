import { api } from '../lib/api';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: string;
  isActive: boolean;
  tenantId: string;
  parentOfficerId?: string | null;
  parentOfficer?: {
    id: string;
    fullName: string;
  } | null;
  assignedStateId?: string | null;
  assignedState?: {
    id: string;
    geoState?: { name: string };
  } | null;
  assignedLgaId?: string | null;
  assignedLga?: {
    id: string;
    geoLga?: { name: string };
  } | null;
  assignedWardId?: string | null;
  assignedWard?: {
    id: string;
    geoWard?: { name: string };
  } | null;
  assignedPollingUnitId?: string | null;
  assignedPollingUnit?: {
    id: string;
    name: string;
    code: string;
  } | null;
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

// Helper functions to get assigned location names
export function getUserAssignedLocation(user: User): string {
  if (user.assignedPollingUnit) {
    return user.assignedPollingUnit.name;
  }
  if (user.assignedWard?.geoWard) {
    return user.assignedWard.geoWard.name;
  }
  if (user.assignedLga?.geoLga) {
    return user.assignedLga.geoLga.name;
  }
  if (user.assignedState?.geoState) {
    return user.assignedState.geoState.name;
  }
  return '-';
}

export const usersService = {
  async getAll(page = 1, limit = 50, filters?: Record<string, string>): Promise<PaginatedResponse<User>> {
    const response = await api.get('/users', { params: { page, limit, ...filters } });
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
  async create(data: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    role: string;
    parentOfficerId?: string;
    assignedStateId?: string;
    assignedLgaId?: string;
    assignedWardId?: string;
    assignedPollingUnitId?: string;
  }): Promise<User> {
    const response = await api.post('/users', data);
    return response.data.data;
  },
  async update(id: string, data: Partial<{
    fullName: string;
    email: string;
    phone: string;
    role: string;
    isActive: boolean;
    parentOfficerId: string;
    assignedStateId: string;
    assignedLgaId: string;
    assignedWardId: string;
    assignedPollingUnitId: string;
  }>): Promise<User> {
    const response = await api.patch(`/users/${id}`, data);
    return response.data.data;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};
