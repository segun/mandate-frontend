import { api, DEFAULT_PAGE_LIMIT } from '../lib/api';

// --- Status ---

export type ElectionUploadStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'EXTRACTED'
  | 'REVIEW_REQUIRED'
  | 'CONFIRMED'
  | 'REJECTED'
  | 'FAILED';

export const TERMINAL_STATUSES: ElectionUploadStatus[] = [
  'EXTRACTED',
  'REVIEW_REQUIRED',
  'CONFIRMED',
  'REJECTED',
  'FAILED',
];

// --- Interfaces ---

export interface ElectionEvent {
  id: string;
  tenantId?: string;
  name: string;
  electionType: string;
  electionDate: string;
  status: string;
  createdByUserId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEventPayload {
  name: string;
  electionType: string;
  electionDate: string;
  status?: string;
}

export interface ElectionUpload {
  id: string;
  tenantId?: string;
  eventId: string;
  pollingUnitId: string | null;
  geoPollingUnit?: {
    id: string;
    name: string;
    code: string;
    wardId: string;
    lgaId: string;
    stateId: string;
    geoWard?: {
      id: string;
      name: string;
      lgaId: string;
      stateId: string;
    };
    geoLga?: {
      id: string;
      name: string;
      stateId: string;
    };
    geoState?: {
      id: string;
      name: string;
    };
  };
  uploadedByUserId?: string;
  sourceFileName: string;
  mimeType?: string;
  fileSizeBytes?: number;
  fileHashSha256?: string;
  storageProvider?: string;
  storageBucket?: string;
  storageObjectKey?: string;
  storageRegion?: string;
  downloadUrl?: string | null;
  status: ElectionUploadStatus;
  overallConfidence: number | null;
  failureCode: string | null;
  failureReason: string | null;
  processedAt: string | null;
  createdAt: string;
  updatedAt: string;
  extractedData?: ExtractedData | null;
  extractionValidation?: ExtractionValidation | null;
  extractionEngine?: string | null;
  extractionEngineVersion?: string | null;
}

export interface ExtractedData {
  stateName?: string;
  stateCode?: string;
  lgaName?: string;
  lgaCode?: string;
  wardName?: string;
  wardCode?: string;
  puName?: string;
  puCode?: string;
  electionType?: string;
  votersRegistered?: number;
  votersAccredited?: number;
  validVotes?: number;
  rejectedVotes?: number;
  presidingOfficerName?: string;
  dateSigned?: string;
  partyVotes?: PartyVote[];
}

export interface ExtractionValidation {
  isValid: boolean;
  warnings: string[];
  errors: string[];
}

export interface PartyVote {
  partyName: string;
  votesScored: number;
}

export interface CorrectPayload {
  pollingUnitId: string;
  electionType: string;
  votersRegistered: number;
  votersAccredited: number;
  validVotes: number;
  rejectedVotes: number;
  partyVotes: PartyVote[];
}

export interface ElectionEventStats {
  totalUploads: number;
  pending: number;
  processing: number;
  extracted: number;
  reviewRequired: number;
  confirmed: number;
  rejected: number;
  failed: number;
}

export interface ElectionGeoProgressWard {
  wardId: string;
  wardName: string;
  lgaName: string;
  stateName: string;
  totalPollingUnits: number;
  collatedPollingUnits: number;
  completionRatePercent: number;
}

export interface ElectionTrendPoint {
  date: string;
  uploads: number;
  confirmations: number;
  collatedValidVotes: number;
}

export interface ElectionEventDetail {
  event: ElectionEvent;
  stats: ElectionEventStats;
  collation?: {
    totalCollatedResults: number;
    totalRegisteredVoters: number;
    totalAccreditedVoters: number;
    totalValidVotes: number;
    totalRejectedVotes: number;
    partyTotals: Array<{
      partyName: string;
      totalVotes: number;
      pollingUnitResultsCount: number;
    }>;
  };
  coverage?: {
    totalPollingUnits: number;
    collatedPollingUnits: number;
    completionRatePercent: number;
  };
  turnout?: {
    accreditationRatePercent: number;
    rejectionRatePercent: number;
    averageValidVotesPerCollatedResult: number;
  };
  lead?: {
    leadingParty: string | null;
    runnerUpParty: string | null;
    leadVotes: number;
    leadPercent: number;
    closeRace: boolean;
  };
  geoProgress?: {
    wards: {
      top: ElectionGeoProgressWard[];
      lagging: ElectionGeoProgressWard[];
    };
  };
  quality?: {
    reviewRequiredByReason: Array<{
      reason: string;
      count: number;
    }>;
    lowConfidenceUploads: {
      threshold: number;
      count: number;
    };
  };
  operations?: {
    oldestPendingMinutes: number | null;
    averageUploadToDecisionMinutes: number;
    decisionsLastHour: {
      confirmed: number;
      rejected: number;
    };
    decisionsLast24Hours: {
      confirmed: number;
      rejected: number;
    };
  };
  anomalies?: {
    accreditedExceedsRegistered: number;
    totalVotesExceedAccredited: number;
    partySumMismatchValidVotes: number;
  };
  trends?: {
    last7Days: ElectionTrendPoint[];
  };
  recentActivity?: Array<{
    uploadId: string;
    status: ElectionUploadStatus;
    sourceFileName: string;
    pollingUnitId: string | null;
    occurredAt: string;
  }>;
  recentUploads: {
    data: ElectionUpload[];
    meta: ApiMeta;
  };
}

export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: ApiMeta;
}

