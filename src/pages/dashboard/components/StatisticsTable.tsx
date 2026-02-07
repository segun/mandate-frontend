import { useState } from 'react';
import { ChevronRight, ArrowUpDown, Download } from 'lucide-react';
import type { AreaStatistics, GeoLevel } from '../../../services/statistics.service';
import { NEXT_LEVEL, LEVEL_LABELS } from '../../../services/statistics.service';

interface StatisticsTableProps {
  data: AreaStatistics[];
  level: GeoLevel;
  onDrillDown: (item: AreaStatistics) => void;
}

type SortField = 'name' | 'voterCount' | 'pvcReadyCount' | 'pvcPercentage' | 'strongSupporter' | 'engaged';
type SortDirection = 'asc' | 'desc';

function getSortValue(item: AreaStatistics, field: SortField): number | string {
  switch (field) {
    case 'name':
      return item.name;
    case 'voterCount':
      return item.voterCount;
    case 'pvcReadyCount':
      return item.pvcReadyCount;
    case 'pvcPercentage':
      return item.voterCount > 0 ? item.pvcReadyCount / item.voterCount : 0;
    case 'strongSupporter':
      return item.supportBreakdown.STRONG_SUPPORTER;
    case 'engaged':
      return (
        item.engagementBreakdown.CONTACTED +
        item.engagementBreakdown.COMMITTED +
        item.engagementBreakdown.MOBILIZED
      );
  }
}

function exportToCSV(data: AreaStatistics[], levelLabel: string) {
  const headers = [
    'Name', 'Voters', 'PVC Ready', 'PVC %',
    'PVC Yes', 'PVC No', 'PVC Unknown',
    'Strong Supporter', 'Lean Supporter', 'Undecided', 'Lean Opposition', 'Strong Opposition',
    'Not Contacted', 'Contacted', 'Follow Up', 'Follow Up Needed',
    'Committed', 'Mobilized', 'Unreachable',
  ];

  const rows = data.map((item) => [
    `"${item.name}"`,
    item.voterCount,
    item.pvcReadyCount,
    item.voterCount > 0
      ? ((item.pvcReadyCount / item.voterCount) * 100).toFixed(1) + '%'
      : '0%',
    item.pvcDistribution.YES,
    item.pvcDistribution.NO,
    item.pvcDistribution.UNKNOWN,
    item.supportBreakdown.STRONG_SUPPORTER,
    item.supportBreakdown.LEAN_SUPPORTER,
    item.supportBreakdown.UNDECIDED,
    item.supportBreakdown.LEAN_OPPOSITION,
    item.supportBreakdown.STRONG_OPPOSITION,
    item.engagementBreakdown.NOT_CONTACTED,
    item.engagementBreakdown.CONTACTED,
    item.engagementBreakdown.FOLLOW_UP,
    item.engagementBreakdown.FOLLOW_UP_NEEDED,
    item.engagementBreakdown.COMMITTED,
    item.engagementBreakdown.MOBILIZED,
    item.engagementBreakdown.UNREACHABLE,
  ]);

  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${levelLabel.toLowerCase().replace(/\s+/g, '-')}-statistics.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function StatisticsTable({ data, level, onDrillDown }: StatisticsTableProps) {
  const [sortField, setSortField] = useState<SortField>('voterCount');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');
  const canDrillDown = NEXT_LEVEL[level] !== null;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = getSortValue(a, sortField);
    const bVal = getSortValue(b, sortField);
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortDir === 'asc'
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number);
  });

  const renderSortHeader = (field: SortField, label: string) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 text-xs font-semibold text-[#888] uppercase tracking-wider hover:text-white transition-colors whitespace-nowrap"
    >
      {label}
      <ArrowUpDown
        className={`h-3 w-3 ${sortField === field ? 'text-[#ca8a04]' : ''}`}
      />
    </button>
  );

  return (
    <div className="bg-[#141417] rounded-xl border border-[#2a2a2e] shadow-lg overflow-hidden">
      {/* Table header bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2a2e]">
        <h3 className="text-white font-semibold">
          {LEVEL_LABELS[level]} Statistics
          <span className="text-[#666] font-normal ml-2 text-sm">
            ({data.length} items)
          </span>
        </h3>
        <button
          onClick={() => exportToCSV(data, LEVEL_LABELS[level])}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#2a2a2e] text-[#888] text-sm hover:text-white hover:border-[#ca8a04] transition-colors"
        >
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2a2a2e]">
              <th className="text-left px-5 py-3">
                {renderSortHeader('name', 'Name')}
              </th>
              <th className="text-right px-5 py-3">
                {renderSortHeader('voterCount', 'Voters')}
              </th>
              <th className="text-right px-5 py-3">
                {renderSortHeader('pvcReadyCount', 'PVC Ready')}
              </th>
              <th className="text-right px-5 py-3">
                {renderSortHeader('pvcPercentage', 'PVC %')}
              </th>
              <th className="text-right px-5 py-3">
                {renderSortHeader('strongSupporter', 'Strong Sup.')}
              </th>
              <th className="text-right px-5 py-3">
                {renderSortHeader('engaged', 'Engaged')}
              </th>
              {canDrillDown && <th className="px-3 py-3 w-10" />}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, idx) => {
              const pvcPct =
                item.voterCount > 0
                  ? (item.pvcReadyCount / item.voterCount) * 100
                  : 0;
              const engaged =
                item.engagementBreakdown.CONTACTED +
                item.engagementBreakdown.COMMITTED +
                item.engagementBreakdown.MOBILIZED;

              return (
                <tr
                  key={item.id}
                  className={`border-b border-[#1e1e22] transition-colors ${
                    canDrillDown
                      ? 'cursor-pointer hover:bg-[#1a1a1e]'
                      : ''
                  }`}
                  onClick={() => canDrillDown && onDrillDown(item)}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[#555] text-xs w-6 shrink-0 tabular-nums">
                        {idx + 1}.
                      </span>
                      <span className="text-white font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="text-right px-5 py-3 text-[#ccc] tabular-nums">
                    {item.voterCount.toLocaleString()}
                  </td>
                  <td className="text-right px-5 py-3 text-[#ccc] tabular-nums">
                    {item.pvcReadyCount.toLocaleString()}
                  </td>
                  <td className="text-right px-5 py-3">
                    <span
                      className={`tabular-nums font-medium ${
                        pvcPct >= 70
                          ? 'text-green-400'
                          : pvcPct >= 40
                            ? 'text-yellow-400'
                            : 'text-red-400'
                      }`}
                    >
                      {pvcPct.toFixed(1)}%
                    </span>
                  </td>
                  <td className="text-right px-5 py-3 text-[#ccc] tabular-nums">
                    {item.supportBreakdown.STRONG_SUPPORTER.toLocaleString()}
                  </td>
                  <td className="text-right px-5 py-3 text-[#ccc] tabular-nums">
                    {engaged.toLocaleString()}
                  </td>
                  {canDrillDown && (
                    <td className="px-3 py-3 text-[#555]">
                      <ChevronRight className="h-4 w-4" />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
