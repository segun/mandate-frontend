import { api, DEFAULT_PAGE_LIMIT } from '../lib/api';

export type GeoLevel = 'state' | 'lga' | 'ward' | 'polling-unit';

interface ApiMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: ApiMeta;
}

export interface GeodataItem {
  id: string;
  name: string;
  code?: string;
  stateId?: string;
  lgaId?: string;
  wardId?: string;
}

export interface GeodataConflictError {
  success: false;
  message: string;
  details?: {
    code?: string;
    references?: Record<string, number>;
  };
}

export interface GeodataImportJob {
  id: string;
  uploadedByUserId?: string;
  fileName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  processedRows: number;
  skippedRows: number;
  createdStates: number;
  createdLgas: number;
  createdWards: number;
  createdPollingUnits: number;
  updatedPollingUnits: number;
  duplicateRows: number;
  duplicateRowsUrl?: string | null;
  errors: string[] | null;
  failureReason: string | null;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type GeodataImportDuplicateRow = Record<string, unknown> | string | number;

export interface GeodataListParams {
  page?: number;
  limit?: number;
  search?: string;
  stateId?: string;
  lgaId?: string;
  wardId?: string;
}

function sanitizeParams<T extends Record<string, unknown>>(params: T): Record<string, unknown> {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== ''));
}

export const platformGeodataService = {
  async list(level: GeoLevel, params: GeodataListParams = {}): Promise<{ data: GeodataItem[]; meta: ApiMeta }> {
    const query = sanitizeParams({
      page: params.page ?? 1,
      limit: params.limit ?? DEFAULT_PAGE_LIMIT,
      search: params.search,
      stateId: params.stateId,
      lgaId: params.lgaId,
      wardId: params.wardId,
    });

    const response = await api.get<ApiResponse<GeodataItem[]>>(`/platform/geodata/${level}`, { params: query });
    return {
      data: response.data.data,
      meta: response.data.meta || { page: 1, limit: DEFAULT_PAGE_LIMIT, total: 0, totalPages: 1 },
    };
  },

  async create(level: GeoLevel, payload: Record<string, string>): Promise<GeodataItem> {
    const response = await api.post<ApiResponse<GeodataItem>>(`/platform/geodata/${level}`, payload);
    return response.data.data;
  },

  async remove(level: GeoLevel, id: string): Promise<{ message?: string }> {
    const response = await api.delete<ApiResponse<{ message?: string }>>(`/platform/geodata/${level}/${id}`);
    return response.data.data;
  },

  async importCsv(file: File): Promise<GeodataImportJob> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<ApiResponse<GeodataImportJob>>('/platform/geodata/imports', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },

  async getImportJob(id: string): Promise<GeodataImportJob> {
    const response = await api.get<ApiResponse<GeodataImportJob>>(`/platform/geodata/imports/${id}`);
    return response.data.data;
  },

  async listImportJobs(params: { page?: number; limit?: number; status?: string } = {}): Promise<{ data: GeodataImportJob[]; meta: ApiMeta }> {
    const query = sanitizeParams({
      page: params.page ?? 1,
      limit: params.limit ?? DEFAULT_PAGE_LIMIT,
      status: params.status,
    });

    const response = await api.get<ApiResponse<GeodataImportJob[]>>('/platform/geodata/imports', { params: query });
    return {
      data: response.data.data,
      meta: response.data.meta || { page: 1, limit: DEFAULT_PAGE_LIMIT, total: 0, totalPages: 1 },
    };
  },

  async getImportDuplicates(duplicateRowsUrl: string): Promise<GeodataImportDuplicateRow[]> {
    let normalizedUrl = duplicateRowsUrl;

    if (normalizedUrl.startsWith('http://') || normalizedUrl.startsWith('https://')) {
      const parsed = new URL(normalizedUrl);
      normalizedUrl = `${parsed.pathname}${parsed.search}`;
    }

    if (normalizedUrl.startsWith('/api/')) {
      normalizedUrl = normalizedUrl.slice(4);
    }

    const response = await api.get<ApiResponse<GeodataImportDuplicateRow[]> | GeodataImportDuplicateRow[]>(normalizedUrl);
    const payload = response.data;

    if (Array.isArray(payload)) {
      return payload;
    }

    return Array.isArray(payload.data) ? payload.data : [];
  },
};
