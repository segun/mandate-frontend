/**
 * RBAC Permission System for MANDATE Platform
 * Determines what actions/resources each role can access
 */

export const UserRole = {
  PLATFORM_OWNER: 'PLATFORM_OWNER',
  PLATFORM_ADMIN: 'PLATFORM_ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
  CAMPAIGN_DIRECTOR: 'CAMPAIGN_DIRECTOR',
  DATA_CONTROLLER: 'DATA_CONTROLLER',
  STATE_COORDINATOR: 'STATE_COORDINATOR',
  LGA_COORDINATOR: 'LGA_COORDINATOR',
  WARD_COMMANDER: 'WARD_COMMANDER',
  WARD_OFFICER: 'WARD_OFFICER',
  UNIT_COMMANDER: 'UNIT_COMMANDER',
  FIELD_OFFICER: 'FIELD_OFFICER',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

/**
 * Resource types in the system
 */
export const Resource = {
  DASHBOARD: 'dashboard',
  PLATFORM_TENANTS: 'platform_tenants',
  PLATFORM_GEODATA_UPLOAD: 'platform_geodata_upload',
  STATES: 'states',
  LGAS: 'lgas',
  WARDS: 'wards',
  POLLING_UNITS: 'polling_units',
  VOTERS: 'voters',
  USERS: 'users',
  CHAT: 'chat',
  ELECTION_RESULTS: 'election_results',
  INCIDENT_REPORTS: 'incident_reports',
} as const;

export type Resource = typeof Resource[keyof typeof Resource];

/**
 * Define which roles have access to which resources
 * True = can access, False = cannot access
 */
export const RESOURCE_ACCESS: Record<Resource, UserRole[]> = {
  [Resource.DASHBOARD]: [
    UserRole.PLATFORM_OWNER,
    UserRole.SUPER_ADMIN,
    UserRole.CAMPAIGN_DIRECTOR,
    UserRole.DATA_CONTROLLER,
    UserRole.STATE_COORDINATOR,
    UserRole.LGA_COORDINATOR,
    UserRole.WARD_COMMANDER,
    UserRole.WARD_OFFICER,
    UserRole.UNIT_COMMANDER,
    UserRole.FIELD_OFFICER,
  ],
  [Resource.PLATFORM_TENANTS]: [
    UserRole.PLATFORM_OWNER,
  ],
  [Resource.PLATFORM_GEODATA_UPLOAD]: [
    UserRole.PLATFORM_OWNER,
  ],
  [Resource.STATES]: [
    UserRole.PLATFORM_OWNER,
    UserRole.SUPER_ADMIN,
    UserRole.CAMPAIGN_DIRECTOR,
    UserRole.DATA_CONTROLLER,
    UserRole.STATE_COORDINATOR,
    UserRole.LGA_COORDINATOR,
    UserRole.WARD_COMMANDER,
    UserRole.WARD_OFFICER,
    UserRole.UNIT_COMMANDER,
    UserRole.FIELD_OFFICER,
  ],
  [Resource.LGAS]: [
    UserRole.PLATFORM_OWNER,
    UserRole.SUPER_ADMIN,
    UserRole.CAMPAIGN_DIRECTOR,
    UserRole.DATA_CONTROLLER,
    UserRole.STATE_COORDINATOR,
    UserRole.LGA_COORDINATOR,
    UserRole.WARD_COMMANDER,
    UserRole.WARD_OFFICER,
    UserRole.UNIT_COMMANDER,
    UserRole.FIELD_OFFICER,
  ],
  [Resource.WARDS]: [
    UserRole.PLATFORM_OWNER,
    UserRole.SUPER_ADMIN,
    UserRole.CAMPAIGN_DIRECTOR,
    UserRole.DATA_CONTROLLER,
    UserRole.STATE_COORDINATOR,
    UserRole.LGA_COORDINATOR,
    UserRole.WARD_COMMANDER,
    UserRole.WARD_OFFICER,
    UserRole.UNIT_COMMANDER,
    UserRole.FIELD_OFFICER,
  ],
  [Resource.POLLING_UNITS]: [
    UserRole.PLATFORM_OWNER,
    UserRole.SUPER_ADMIN,
    UserRole.CAMPAIGN_DIRECTOR,
    UserRole.DATA_CONTROLLER,
    UserRole.STATE_COORDINATOR,
    UserRole.LGA_COORDINATOR,
    UserRole.WARD_COMMANDER,
    UserRole.WARD_OFFICER,
    UserRole.UNIT_COMMANDER,
    UserRole.FIELD_OFFICER,
  ],
  [Resource.VOTERS]: [
    UserRole.PLATFORM_OWNER,
    UserRole.SUPER_ADMIN,
    UserRole.CAMPAIGN_DIRECTOR,
    UserRole.DATA_CONTROLLER,
    UserRole.STATE_COORDINATOR,
    UserRole.LGA_COORDINATOR,
    UserRole.WARD_COMMANDER,
    UserRole.WARD_OFFICER,
    UserRole.UNIT_COMMANDER,
    UserRole.FIELD_OFFICER,
  ],
  [Resource.USERS]: [
    UserRole.PLATFORM_OWNER,
    UserRole.SUPER_ADMIN,
    UserRole.CAMPAIGN_DIRECTOR,
    UserRole.DATA_CONTROLLER,
    UserRole.STATE_COORDINATOR,
    UserRole.LGA_COORDINATOR,
    UserRole.WARD_COMMANDER,
  ],
  [Resource.CHAT]: [
    UserRole.PLATFORM_ADMIN,
    UserRole.SUPER_ADMIN,
    UserRole.CAMPAIGN_DIRECTOR,
    UserRole.DATA_CONTROLLER,
    UserRole.STATE_COORDINATOR,
    UserRole.LGA_COORDINATOR,
    UserRole.WARD_COMMANDER,
    UserRole.WARD_OFFICER,
    UserRole.UNIT_COMMANDER,
    UserRole.FIELD_OFFICER,
  ],
  [Resource.ELECTION_RESULTS]: [
    UserRole.SUPER_ADMIN,
    UserRole.CAMPAIGN_DIRECTOR,
    UserRole.DATA_CONTROLLER,
    UserRole.STATE_COORDINATOR,
    UserRole.LGA_COORDINATOR,
    UserRole.WARD_COMMANDER,
    UserRole.WARD_OFFICER,
    UserRole.UNIT_COMMANDER,
    UserRole.FIELD_OFFICER,
  ],
  [Resource.INCIDENT_REPORTS]: [
    UserRole.PLATFORM_ADMIN,
    UserRole.SUPER_ADMIN,
    UserRole.CAMPAIGN_DIRECTOR,
    UserRole.DATA_CONTROLLER,
    UserRole.STATE_COORDINATOR,
    UserRole.LGA_COORDINATOR,
    UserRole.WARD_COMMANDER,
    UserRole.WARD_OFFICER,
    UserRole.UNIT_COMMANDER,
    UserRole.FIELD_OFFICER,
  ],
};

const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.PLATFORM_OWNER]: 0,
  [UserRole.PLATFORM_ADMIN]: 1,
  [UserRole.SUPER_ADMIN]: 2,
  [UserRole.CAMPAIGN_DIRECTOR]: 3,
  [UserRole.DATA_CONTROLLER]: 3,
  [UserRole.STATE_COORDINATOR]: 4,
  [UserRole.LGA_COORDINATOR]: 5,
  [UserRole.WARD_COMMANDER]: 6,
  [UserRole.WARD_OFFICER]: 6,
  [UserRole.UNIT_COMMANDER]: 7,
  [UserRole.FIELD_OFFICER]: 8,
};

