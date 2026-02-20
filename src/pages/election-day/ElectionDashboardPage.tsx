import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  electionResultsService,
  type ElectionEvent,
  type ElectionEventDetail,
  type ElectionGeoProgressWard,
  type ElectionUploadStatus,
} from '../../services/election-results.service';
import { toast } from '../../stores/toast.store';

interface StatusCounts {
  PENDING: number;
  PROCESSING: number;
  EXTRACTED: number;
  REVIEW_REQUIRED: number;
  CONFIRMED: number;
  REJECTED: number;
  FAILED: number;
}

const STATUS_COLORS: Record<ElectionUploadStatus, string> = {
  PENDING: '#3b82f6',
  PROCESSING: '#a855f7',
  EXTRACTED: '#06b6d4',
  REVIEW_REQUIRED: '#f59e0b',
  CONFIRMED: '#22c55e',
  REJECTED: '#ec4899',
  FAILED: '#ef4444',
};

const STATUS_LABELS: Record<ElectionUploadStatus, string> = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  EXTRACTED: 'Extracted',
  REVIEW_REQUIRED: 'Review Required',
  CONFIRMED: 'Confirmed',
  REJECTED: 'Rejected',
  FAILED: 'Failed',
};

function formatDateTime(value?: string | null): string {
  if (!value) return '—';
  return new Date(value).toLocaleString();
}

function formatNumber(value?: number | null): string {
  if (value == null) return '—';
  return value.toLocaleString();
}

type DataView = 'table' | 'chart';

