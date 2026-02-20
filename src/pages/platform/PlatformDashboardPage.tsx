import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart3,
  Table2,
  RefreshCw,
  Home,
  ChevronRight,
  Building2,
  Users,
  MapPin,
  Vote,
  ArrowRight,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import {
  platformDashboardService,
  type PlatformGeoLevel,
  type PlatformGeoItem,
  type PlatformGeoDrilldownParams,
} from '../../services/platform-dashboard.service';

type TenantViewMode = 'chart' | 'table';
type TenantStatusFilter = 'ALL' | 'ACTIVE' | 'DISABLED';
type TenantSubscriptionFilter = '' | 'ACTIVE' | 'PENDING_PAYMENT' | 'PAST_DUE' | 'EXPIRED' | 'CANCELED';

interface GeoBreadcrumbItem {
  label: string;
  level: PlatformGeoLevel;
  params: PlatformGeoDrilldownParams;
}

const GEO_LEVEL_LABELS: Record<PlatformGeoLevel, string> = {
  state: 'States',
  lga: 'LGAs',
  ward: 'Wards',
  'polling-unit': 'Polling Units',
};

const NEXT_GEO_LEVEL: Record<PlatformGeoLevel, PlatformGeoLevel | null> = {
  state: 'lga',
  lga: 'ward',
  ward: 'polling-unit',
  'polling-unit': null,
};

function formatNumber(value: number | undefined): string {
  return (value ?? 0).toLocaleString();
}

function formatSubscriptionStatus(status: string): string {
  return status.replace(/_/g, ' ');
}

function mapNextGeoParams(level: PlatformGeoLevel, item: PlatformGeoItem, params: PlatformGeoDrilldownParams): PlatformGeoDrilldownParams {
  if (level === 'state') {
    return { stateId: item.id };
  }

  if (level === 'lga') {
    return {
      stateId: params.stateId,
      lgaId: item.id,
    };
  }

  return {
    stateId: params.stateId,
    lgaId: params.lgaId,
    wardId: item.id,
  };
}

