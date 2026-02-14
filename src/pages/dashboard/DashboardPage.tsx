import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart3, Table2, ChevronRight, Home, RefreshCw } from 'lucide-react';
import { useAuthStore } from '../../stores/auth.store';
import {
  statisticsService,
  LEVEL_LABELS,
  NEXT_LEVEL,
} from '../../services/statistics.service';
import type { AreaStatistics, GeoLevel } from '../../services/statistics.service';
import { SummaryCards } from './components/SummaryCards';
import { PerformanceChart } from './components/PerformanceChart';
import { BreakdownCharts } from './components/BreakdownCharts';
import { StatisticsTable } from './components/StatisticsTable';
import { TenantStatisticsSection } from './components/TenantStatisticsSection';

interface BreadcrumbItem {
  label: string;
  level: GeoLevel;
  parentId?: string;
}

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItem[]>([
    { label: 'All States', level: 'states' },
  ]);

  const currentLevel = breadcrumb[breadcrumb.length - 1];

  const {
    data: tenantStats,
    isLoading: isTenantStatsLoading,
    error: tenantStatsError,
    refetch: refetchTenantStats,
  } = useQuery({
    queryKey: ['tenant-statistics', user?.tenantId],
    queryFn: () => statisticsService.getTenantStatistics(user!.tenantId!),
    enabled: Boolean(user?.tenantId),
    staleTime: 60_000,
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['statistics', currentLevel.level, currentLevel.parentId],
    queryFn: () => {
      switch (currentLevel.level) {
        case 'states':
          return statisticsService.getStatesStatistics();
        case 'lgas':
          return statisticsService.getLgasStatistics(currentLevel.parentId!);
        case 'wards':
          return statisticsService.getWardsStatistics(currentLevel.parentId!);
        case 'polling-units':
          return statisticsService.getPollingUnitsStatistics(currentLevel.parentId!);
      }
    },
    staleTime: 60_000,
  });

  const handleDrillDown = (item: AreaStatistics) => {
    const nextLevel = NEXT_LEVEL[currentLevel.level];
    if (!nextLevel) return;
    setBreadcrumb((prev) => [
      ...prev,
      { label: item.name, level: nextLevel, parentId: item.id },
    ]);
  };

  const handleBreadcrumbClick = (index: number) => {
    setBreadcrumb((prev) => prev.slice(0, index + 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-[#141417] rounded-2xl border border-[#2a2a2e] shadow-lg px-5 sm:px-6 py-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Dashboard</h1>
          <p className="text-[#888] mt-1">Welcome back, {user?.fullName}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex rounded-lg border border-[#2a2a2e] overflow-hidden">
            <button
              onClick={() => setViewMode('chart')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === 'chart'
                  ? 'bg-[#ca8a04] text-black'
                  : 'bg-[#141417] text-[#888] hover:text-white'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Charts
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-[#ca8a04] text-black'
                  : 'bg-[#141417] text-[#888] hover:text-white'
              }`}
            >
              <Table2 className="h-4 w-4" />
              Table
            </button>
          </div>
          <button
            onClick={() => refetch()}
            className="p-2 rounded-lg border border-[#2a2a2e] text-[#888] hover:text-white hover:border-[#ca8a04] transition-colors"
            title="Refresh data"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm flex-wrap">
        {breadcrumb.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="h-4 w-4 text-[#444]" />}
            <button
              onClick={() => handleBreadcrumbClick(index)}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
                index === breadcrumb.length - 1
                  ? 'text-[#ca8a04] font-semibold'
                  : 'text-[#888] hover:text-white hover:bg-[#1a1a1e]'
              }`}
            >
              {index === 0 && <Home className="h-3.5 w-3.5" />}
              {item.label}
            </button>
          </div>
        ))}
        <span className="text-[#444] ml-2">
          ({LEVEL_LABELS[currentLevel.level]})
        </span>
      </nav>

      {/* Content */}
      {isTenantStatsLoading ? (
        <TenantStatisticsSkeleton />
      ) : tenantStatsError ? (
        <ErrorState
          message={
            tenantStatsError instanceof Error
              ? tenantStatsError.message
              : 'Failed to load tenant statistics'
          }
          onRetry={() => refetchTenantStats()}
          title="Unable to load tenant overview"
        />
      ) : tenantStats ? (
        <TenantStatisticsSection tenantStats={tenantStats} />
      ) : null}

      {isLoading ? (
        <LoadingSkeleton />
      ) : error ? (
        <ErrorState
          message={
            error instanceof Error && 'response' in error &&
            typeof (error as { response?: { status?: number } }).response?.status === 'number' &&
            (error as { response?: { status?: number } }).response?.status === 403
              ? "You're not authorized to view these statistics"
              : error instanceof Error
              ? error.message
              : 'Failed to load statistics'
          }
          onRetry={() => refetch()}
          title="Unable to load statistics"
        />
      ) : !data || data.length === 0 ? (
        <EmptyState level={currentLevel.level} />
      ) : (
        <>
          <SummaryCards data={data} level={currentLevel.level} />

          {viewMode === 'chart' ? (
            <div className="space-y-6">
              <PerformanceChart
                data={data}
                level={currentLevel.level}
                onDrillDown={handleDrillDown}
              />
              <BreakdownCharts data={data} />
            </div>
          ) : (
            <StatisticsTable
              data={data}
              level={currentLevel.level}
              onDrillDown={handleDrillDown}
            />
          )}
        </>
      )}

      {/* Quick Actions */}
      <div className="space-y-4 pt-4 border-t border-[#2a2a2e]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#ca8a04]/15 text-[#ca8a04] flex items-center justify-center text-lg">
            ⚡
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
            <p className="text-sm text-[#888]">Move faster on the most common field tasks</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: '/voters/new', title: 'Register Voter', desc: 'Add a new voter to the registry' },
            { href: '/voters', title: 'Search Voters', desc: 'Find and manage existing voters' },
            { href: '/wards', title: 'View Wards', desc: 'Manage ward assignments' },
          ].map((action) => (
            <a
              key={action.title}
              href={action.href}
              className="p-5 rounded-xl border border-[#ca8a04]/30 bg-[#141417] text-white shadow-sm hover:bg-[#ca8a04]/10 hover:border-[#ca8a04] hover:-translate-y-0.5 transition-all group"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold group-hover:text-[#ca8a04]">{action.title}</h3>
                <span className="text-[#ca8a04]">→</span>
              </div>
              <p className="text-sm text-[#888] mt-2">{action.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-[#141417] rounded-xl border border-[#2a2a2e] h-32" />
        ))}
      </div>
      <div className="bg-[#141417] rounded-xl border border-[#2a2a2e] h-80" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-[#141417] rounded-xl border border-[#2a2a2e] h-64" />
        ))}
      </div>
    </div>
  );
}

function TenantStatisticsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-[#141417] rounded-xl border border-[#2a2a2e] h-28" />
        ))}
      </div>
      <div className="bg-[#141417] rounded-xl border border-[#2a2a2e] h-72" />
    </div>
  );
}

function ErrorState({
  message,
  onRetry,
  title = 'Unable to load statistics',
}: {
  message: string;
  onRetry: () => void;
  title?: string;
}) {
  return (
    <div className="bg-[#141417] rounded-xl border border-red-500/30 p-8 text-center">
      <p className="text-red-400 text-lg mb-2">{title}</p>
      <p className="text-[#888] text-sm mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-[#ca8a04] text-black rounded-lg font-medium hover:bg-[#a16207] transition-colors"
      >
        Retry
      </button>
    </div>
  );
}

function EmptyState({ level }: { level: GeoLevel }) {
  return (
    <div className="bg-[#141417] rounded-xl border border-[#2a2a2e] p-12 text-center">
      <p className="text-[#888] text-lg">No data available for {LEVEL_LABELS[level]}</p>
      <p className="text-[#666] text-sm mt-2">
        Statistics will appear once voters are registered.
      </p>
    </div>
  );
}
