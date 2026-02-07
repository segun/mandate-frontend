import { api } from '../lib/api';

// --- Types ---

export interface PvcDistribution {
  YES: number;
  NO: number;
  UNKNOWN: number;
}

export interface SupportBreakdown {
  STRONG_SUPPORTER: number;
  LEAN_SUPPORTER: number;
  UNDECIDED: number;
  LEAN_OPPOSITION: number;
  STRONG_OPPOSITION: number;
}

export interface EngagementBreakdown {
  NOT_CONTACTED: number;
  CONTACTED: number;
  FOLLOW_UP: number;
  FOLLOW_UP_NEEDED: number;
  COMMITTED: number;
  MOBILIZED: number;
  UNREACHABLE: number;
}

export interface AreaStatistics {
  id: string;
  name: string;
  voterCount: number;
  pvcReadyCount: number;
  pvcDistribution: PvcDistribution;
  supportBreakdown: SupportBreakdown;
  engagementBreakdown: EngagementBreakdown;
}

export type GeoLevel = 'states' | 'lgas' | 'wards' | 'polling-units';

export interface StatisticsParams {
  sortBy?: string;
  limit?: number;
}

// --- Constants ---

export const LEVEL_LABELS: Record<GeoLevel, string> = {
  states: 'States',
  lgas: 'LGAs',
  wards: 'Wards',
  'polling-units': 'Polling Units',
};

export const NEXT_LEVEL: Record<GeoLevel, GeoLevel | null> = {
  states: 'lgas',
  lgas: 'wards',
  wards: 'polling-units',
  'polling-units': null,
};

export const SUPPORT_LABELS: Record<string, string> = {
  STRONG_SUPPORTER: 'Strong Supporter',
  LEAN_SUPPORTER: 'Lean Supporter',
  UNDECIDED: 'Undecided',
  LEAN_OPPOSITION: 'Lean Opposition',
  STRONG_OPPOSITION: 'Strong Opposition',
};

export const ENGAGEMENT_LABELS: Record<string, string> = {
  NOT_CONTACTED: 'Not Contacted',
  CONTACTED: 'Contacted',
  FOLLOW_UP: 'Follow Up',
  FOLLOW_UP_NEEDED: 'Follow Up Needed',
  COMMITTED: 'Committed',
  MOBILIZED: 'Mobilized',
  UNREACHABLE: 'Unreachable',
};

export const PVC_COLORS: Record<string, string> = {
  YES: '#22c55e',
  NO: '#ef4444',
  UNKNOWN: '#6b7280',
};

export const SUPPORT_COLORS: Record<string, string> = {
  STRONG_SUPPORTER: '#22c55e',
  LEAN_SUPPORTER: '#86efac',
  UNDECIDED: '#eab308',
  LEAN_OPPOSITION: '#f97316',
  STRONG_OPPOSITION: '#ef4444',
};

export const ENGAGEMENT_COLORS: Record<string, string> = {
  NOT_CONTACTED: '#6b7280',
  CONTACTED: '#3b82f6',
  FOLLOW_UP: '#8b5cf6',
  FOLLOW_UP_NEEDED: '#f59e0b',
  COMMITTED: '#22c55e',
  MOBILIZED: '#06b6d4',
  UNREACHABLE: '#ef4444',
};

// --- Service ---

export const statisticsService = {
  async getStatesStatistics(params?: StatisticsParams): Promise<AreaStatistics[]> {
    const response = await api.get('/states/statistics', { params });
    return response.data.data;
  },

  async getLgasStatistics(stateId: string, params?: StatisticsParams): Promise<AreaStatistics[]> {
    const response = await api.get('/lgas/statistics', { params: { stateId, ...params } });
    return response.data.data;
  },

  async getWardsStatistics(lgaId: string, params?: StatisticsParams): Promise<AreaStatistics[]> {
    const response = await api.get('/wards/statistics', { params: { lgaId, ...params } });
    return response.data.data;
  },

  async getPollingUnitsStatistics(wardId: string, params?: StatisticsParams): Promise<AreaStatistics[]> {
    const response = await api.get('/polling-units/statistics', { params: { wardId, ...params } });
    return response.data.data;
  },
};