function ViewSwitch({
  value,
  onChange,
}: {
  value: DataView;
  onChange: (value: DataView) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border border-[#2a2a2e] overflow-hidden">
      <button
        onClick={() => onChange('table')}
        className={`px-3 py-1.5 text-xs font-semibold ${
          value === 'table' ? 'bg-[#ca8a04] text-[#0d0d0f]' : 'bg-[#1a1a1d] text-[#bbb]'
        }`}
      >
        Table
      </button>
      <button
        onClick={() => onChange('chart')}
        className={`px-3 py-1.5 text-xs font-semibold border-l border-[#2a2a2e] ${
          value === 'chart' ? 'bg-[#ca8a04] text-[#0d0d0f]' : 'bg-[#1a1a1d] text-[#bbb]'
        }`}
      >
        Chart
      </button>
    </div>
  );
}

function WardsSection({
  title,
  wards,
  view,
  onViewChange,
}: {
  title: string;
  wards: ElectionGeoProgressWard[];
  view: DataView;
  onViewChange: (value: DataView) => void;
}) {
  if (!wards.length) {
    return (
      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <ViewSwitch value={view} onChange={onViewChange} />
        </div>
        <div className="p-4 sm:p-6 text-sm text-[#888]">No data available.</div>
      </div>
    );
  }

  return (
    <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
      <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <ViewSwitch value={view} onChange={onViewChange} />
      </div>
      {view === 'table' ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#2a2a2e]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#888] uppercase">Ward</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#888] uppercase">LGA</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#888] uppercase">State</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[#888] uppercase">Total PUs</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[#888] uppercase">Collated</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[#888] uppercase">Completion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2e]">
              {wards.map((ward) => (
                <tr key={ward.wardId}>
                  <td className="px-4 py-3 text-sm text-white">{ward.wardName}</td>
                  <td className="px-4 py-3 text-sm text-[#bbb]">{ward.lgaName}</td>
                  <td className="px-4 py-3 text-sm text-[#bbb]">{ward.stateName}</td>
                  <td className="px-4 py-3 text-sm text-right text-white">{ward.totalPollingUnits}</td>
                  <td className="px-4 py-3 text-sm text-right text-white">{ward.collatedPollingUnits}</td>
                  <td className="px-4 py-3 text-sm text-right text-white">{ward.completionRatePercent.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-4 sm:p-6 space-y-4">
          {wards.map((ward) => (
            <div key={ward.wardId}>
              <div className="flex items-center justify-between gap-3 mb-1">
                <p className="text-sm text-white truncate">{ward.wardName}</p>
                <p className="text-xs text-[#bbb] whitespace-nowrap">
                  {ward.collatedPollingUnits}/{ward.totalPollingUnits} ({ward.completionRatePercent.toFixed(2)}%)
                </p>
              </div>
              <div className="h-2 w-full rounded-full bg-[#0d0d0f] overflow-hidden">
                <div
                  className="h-full bg-[#ca8a04]"
                  style={{ width: `${Math.max(0, Math.min(100, ward.completionRatePercent))}%` }}
                />
              </div>
              <p className="text-xs text-[#888] mt-1">{ward.lgaName}, {ward.stateName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ElectionDashboardPage() {
  const { eventId } = useParams<{ eventId: string }>();

  const [event, setEvent] = useState<ElectionEvent | null>(null);
  const [eventDetail, setEventDetail] = useState<ElectionEventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [partyTotalsView, setPartyTotalsView] = useState<DataView>('chart');
  const [topWardsView, setTopWardsView] = useState<DataView>('chart');
  const [laggingWardsView, setLaggingWardsView] = useState<DataView>('chart');

  const fetchDashboardData = useCallback(async () => {
    if (!eventId) return;
    setLoading(true);
    try {
      const detail = await electionResultsService.getEvent(eventId);
      setEventDetail(detail);
      setEvent(detail.event);
    } catch {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const stats = eventDetail?.stats;
  const recentUploads = eventDetail?.recentUploads.data || [];
  const totalUploads = stats?.totalUploads || 0;
  const confirmedCount = stats?.confirmed || 0;
  const completionRate = totalUploads > 0 ? (confirmedCount / totalUploads) * 100 : 0;
  const failedCount = stats?.failed || 0;

  const statusCounts: StatusCounts = {
    PENDING: stats?.pending || 0,
    PROCESSING: stats?.processing || 0,
    EXTRACTED: stats?.extracted || 0,
    REVIEW_REQUIRED: stats?.reviewRequired || 0,
    CONFIRMED: stats?.confirmed || 0,
    REJECTED: stats?.rejected || 0,
    FAILED: stats?.failed || 0,
  };

  const avgConfidence = useMemo(() => {
    const values = recentUploads
      .map((upload) => upload.overallConfidence)
      .filter((value): value is number => value != null);
    if (!values.length) return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }, [recentUploads]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-[#888]">Loading dashboard...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">
            {event?.name || 'Election Dashboard'}
          </h1>
          <div className="text-sm text-[#888] mt-1 flex items-center gap-2 flex-wrap">
            <span>
              {event
                ? `${event.electionType} — ${new Date(event.electionDate).toLocaleDateString()}`
                : 'Election results overview'}
            </span>
            {event?.status && (
              <span className="px-2 py-0.5 rounded border border-[#2a2a2e] text-xs text-[#bbb]">
                {event.status}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            to="/election-day"
            className="px-3 py-2 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white text-sm font-semibold hover:bg-[#2a2a2e]"
          >
            Back to Events
          </Link>
          {eventId && (
            <Link
              to={`/election-day/${eventId}/uploads`}
              className="px-3 py-2 rounded-lg border border-[#ca8a04]/30 bg-[#ca8a04]/10 text-[#ca8a04] text-sm font-semibold hover:bg-[#ca8a04]/20"
            >
              Manage Uploads
            </Link>
          )}
          <button
            onClick={fetchDashboardData}
            className="px-3 py-2 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white text-sm font-semibold hover:bg-[#2a2a2e]"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-3">
          <h2 className="text-lg font-semibold text-white">Event Metadata</h2>
        </div>
        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          <div><span className="text-[#888]">Event ID:</span> <span className="text-white break-all">{event?.id || '—'}</span></div>
          <div><span className="text-[#888]">Tenant ID:</span> <span className="text-white break-all">{event?.tenantId || '—'}</span></div>
          <div><span className="text-[#888]">Created By:</span> <span className="text-white break-all">{event?.createdByUserId || '—'}</span></div>
          <div><span className="text-[#888]">Created At:</span> <span className="text-white">{formatDateTime(event?.createdAt)}</span></div>
          <div><span className="text-[#888]">Updated At:</span> <span className="text-white">{formatDateTime(event?.updatedAt)}</span></div>
          <div><span className="text-[#888]">Election Date:</span> <span className="text-white">{event?.electionDate || '—'}</span></div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-4 sm:p-5">
          <p className="text-xs text-[#888] uppercase tracking-wide">Total Uploads</p>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-1">{totalUploads}</p>
        </div>
        <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-4 sm:p-5">
          <p className="text-xs text-[#888] uppercase tracking-wide">Confirmed</p>
          <p className="text-2xl sm:text-3xl font-bold text-[#ca8a04] mt-1">{confirmedCount}</p>
          <p className="text-xs text-[#888] mt-1">{completionRate.toFixed(2)}% complete</p>
        </div>
        <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-4 sm:p-5">
          <p className="text-xs text-[#888] uppercase tracking-wide">Needs Review</p>
          <p className="text-2xl sm:text-3xl font-bold text-orange-400 mt-1">{stats?.reviewRequired || 0}</p>
        </div>
        <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-4 sm:p-5">
          <p className="text-xs text-[#888] uppercase tracking-wide">Avg Confidence</p>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-1">
            {avgConfidence > 0 ? `${(avgConfidence * 100).toFixed(1)}%` : '—'}
          </p>
        </div>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-3">
          <h2 className="text-lg font-semibold text-white">Status Breakdown (All Fields)</h2>
        </div>
        <div className="p-4 sm:p-6">
          <div className="w-full h-6 rounded-full overflow-hidden bg-[#0d0d0f] flex mb-6">
            {(Object.keys(statusCounts) as ElectionUploadStatus[]).map((status) => {
              const count = statusCounts[status];
              if (count === 0 || totalUploads === 0) return null;
              const pct = (count / totalUploads) * 100;
              return (
                <div
                  key={status}
                  style={{ width: `${pct}%`, backgroundColor: STATUS_COLORS[status] }}
                  className="h-full transition-all duration-500"
                  title={`${STATUS_LABELS[status]}: ${count} (${pct.toFixed(1)}%)`}
                />
              );
            })}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(Object.keys(statusCounts) as ElectionUploadStatus[]).map((status) => (
              <div key={status} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: STATUS_COLORS[status] }} />
                <span className="text-sm text-[#bbb]">
                  {STATUS_LABELS[status]}: <span className="font-semibold text-white">{statusCounts[status]}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-4">
          <p className="text-xs text-[#888] uppercase tracking-wide">Collated Results</p>
          <p className="text-2xl font-bold text-white mt-1">{formatNumber(eventDetail?.collation?.totalCollatedResults)}</p>
        </div>
        <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-4">
          <p className="text-xs text-[#888] uppercase tracking-wide">Registered Voters</p>
          <p className="text-2xl font-bold text-white mt-1">{formatNumber(eventDetail?.collation?.totalRegisteredVoters)}</p>
        </div>
        <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-4">
          <p className="text-xs text-[#888] uppercase tracking-wide">Accredited Voters</p>
          <p className="text-2xl font-bold text-white mt-1">{formatNumber(eventDetail?.collation?.totalAccreditedVoters)}</p>
        </div>
        <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-4">
          <p className="text-xs text-[#888] uppercase tracking-wide">Valid Votes</p>
          <p className="text-2xl font-bold text-white mt-1">{formatNumber(eventDetail?.collation?.totalValidVotes)}</p>
        </div>
        <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-4">
          <p className="text-xs text-[#888] uppercase tracking-wide">Rejected Votes</p>
          <p className="text-2xl font-bold text-white mt-1">{formatNumber(eventDetail?.collation?.totalRejectedVotes)}</p>
        </div>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">Collation Party Totals (All Parties)</h2>
          <ViewSwitch value={partyTotalsView} onChange={setPartyTotalsView} />
        </div>
        {partyTotalsView === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[#2a2a2e]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#888] uppercase">Party</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-[#888] uppercase">Total Votes</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-[#888] uppercase">PU Results Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a2e]">
                {(eventDetail?.collation?.partyTotals || []).map((party) => (
                  <tr key={party.partyName}>
                    <td className="px-4 py-3 text-sm text-white">{party.partyName}</td>
                    <td className="px-4 py-3 text-sm text-right text-white">{party.totalVotes.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-right text-[#bbb]">{party.pollingUnitResultsCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 sm:p-6 space-y-4">
            {(eventDetail?.collation?.partyTotals || [])
              .slice()
              .sort((a, b) => b.totalVotes - a.totalVotes)
              .map((party, _, arr) => {
                const maxVotes = arr[0]?.totalVotes || 1;
                const width = maxVotes > 0 ? (party.totalVotes / maxVotes) * 100 : 0;
                return (
                  <div key={party.partyName}>
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <p className="text-sm text-white">{party.partyName}</p>
                      <p className="text-xs text-[#bbb]">{party.totalVotes.toLocaleString()} votes</p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[#0d0d0f] overflow-hidden">
                      <div className="h-full bg-[#ca8a04]" style={{ width: `${width}%` }} />
                    </div>
                    <p className="text-xs text-[#888] mt-1">{party.pollingUnitResultsCount} polling unit result(s)</p>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-white mb-3">Coverage</h2>
          <div className="space-y-2 text-sm">
            <p><span className="text-[#888]">Total Polling Units:</span> <span className="text-white">{formatNumber(eventDetail?.coverage?.totalPollingUnits)}</span></p>
            <p><span className="text-[#888]">Collated Polling Units:</span> <span className="text-white">{formatNumber(eventDetail?.coverage?.collatedPollingUnits)}</span></p>
            <p><span className="text-[#888]">Completion Rate %:</span> <span className="text-white">{eventDetail?.coverage?.completionRatePercent != null ? `${eventDetail.coverage.completionRatePercent.toFixed(2)}%` : '—'}</span></p>
          </div>
        </div>
        <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-white mb-3">Turnout</h2>
          <div className="space-y-2 text-sm">
            <p><span className="text-[#888]">Accreditation Rate %:</span> <span className="text-white">{eventDetail?.turnout?.accreditationRatePercent != null ? `${eventDetail.turnout.accreditationRatePercent.toFixed(2)}%` : '—'}</span></p>
            <p><span className="text-[#888]">Rejection Rate %:</span> <span className="text-white">{eventDetail?.turnout?.rejectionRatePercent != null ? `${eventDetail.turnout.rejectionRatePercent.toFixed(2)}%` : '—'}</span></p>
            <p><span className="text-[#888]">Avg Valid Votes / Result:</span> <span className="text-white">{eventDetail?.turnout?.averageValidVotesPerCollatedResult != null ? eventDetail.turnout.averageValidVotesPerCollatedResult.toFixed(2) : '—'}</span></p>
          </div>
        </div>
        <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-white mb-3">Lead</h2>
          <div className="space-y-2 text-sm">
            <p><span className="text-[#888]">Leading Party:</span> <span className="text-white">{eventDetail?.lead?.leadingParty || '—'}</span></p>
            <p><span className="text-[#888]">Runner Up:</span> <span className="text-white">{eventDetail?.lead?.runnerUpParty || '—'}</span></p>
            <p><span className="text-[#888]">Lead Votes:</span> <span className="text-white">{formatNumber(eventDetail?.lead?.leadVotes)}</span></p>
            <p><span className="text-[#888]">Lead Percent:</span> <span className="text-white">{eventDetail?.lead?.leadPercent != null ? `${eventDetail.lead.leadPercent.toFixed(2)}%` : '—'}</span></p>
            <p><span className="text-[#888]">Close Race:</span> <span className="text-white">{eventDetail?.lead?.closeRace ? 'Yes' : 'No'}</span></p>
          </div>
        </div>
      </div>

      <WardsSection
        title="Geo Progress — Top Wards"
        wards={eventDetail?.geoProgress?.wards.top || []}
        view={topWardsView}
        onViewChange={setTopWardsView}
      />
      <WardsSection
        title="Geo Progress — Lagging Wards"
        wards={eventDetail?.geoProgress?.wards.lagging || []}
        view={laggingWardsView}
        onViewChange={setLaggingWardsView}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-white mb-3">Quality</h2>
          <div className="space-y-2 text-sm">
            <p><span className="text-[#888]">Low Confidence Threshold:</span> <span className="text-white">{eventDetail?.quality?.lowConfidenceUploads.threshold ?? '—'}</span></p>
            <p><span className="text-[#888]">Low Confidence Count:</span> <span className="text-white">{eventDetail?.quality?.lowConfidenceUploads.count ?? '—'}</span></p>
            <div>
              <p className="text-[#888] mb-1">Review Required By Reason:</p>
              {eventDetail?.quality?.reviewRequiredByReason?.length ? (
                <ul className="space-y-1">
                  {eventDetail.quality.reviewRequiredByReason.map((reason) => (
                    <li key={reason.reason} className="text-white text-xs">{reason.reason}: {reason.count}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#bbb] text-xs">None</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-white mb-3">Operations</h2>
          <div className="space-y-2 text-sm">
            <p><span className="text-[#888]">Oldest Pending Minutes:</span> <span className="text-white">{eventDetail?.operations?.oldestPendingMinutes ?? '—'}</span></p>
            <p><span className="text-[#888]">Avg Upload→Decision (min):</span> <span className="text-white">{eventDetail?.operations?.averageUploadToDecisionMinutes != null ? eventDetail.operations.averageUploadToDecisionMinutes.toFixed(2) : '—'}</span></p>
            <p><span className="text-[#888]">Decisions Last Hour:</span> <span className="text-white">C {eventDetail?.operations?.decisionsLastHour.confirmed ?? 0} / R {eventDetail?.operations?.decisionsLastHour.rejected ?? 0}</span></p>
            <p><span className="text-[#888]">Decisions Last 24h:</span> <span className="text-white">C {eventDetail?.operations?.decisionsLast24Hours.confirmed ?? 0} / R {eventDetail?.operations?.decisionsLast24Hours.rejected ?? 0}</span></p>
          </div>
        </div>

        <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-white mb-3">Anomalies</h2>
          <div className="space-y-2 text-sm">
            <p><span className="text-[#888]">Accredited {'>'} Registered:</span> <span className="text-white">{eventDetail?.anomalies?.accreditedExceedsRegistered ?? 0}</span></p>
            <p><span className="text-[#888]">Total Votes {'>'} Accredited:</span> <span className="text-white">{eventDetail?.anomalies?.totalVotesExceedAccredited ?? 0}</span></p>
            <p><span className="text-[#888]">Party Sum != Valid Votes:</span> <span className="text-white">{eventDetail?.anomalies?.partySumMismatchValidVotes ?? 0}</span></p>
          </div>
        </div>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-3">
          <h2 className="text-lg font-semibold text-white">Trends — Last 7 Days</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#2a2a2e]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#888] uppercase">Date</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[#888] uppercase">Uploads</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[#888] uppercase">Confirmations</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[#888] uppercase">Collated Valid Votes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2e]">
              {(eventDetail?.trends?.last7Days || []).map((point) => (
                <tr key={point.date}>
                  <td className="px-4 py-3 text-sm text-white">{point.date}</td>
                  <td className="px-4 py-3 text-sm text-right text-white">{point.uploads}</td>
                  <td className="px-4 py-3 text-sm text-right text-white">{point.confirmations}</td>
                  <td className="px-4 py-3 text-sm text-right text-white">{point.collatedValidVotes.toLocaleString()}</td>
                </tr>
              ))}
              {(eventDetail?.trends?.last7Days || []).length === 0 && (
                <tr>
                  <td className="px-4 py-3 text-sm text-[#888]" colSpan={4}>No trend data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-3">
          <h2 className="text-lg font-semibold text-white">Recent Uploads</h2>
        </div>
        <div className="p-4 sm:p-6">
          {recentUploads.length === 0 ? (
            <p className="text-sm text-[#888]">No recent uploads.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-[#2a2a2e]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#888] uppercase">File</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#888] uppercase">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-[#888] uppercase">Confidence</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#888] uppercase">Updated</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#888] uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2e]">
                  {recentUploads.map((upload) => (
                    <tr key={upload.id}>
                      <td className="px-4 py-3 text-sm text-white truncate max-w-[300px]">{upload.sourceFileName}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: STATUS_COLORS[upload.status] + '22',
                            color: STATUS_COLORS[upload.status],
                          }}
                        >
                          {upload.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-[#bbb]">
                        {upload.overallConfidence != null
                          ? `${(upload.overallConfidence * 100).toFixed(0)}%`
                          : '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#bbb]">{formatDateTime(upload.processedAt || upload.updatedAt)}</td>
                      <td className="px-4 py-3 text-sm">
                        <Link to={`/election-day/${eventId}/uploads/${upload.id}`} className="text-xs text-[#ca8a04] hover:underline">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {failedCount > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="text-red-400 text-lg shrink-0">⚠</div>
            <div>
              <p className="text-sm font-semibold text-red-300">
                {failedCount} upload{failedCount > 1 ? 's' : ''} failed processing
              </p>
              <p className="text-xs text-red-200/80 mt-1">
                Go to the{' '}
                <Link to={`/election-day/${eventId}/uploads`} className="underline hover:text-red-100">
                  uploads page
                </Link>{' '}
                to review and reprocess failed uploads.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}