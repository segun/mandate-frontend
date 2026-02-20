import { api } from '../lib/api';

export type IncidentMediaType = 'IMAGE' | 'VIDEO' | 'AUDIO';

export interface IncidentReport {
  id: string;
  tenantId: string;
  reportedByUserId: string;
  mediaType: IncidentMediaType;
  sourceFileName: string;
  mimeType: string;
  fileSizeBytes: number;
  fileHashSha256: string;
  storageProvider: string;
  storageBucket: string;
  storageObjectKey: string;
  storageRegion: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  mediaUrl: string;
  downloadUrl?: string | null;
}

export interface IncidentReportsMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface ApiResponse<T, M = undefined> {
  success: boolean;
  data: T;
  message?: string;
  meta?: M;
}

export const incidentReportsService = {
  async upload(file: File, description?: string): Promise<IncidentReport> {
    const formData = new FormData();
    formData.append('file', file);
    if (description) {
      formData.append('description', description);
    }

    const response = await api.post<ApiResponse<IncidentReport>>('/incident-reports', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },

  async list(params: {
    page?: number;
    limit?: number;
    mediaType?: IncidentMediaType;
  } = {}): Promise<{ data: IncidentReport[]; meta: IncidentReportsMeta }> {
    const query = Object.fromEntries(
      Object.entries({
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        mediaType: params.mediaType,
      }).filter(([, value]) => value !== undefined),
    );

    const response = await api.get<ApiResponse<IncidentReport[], IncidentReportsMeta>>('/incident-reports', {
      params: query,
    });

    return {
      data: response.data.data,
      meta: response.data.meta ?? {
        page: 1,
        limit: params.limit ?? 20,
        total: 0,
        totalPages: 1,
        hasNext: false,
        hasPrevious: false,
      },
    };
  },

  async delete(id: string): Promise<{ deleted: boolean }> {
    const response = await api.delete<ApiResponse<{ deleted: boolean }>>(`/incident-reports/${id}`);
    return response.data.data;
  },
};
