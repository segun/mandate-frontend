export type TenantStatus = 'ACTIVE' | 'DISABLED';

export interface PlatformTenant {
  id: string;
  name: string;
  slug: string;
  organizationType: string;
  status: TenantStatus;
  usersCount: number;
  votersCount: number;
  statesCount: number;
  createdAt: string;
}

export interface GeoState {
  id: string;
  code: string;
  name: string;
}

export interface GeoLga {
  id: string;
  code: string;
  name: string;
  stateId: string;
  stateName: string;
}

export interface GeoWard {
  id: string;
  code: string;
  name: string;
  lgaId: string;
  lgaName: string;
}

export interface GeoPollingUnit {
  id: string;
  code: string;
  name: string;
  wardId: string;
  wardName: string;
}

export interface TenantUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface TenantVoter {
  id: string;
  fullName: string;
  phone: string;
  pollingUnitName: string;
}

export interface PlatformTenantDetail extends PlatformTenant {
  states: GeoState[];
  lgas: GeoLga[];
  wards: GeoWard[];
  pollingUnits: GeoPollingUnit[];
  users: TenantUser[];
  voters: TenantVoter[];
}

let mockTenants: PlatformTenantDetail[] = [
  {
    id: 'tnt-001',
    name: 'Action Growth Initiative',
    slug: 'action-growth-initiative',
    organizationType: 'POLITICAL_CAMPAIGN',
    status: 'ACTIVE',
    usersCount: 8,
    votersCount: 4560,
    statesCount: 2,
    createdAt: '2025-11-04T10:00:00.000Z',
    states: [
      { id: 'st-1', code: 'LA', name: 'Lagos' },
      { id: 'st-2', code: 'OG', name: 'Ogun' },
    ],
    lgas: [
      { id: 'lga-1', code: 'IKE', name: 'Ikeja', stateId: 'st-1', stateName: 'Lagos' },
      { id: 'lga-2', code: 'YAB', name: 'Yaba', stateId: 'st-1', stateName: 'Lagos' },
      { id: 'lga-3', code: 'ABE', name: 'Abeokuta South', stateId: 'st-2', stateName: 'Ogun' },
    ],
    wards: [
      { id: 'wd-1', code: 'IKE-01', name: 'Ikeja Ward 1', lgaId: 'lga-1', lgaName: 'Ikeja' },
      { id: 'wd-2', code: 'YAB-02', name: 'Sabo Ward', lgaId: 'lga-2', lgaName: 'Yaba' },
      { id: 'wd-3', code: 'ABE-01', name: 'Ake Ward', lgaId: 'lga-3', lgaName: 'Abeokuta South' },
    ],
    pollingUnits: [
      { id: 'pu-1', code: 'IKE-01-A', name: 'Town Hall PU', wardId: 'wd-1', wardName: 'Ikeja Ward 1' },
      { id: 'pu-2', code: 'YAB-02-B', name: 'Sabo Primary School PU', wardId: 'wd-2', wardName: 'Sabo Ward' },
      { id: 'pu-3', code: 'ABE-01-C', name: 'Ake Civic Center PU', wardId: 'wd-3', wardName: 'Ake Ward' },
    ],
    users: [
      { id: 'u-1', fullName: 'Ifeoma Okafor', email: 'ifeoma@agi.org', role: 'SUPER_ADMIN', isActive: true },
      { id: 'u-2', fullName: 'David Yusuf', email: 'david@agi.org', role: 'DATA_CONTROLLER', isActive: true },
      { id: 'u-3', fullName: 'Musa Bello', email: 'musa@agi.org', role: 'STATE_COORDINATOR', isActive: true },
    ],
    voters: [
      { id: 'v-1', fullName: 'Adebayo Ojo', phone: '08030001111', pollingUnitName: 'Town Hall PU' },
      { id: 'v-2', fullName: 'Kemi Lawal', phone: '08030002222', pollingUnitName: 'Sabo Primary School PU' },
      { id: 'v-3', fullName: 'Rita Eze', phone: '08030003333', pollingUnitName: 'Ake Civic Center PU' },
    ],
  },
  {
    id: 'tnt-002',
    name: 'Citizens Reform Network',
    slug: 'citizens-reform-network',
    organizationType: 'NGO_CIVIL_SOCIETY',
    status: 'DISABLED',
    usersCount: 5,
    votersCount: 2100,
    statesCount: 1,
    createdAt: '2025-12-12T14:30:00.000Z',
    states: [{ id: 'st-3', code: 'FC', name: 'FCT' }],
    lgas: [{ id: 'lga-4', code: 'AMAC', name: 'AMAC', stateId: 'st-3', stateName: 'FCT' }],
    wards: [{ id: 'wd-4', code: 'AM-01', name: 'Garki Ward', lgaId: 'lga-4', lgaName: 'AMAC' }],
    pollingUnits: [{ id: 'pu-4', code: 'AM-01-A', name: 'Area 1 PU', wardId: 'wd-4', wardName: 'Garki Ward' }],
    users: [
      { id: 'u-4', fullName: 'Grace Danjuma', email: 'grace@crn.org', role: 'SUPER_ADMIN', isActive: false },
      { id: 'u-5', fullName: 'John Obi', email: 'john@crn.org', role: 'WARD_COMMANDER', isActive: false },
    ],
    voters: [{ id: 'v-4', fullName: 'Chike Obi', phone: '08030004444', pollingUnitName: 'Area 1 PU' }],
  },
];

export function getPlatformTenants(): PlatformTenant[] {
  return mockTenants.map(({ states, lgas, wards, pollingUnits, users, voters, ...tenant }) => ({
    ...tenant,
    statesCount: states.length,
    usersCount: users.length,
    votersCount: voters.length,
  }));
}

export function getPlatformTenantById(id: string): PlatformTenantDetail | undefined {
  return mockTenants.find((tenant) => tenant.id === id);
}

export function setTenantStatus(id: string, status: TenantStatus): PlatformTenantDetail | undefined {
  mockTenants = mockTenants.map((tenant) => (tenant.id === id ? { ...tenant, status } : tenant));
  return getPlatformTenantById(id);
}