// --- Helpers ---

function sanitizeParams<T extends Record<string, unknown>>(params: T): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  );
}

// --- Service ---

export const electionResultsService = {
  // -------- Events --------

  async createEvent(payload: CreateEventPayload): Promise<ElectionEvent> {
    const response = await api.post<ApiResponse<ElectionEvent>>(
      '/election-results/events',
      payload,
    );
    return response.data.data;
  },

  async listEvents(
    params: { page?: number; limit?: number; status?: string } = {},
  ): Promise<{ data: ElectionEvent[]; meta: ApiMeta }> {
    const query = sanitizeParams({
      page: params.page ?? 1,
      limit: params.limit ?? DEFAULT_PAGE_LIMIT,
      status: params.status,
    });
    const response = await api.get<ApiResponse<ElectionEvent[]>>(
      '/election-results/events',
      { params: query },
    );
    return {
      data: response.data.data,
      meta: response.data.meta || { page: 1, limit: DEFAULT_PAGE_LIMIT, total: 0, totalPages: 1, hasNext: false, hasPrevious: false },
    };
  },

  async getEvent(id: string): Promise<ElectionEventDetail> {
    const response = await api.get<ApiResponse<ElectionEventDetail>>(
      `/election-results/events/${id}`,
    );
    return response.data.data;
  },

  // -------- Uploads --------

  async uploadForm(eventId: string, file: File): Promise<ElectionUpload> {
    const formData = new FormData();
    formData.append('eventId', eventId);
    formData.append('file', file);

    const response = await api.post<ApiResponse<ElectionUpload>>(
      '/election-results/uploads',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
    return response.data.data;
  },

  async listUploads(
    params: { page?: number; limit?: number; eventId?: string; status?: string } = {},
  ): Promise<{ data: ElectionUpload[]; meta: ApiMeta }> {
    const query = sanitizeParams({
      page: params.page ?? 1,
      limit: params.limit ?? DEFAULT_PAGE_LIMIT,
      eventId: params.eventId,
      status: params.status,
    });
    const response = await api.get<ApiResponse<ElectionUpload[]>>(
      '/election-results/uploads',
      { params: query },
    );
    return {
      data: response.data.data,
      meta: response.data.meta || { page: 1, limit: DEFAULT_PAGE_LIMIT, total: 0, totalPages: 1, hasNext: false, hasPrevious: false },
    };
  },

  async getUpload(id: string): Promise<ElectionUpload> {
    const response = await api.get<ApiResponse<ElectionUpload>>(
      `/election-results/uploads/${id}`,
    );
    return response.data.data;
  },

  // -------- Actions --------

  async reprocess(uploadId: string): Promise<ElectionUpload> {
    const response = await api.post<ApiResponse<ElectionUpload>>(
      '/election-results/uploads/reprocess',
      { uploadId },
    );
    return response.data.data;
  },

  async approve(uploadId: string, pollingUnitId: string): Promise<ElectionUpload> {
    const response = await api.post<ApiResponse<ElectionUpload>>(
      `/election-results/uploads/${uploadId}/approve`,
      { pollingUnitId },
    );
    return response.data.data;
  },

  async reject(uploadId: string, reason: string): Promise<ElectionUpload> {
    const response = await api.post<ApiResponse<ElectionUpload>>(
      `/election-results/uploads/${uploadId}/reject`,
      { reason },
    );
    return response.data.data;
  },

  async correct(uploadId: string, payload: CorrectPayload): Promise<ElectionUpload> {
    const response = await api.post<ApiResponse<ElectionUpload>>(
      `/election-results/uploads/${uploadId}/correct`,
      payload,
    );
    return response.data.data;
  },
};