export function PlatformDashboardPage() {
  const user = useAuthStore((state) => state.user);

  const [tenantViewMode, setTenantViewMode] = useState<TenantViewMode>('chart');
  const [tenantPage, setTenantPage] = useState(1);
  const [tenantSearch, setTenantSearch] = useState('');
  const [tenantStatusFilter, setTenantStatusFilter] = useState<TenantStatusFilter>('ALL');
  const [tenantSubscriptionFilter, setTenantSubscriptionFilter] = useState<TenantSubscriptionFilter>('');

  const [geoPage, setGeoPage] = useState(1);
  const [geoSearch, setGeoSearch] = useState('');
  const [geoBreadcrumb, setGeoBreadcrumb] = useState<GeoBreadcrumbItem[]>([
    { label: 'All States', level: 'state', params: {} },
  ]);

  const currentGeoLevel = geoBreadcrumb[geoBreadcrumb.length - 1];

  const tenantIsDisabledFilter = useMemo(() => {
    if (tenantStatusFilter === 'ACTIVE') return false;
    if (tenantStatusFilter === 'DISABLED') return true;
    return undefined;
  }, [tenantStatusFilter]);

  const {
    data: overview,
    isLoading: isOverviewLoading,
    error: overviewError,
    refetch: refetchOverview,
  } = useQuery({
    queryKey: ['platform-stats-overview'],
    queryFn: () => platformDashboardService.getOverview(),
    staleTime: 60_000,
  });

  const {
    data: tenantsResponse,
    isLoading: isTenantsLoading,
    error: tenantsError,
    refetch: refetchTenants,
  } = useQuery({
    queryKey: [
      'platform-stats-tenants',
      tenantPage,
      tenantSearch,
      tenantIsDisabledFilter,
      tenantSubscriptionFilter,
    ],
    queryFn: () =>
      platformDashboardService.getTenants({
        page: tenantPage,
        limit: 20,
        search: tenantSearch.trim() || undefined,
        isDisabled: tenantIsDisabledFilter,
        subscriptionStatus: tenantSubscriptionFilter || undefined,
      }),
    staleTime: 60_000,
  });

  const {
    data: geoOverview,
    isLoading: isGeoOverviewLoading,
    error: geoOverviewError,
    refetch: refetchGeoOverview,
  } = useQuery({
    queryKey: ['platform-stats-geodata-overview'],
    queryFn: () => platformDashboardService.getGeoOverview(),
    staleTime: 60_000,
  });

  const {
    data: geoDrilldown,
    isLoading: isGeoDrilldownLoading,
    error: geoDrilldownError,
    refetch: refetchGeoDrilldown,
  } = useQuery({
    queryKey: [
      'platform-stats-geodata-drilldown',
      currentGeoLevel.level,
      currentGeoLevel.params,
      geoPage,
      geoSearch,
    ],
    queryFn: () =>
      platformDashboardService.getGeoDrilldown(currentGeoLevel.level, {
        page: geoPage,
        limit: 20,
        search: geoSearch.trim() || undefined,
        ...currentGeoLevel.params,
      }),
    staleTime: 60_000,
  });

  const isRefreshing = isOverviewLoading || isTenantsLoading || isGeoOverviewLoading || isGeoDrilldownLoading;
  const tenants = tenantsResponse?.data ?? [];
  const tenantMeta = tenantsResponse?.meta;
  const geoRows = geoDrilldown?.data || [];
  const geoMeta = geoDrilldown?.meta;

  const topTenantChartData = useMemo(() => {
    return [...(tenantsResponse?.data ?? [])]
      .sort((a, b) => (b.stats?.voters ?? 0) - (a.stats?.voters ?? 0))
      .slice(0, 10)
      .map((tenant) => ({
        name: tenant.name,
        voters: tenant.stats?.voters ?? 0,
      }));
  }, [tenantsResponse?.data]);

  const canDrillDown = NEXT_GEO_LEVEL[currentGeoLevel.level] !== null;

  const handleRefresh = () => {
    void refetchOverview();
    void refetchTenants();
    void refetchGeoOverview();
    void refetchGeoDrilldown();
  };

  const handleGeoDrillDown = (item: PlatformGeoItem) => {
    const nextLevel = NEXT_GEO_LEVEL[currentGeoLevel.level];
    if (!nextLevel) return;

    const nextParams = mapNextGeoParams(currentGeoLevel.level, item, currentGeoLevel.params);

    setGeoBreadcrumb((prev) => [
      ...prev,
      {
        label: item.name,
        level: nextLevel,
        params: nextParams,
      },
    ]);
    setGeoPage(1);
    setGeoSearch('');
  };

  const handleGeoBreadcrumbClick = (index: number) => {
    setGeoBreadcrumb((prev) => prev.slice(0, index + 1));
    setGeoPage(1);
    setGeoSearch('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-[#141417] rounded-2xl border border-[#2a2a2e] shadow-lg px-5 sm:px-6 py-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Platform Dashboard</h1>
          <p className="text-[#888] mt-1">Welcome back, {user?.fullName}</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2a2a2e] text-[#888] hover:text-white hover:border-[#ca8a04] transition-colors"
          title="Refresh dashboard"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {overviewError || tenantsError || geoOverviewError || geoDrilldownError ? (
        <div className="bg-[#141417] rounded-xl border border-red-500/30 p-6">
          <p className="text-red-400 font-semibold">Some dashboard data failed to load</p>
          <p className="text-[#888] text-sm mt-1">You can refresh to retry loading overview, tenant, and geodata statistics.</p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Tenants',
            value: formatNumber(overview?.tenants.total),
            icon: Building2,
            iconColor: 'text-blue-400',
            bg: 'bg-blue-400/10',
          },
          {
            label: 'Active Tenants',
            value: formatNumber(overview?.tenants.active),
            icon: Building2,
            iconColor: 'text-green-400',
            bg: 'bg-green-400/10',
          },
          {
            label: 'Platform Users',
            value: formatNumber(overview?.entities.users),
            icon: Users,
            iconColor: 'text-purple-400',
            bg: 'bg-purple-400/10',
          },
          {
            label: 'Total Voters',
            value: formatNumber(overview?.entities.voters),
            icon: Vote,
            iconColor: 'text-[#ca8a04]',
            bg: 'bg-[#ca8a04]/10',
          },
        ].map((card) => (
          <div key={card.label} className="bg-[#141417] rounded-xl border border-[#2a2a2e] p-5 shadow-lg">
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${card.bg}`}>
              <card.icon className={`h-5 w-5 ${card.iconColor}`} />
            </div>
            <p className="text-[#888] text-sm font-medium mt-3">{card.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#141417] rounded-2xl border border-[#2a2a2e] shadow-lg overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-[#2a2a2e] flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Tenant Statistics</h2>
            <p className="text-sm text-[#888]">Tenants with per-tenant users, geodata, and voter counts</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-[#2a2a2e] overflow-hidden">
            <button
              onClick={() => setTenantViewMode('chart')}
              className={`flex items-center gap-2 px-3 py-2 text-sm ${
                tenantViewMode === 'chart' ? 'bg-[#ca8a04] text-black' : 'bg-[#141417] text-[#888] hover:text-white'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Chart
            </button>
            <button
              onClick={() => setTenantViewMode('table')}
              className={`flex items-center gap-2 px-3 py-2 text-sm ${
                tenantViewMode === 'table' ? 'bg-[#ca8a04] text-black' : 'bg-[#141417] text-[#888] hover:text-white'
              }`}
            >
              <Table2 className="h-4 w-4" />
              Table
            </button>
          </div>
        </div>

        <div className="px-5 sm:px-6 py-4 border-b border-[#2a2a2e] bg-[#1a1a1d] flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
          <input
            type="text"
            placeholder="Search tenants..."
            value={tenantSearch}
            onChange={(e) => {
              setTenantPage(1);
              setTenantSearch(e.target.value);
            }}
            className="w-full lg:max-w-sm px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04]"
          />
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={tenantStatusFilter}
              onChange={(e) => {
                setTenantPage(1);
                setTenantStatusFilter(e.target.value as TenantStatusFilter);
              }}
              className="px-3 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
            >
              <option value="ALL">All statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="DISABLED">Disabled</option>
            </select>
            <select
              value={tenantSubscriptionFilter}
              onChange={(e) => {
                setTenantPage(1);
                setTenantSubscriptionFilter(e.target.value as TenantSubscriptionFilter);
              }}
              className="px-3 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
            >
              <option value="">All subscriptions</option>
              <option value="ACTIVE">Active</option>
              <option value="PENDING_PAYMENT">Pending</option>
              <option value="PAST_DUE">Past Due</option>
              <option value="EXPIRED">Expired</option>
              <option value="CANCELED">Canceled</option>
            </select>
            <button
              type="button"
              onClick={() => {
                setTenantPage(1);
                setTenantSearch('');
                setTenantStatusFilter('ALL');
                setTenantSubscriptionFilter('');
              }}
              className="px-3 py-2.5 rounded-lg border border-[#ca8a04]/60 bg-[#1a1a1d] text-[#ca8a04] font-semibold hover:bg-[#2a2a2e] transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {isTenantsLoading ? (
            <p className="text-[#888]">Loading tenant statistics...</p>
          ) : tenants.length === 0 ? (
            <p className="text-[#888]">No tenant statistics found for the selected filters.</p>
          ) : tenantViewMode === 'chart' ? (
            <div style={{ height: 360 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topTenantChartData} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2e" horizontal={false} />
                  <XAxis
                    type="number"
                    stroke="#666"
                    tick={{ fill: '#888', fontSize: 12 }}
                    tickFormatter={(value: number) => value.toLocaleString()}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={170}
                    stroke="#666"
                    tick={{ fill: '#ccc', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1e',
                      border: '1px solid #2a2a2e',
                      borderRadius: '0.5rem',
                    }}
                    formatter={(value: number | string | undefined) => [Number(value ?? 0).toLocaleString(), 'Voters']}
                  />
                  <Bar dataKey="voters" fill="#ca8a04" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1a1a1d] border-b border-[#2a2a2e]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Tenant</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Subscription</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-white">Users</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-white">States</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-white">LGAs</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-white">Wards</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-white">Polling Units</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-white">Voters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2e]">
                  {tenants.map((tenant) => (
                    <tr key={tenant.id} className="hover:bg-[#1a1a1d]/50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-[#ca8a04] font-medium">{tenant.name}</p>
                        <p className="text-xs text-[#888]">{tenant.slug}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#ddd]">{formatSubscriptionStatus(tenant.subscriptionStatus)}</td>
                      <td className="px-4 py-3 text-sm text-right text-[#bbb]">{formatNumber(tenant.stats?.users)}</td>
                      <td className="px-4 py-3 text-sm text-right text-[#bbb]">{formatNumber(tenant.stats?.states)}</td>
                      <td className="px-4 py-3 text-sm text-right text-[#bbb]">{formatNumber(tenant.stats?.lgas)}</td>
                      <td className="px-4 py-3 text-sm text-right text-[#bbb]">{formatNumber(tenant.stats?.wards)}</td>
                      <td className="px-4 py-3 text-sm text-right text-[#bbb]">{formatNumber(tenant.stats?.pollingUnits)}</td>
                      <td className="px-4 py-3 text-sm text-right text-[#bbb]">{formatNumber(tenant.stats?.voters)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {!isTenantsLoading && tenants.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-[#2a2a2e] bg-[#1a1a1d]">
            <button
              onClick={() => setTenantPage((prev) => Math.max(1, prev - 1))}
              disabled={tenantPage === 1}
              className="px-3 py-1.5 text-sm border border-[#2a2a2e] rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2a2e]"
            >
              Previous
            </button>
            <span className="text-sm text-[#888]">Page {tenantPage} of {tenantMeta?.totalPages ?? 1}</span>
            <button
              onClick={() => setTenantPage((prev) => Math.min(tenantMeta?.totalPages ?? 1, prev + 1))}
              disabled={tenantPage >= (tenantMeta?.totalPages ?? 1)}
              className="px-3 py-1.5 text-sm border border-[#2a2a2e] rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2a2e]"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <div className="bg-[#141417] rounded-2xl border border-[#2a2a2e] shadow-lg overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-[#2a2a2e]">
          <h2 className="text-lg font-semibold text-white">Geodata Overview & Drilldown</h2>
          <p className="text-sm text-[#888]">Click through state → lga → ward → polling unit levels</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-6 border-b border-[#2a2a2e]">
          {[
            { label: 'States', value: geoOverview?.states },
            { label: 'LGAs', value: geoOverview?.lgas },
            { label: 'Wards', value: geoOverview?.wards },
            { label: 'Polling Units', value: geoOverview?.pollingUnits },
          ].map((item) => (
            <div key={item.label} className="bg-[#1a1a1d] rounded-lg border border-[#2a2a2e] px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-[#666]">{item.label}</p>
              <p className="text-xl font-semibold text-white mt-1">{isGeoOverviewLoading ? '...' : formatNumber(item.value)}</p>
            </div>
          ))}
        </div>

        <div className="px-5 sm:px-6 py-4 border-b border-[#2a2a2e] bg-[#1a1a1d] space-y-3">
          <nav className="flex items-center gap-1 text-sm flex-wrap">
            {geoBreadcrumb.map((crumb, index) => (
              <div key={`${crumb.level}-${index}`} className="flex items-center gap-1">
                {index > 0 && <ChevronRight className="h-4 w-4 text-[#444]" />}
                <button
                  onClick={() => handleGeoBreadcrumbClick(index)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
                    index === geoBreadcrumb.length - 1
                      ? 'text-[#ca8a04] font-semibold'
                      : 'text-[#888] hover:text-white hover:bg-[#141417]'
                  }`}
                >
                  {index === 0 && <Home className="h-3.5 w-3.5" />}
                  {crumb.label}
                </button>
              </div>
            ))}
            <span className="text-[#444] ml-2">({GEO_LEVEL_LABELS[currentGeoLevel.level]})</span>
          </nav>

          <input
            type="text"
            placeholder={`Search ${GEO_LEVEL_LABELS[currentGeoLevel.level].toLowerCase()}...`}
            value={geoSearch}
            onChange={(e) => setGeoSearch(e.target.value)}
            className="w-full lg:max-w-sm px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04]"
          />
        </div>

        <div className="p-5 sm:p-6">
          {isGeoDrilldownLoading ? (
            <p className="text-[#888]">Loading geodata drilldown...</p>
          ) : geoRows.length === 0 ? (
            <p className="text-[#888]">No records found at this level.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1a1a1d] border-b border-[#2a2a2e]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Name</th>
                    {currentGeoLevel.level === 'polling-unit' && (
                      <th className="px-4 py-3 text-left text-sm font-semibold text-white">Code</th>
                    )}
                    <th className="px-4 py-3 text-right text-sm font-semibold text-white">
                      {currentGeoLevel.level === 'polling-unit' ? 'Child Count' : `Child ${GEO_LEVEL_LABELS[NEXT_GEO_LEVEL[currentGeoLevel.level] || 'polling-unit']}`}
                    </th>
                    {canDrillDown && <th className="px-4 py-3 text-right text-sm font-semibold text-white">Action</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2e]">
                  {geoRows.map((row) => (
                    <tr
                      key={row.id}
                      className={canDrillDown ? 'hover:bg-[#1a1a1d]/50 transition-colors cursor-pointer' : 'hover:bg-[#1a1a1d]/50 transition-colors'}
                      onClick={() => canDrillDown && handleGeoDrillDown(row)}
                    >
                      <td className="px-4 py-3 text-[#ddd]">{row.name}</td>
                      {currentGeoLevel.level === 'polling-unit' && (
                        <td className="px-4 py-3 text-[#bbb]">{row.code || '—'}</td>
                      )}
                      <td className="px-4 py-3 text-right text-[#bbb]">{formatNumber(row.childCount)}</td>
                      {canDrillDown && (
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleGeoDrillDown(row);
                            }}
                            className="inline-flex items-center gap-1 text-[#ca8a04] hover:text-[#d49b2a] text-sm"
                          >
                            Drill down
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {!isGeoDrilldownLoading && geoRows.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-[#2a2a2e] bg-[#1a1a1d]">
            <button
              onClick={() => setGeoPage((prev) => Math.max(1, prev - 1))}
              disabled={geoPage === 1}
              className="px-3 py-1.5 text-sm border border-[#2a2a2e] rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2a2e]"
            >
              Previous
            </button>
            <span className="text-sm text-[#888]">Page {geoPage} of {geoMeta?.totalPages ?? 1}</span>
            <button
              onClick={() => setGeoPage((prev) => Math.min(geoMeta?.totalPages ?? 1, prev + 1))}
              disabled={geoPage >= (geoMeta?.totalPages ?? 1)}
              className="px-3 py-1.5 text-sm border border-[#2a2a2e] rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2a2e]"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <div className="bg-[#141417] rounded-2xl border border-[#2a2a2e] p-5 sm:p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <Link
            to="/platform-owner/tenants"
            className="p-4 rounded-xl border border-[#ca8a04]/30 bg-[#1a1a1d] text-white hover:bg-[#ca8a04]/10 hover:border-[#ca8a04] transition-colors"
          >
            <p className="font-semibold text-[#ca8a04]">Manage Tenants</p>
            <p className="text-sm text-[#888] mt-1">View tenant details and account status</p>
          </Link>
          <Link
            to="/platform-owner/geodata"
            className="p-4 rounded-xl border border-[#ca8a04]/30 bg-[#1a1a1d] text-white hover:bg-[#ca8a04]/10 hover:border-[#ca8a04] transition-colors"
          >
            <p className="font-semibold text-[#ca8a04]">Manage Geodata</p>
            <p className="text-sm text-[#888] mt-1">Create, import, and maintain geodata records</p>
          </Link>
        </div>
        <p className="text-xs text-[#666] mt-4 flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          Drilldown data reflects global geodata across all tenants.
        </p>
      </div>
    </div>
  );
}
