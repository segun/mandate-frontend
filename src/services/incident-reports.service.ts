import { api } from '../lib/api';

export type IncidentMediaType = 'IMAGE' | 'VIDEO' | 'AUDIO';

interface IncidentLocation {
  id: string;
  name: string;
}

interface IncidentPollingUnit {
  id: string;
  name: string;
  code?: string;
}

interface IncidentReporter {
  id: string;
  fullName: string;
  role: string;
}

export interface IncidentReport {
  id: string;
  tenantId: string;
  reportedByUserId: string;
  stateId: string;
  lgaId: string;
  wardId: string;
  pollingUnitId: string;
  state?: IncidentLocation;
  lga?: IncidentLocation;
  ward?: IncidentLocation;
  pollingUnit?: IncidentPollingUnit;
  reportedBy?: IncidentReporter;
  datetimeReported: string;
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

export interface IncidentUploadFailure {
  fileName: string;
  error: string;
}

export interface IncidentUploadMeta {
  totalFiles: number;
  successfulUploads: number;
  failedUploads: number;
  failed: IncidentUploadFailure[];
}

export interface IncidentUploadBatchResult {
  data: IncidentReport[];
  message?: string;
  meta?: IncidentUploadMeta;
}

export const incidentReportsService = {
  async upload(payload: {
    files: File[];
    stateId: string;
    lgaId: string;
    wardId: string;
    pollingUnitId: string;
    datetimeReported?: string;
    description?: string;
  }): Promise<IncidentUploadBatchResult> {
    const formData = new FormData();
    payload.files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('stateId', payload.stateId);
    formData.append('lgaId', payload.lgaId);
    formData.append('wardId', payload.wardId);
    formData.append('pollingUnitId', payload.pollingUnitId);
    if (payload.datetimeReported) {
      formData.append('datetimeReported', payload.datetimeReported);
    }
    if (payload.description) {
      formData.append('description', payload.description);
    }

    const response = await api.post<ApiResponse<IncidentReport[], IncidentUploadMeta>>('/incident-reports', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return {
      data: response.data.data,
      message: response.data.message,
      meta: response.data.meta,
    };
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
