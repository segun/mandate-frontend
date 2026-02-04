import { api } from '../lib/api';
import { UserRole } from '../lib/permissions';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    accessToken: string;
    user: {
      id: string;
      fullName: string;
      email: string;
      role: UserRole;
      tenantId: string;
    };
  };
}

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async getProfile(): Promise<AuthResponse['data']['user']> {
    const response = await api.get('/auth/me');
    return response.data.data;
  },
};