/**
 * Check if a role has access to a resource
 */
export function hasAccessToResource(userRole: string | undefined, resource: Resource): boolean {
  if (!userRole) return false;
  const allowedRoles = RESOURCE_ACCESS[resource];
  return allowedRoles.includes(userRole as UserRole);
}

/**
 * Filter nav links based on user role
 */
export function getAccessibleResources(userRole: string | undefined): Resource[] {
  if (!userRole) return [];
  return Object.values(Resource).filter((resource) =>
    hasAccessToResource(userRole, resource)
  );
}

export function isRoleAboveStateCoordinator(userRole: string | undefined): boolean {
  if (!userRole) return false;
  const role = userRole as UserRole;
  const userLevel = ROLE_HIERARCHY[role];
  const stateCoordinatorLevel = ROLE_HIERARCHY[UserRole.STATE_COORDINATOR];
  if (userLevel === undefined) return false;
  return userLevel < stateCoordinatorLevel;
}

export function isSuperAdmin(userRole: string | undefined): boolean {
  return userRole === UserRole.SUPER_ADMIN;
}

export function canManageVotersTenantWide(userRole: string | undefined): boolean {
  return userRole === UserRole.SUPER_ADMIN
    || userRole === UserRole.CAMPAIGN_DIRECTOR
    || userRole === UserRole.DATA_CONTROLLER;
}

export function canAddState(userRole: string | undefined): boolean {
  return userRole === UserRole.SUPER_ADMIN
    || userRole === UserRole.CAMPAIGN_DIRECTOR
    || userRole === UserRole.DATA_CONTROLLER;
}

export function canAddLga(userRole: string | undefined): boolean {
  return userRole === UserRole.SUPER_ADMIN
    || userRole === UserRole.CAMPAIGN_DIRECTOR
    || userRole === UserRole.DATA_CONTROLLER
    || userRole === UserRole.STATE_COORDINATOR;
}

export function canAddWard(userRole: string | undefined): boolean {
  return userRole === UserRole.SUPER_ADMIN
    || userRole === UserRole.CAMPAIGN_DIRECTOR
    || userRole === UserRole.DATA_CONTROLLER
    || userRole === UserRole.STATE_COORDINATOR
    || userRole === UserRole.LGA_COORDINATOR;
}

export function canAddPollingUnit(userRole: string | undefined): boolean {
  return userRole === UserRole.SUPER_ADMIN
    || userRole === UserRole.CAMPAIGN_DIRECTOR
    || userRole === UserRole.DATA_CONTROLLER
    || userRole === UserRole.STATE_COORDINATOR
    || userRole === UserRole.LGA_COORDINATOR;
}
