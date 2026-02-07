import { useState, useMemo } from 'react';
import { ChevronRight, ArrowUpDown, Download } from 'lucide-react';
import type { AreaStatistics, GeoLevel } from '../../../services/statistics.service';
import {
  NEXT_LEVEL, LEVEL_LABELS,
  SUPPORT_LABELS, ENGAGEMENT_LABELS, VOTING_COMMITMENT_LABELS,
} from '../../../services/statistics.service';

interface StatisticsTableProps {
  data: AreaStatistics[];
  level: GeoLevel;
  onDrillDown: (item: AreaStatistics) => void;
}

type SortDirection = 'asc' | 'desc';

interface ColumnDef {
  key: string;
  label: string;
  group: string;
  getValue: (item: AreaStatistics) => number;
}

const PVC_LABELS: Record<string, string> = {
  YES: 'Yes',
  NO: 'No',
  PROCESSING: 'Processing',
  LOST: 'Lost',
  UNKNOWN: 'Unknown',
};

function buildAllColumns(): ColumnDef[] {
  const cols: ColumnDef[] = [];

  for (const key of ['YES', 'NO', 'PROCESSING', 'LOST', 'UNKNOWN']) {
    cols.push({
      key: `pvc_${key}`,
      label: PVC_LABELS[key] || key,
      group: 'PVC',
      getValue: (item) => (item.pvcDistribution as unknown as Record<string, number>)[key] ?? 0,
    });
  }

  for (const key of Object.keys(SUPPORT_LABELS)) {
    cols.push({
      key: `sup_${key}`,
      label: SUPPORT_LABELS[key],
      group: 'Support',
      getValue: (item) => (item.supportBreakdown as unknown as Record<string, number>)[key] ?? 0,
    });
  }

  for (const key of Object.keys(ENGAGEMENT_LABELS)) {
    cols.push({
      key: `eng_${key}`,
      label: ENGAGEMENT_LABELS[key],
      group: 'Engagement',
      getValue: (item) => (item.engagementBreakdown as unknown as Record<string, number>)[key] ?? 0,
    });
  }

  for (const key of Object.keys(VOTING_COMMITMENT_LABELS)) {
    cols.push({
      key: `vc_${key}`,
      label: VOTING_COMMITMENT_LABELS[key],
      group: 'Commitment',
      getValue: (item) => (item.votingCommitmentBreakdown as unknown as Record<string, number>)[key] ?? 0,
    });
  }

  return cols;
}

const ALL_COLUMNS = buildAllColumns();

function exportToCSV(data: AreaStatistics[], levelLabel: string, visibleCols: ColumnDef[]) {
  const headers = ['Name', 'Voters', 'PVC Ready', 'PVC %', ...visibleCols.map((c) => c.label)];

  const rows = data.map((item) => [
    `"${item.name}"`,
    item.voterCount,
    item.pvcReadyCount,
    item.voterCount > 0
      ? ((item.pvcReadyCount / item.voterCount) * 100).toFixed(1) + '%'
      : '0%',
    ...visibleCols.map((c) => c.getValue(item)),
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
  const [sortKey, setSortKey] = useState<string>('voterCount');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');
  const canDrillDown = NEXT_LEVEL[level] !== null;

  // Only show breakdown columns where at least one row has a value > 0
  const visibleColumns = useMemo(() => {
    return ALL_COLUMNS.filter((col) => data.some((item) => col.getValue(item) > 0));
  }, [data]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      let aVal: number | string;
      let bVal: number | string;

      if (sortKey === 'name') {
        aVal = a.name;
        bVal = b.name;
      } else if (sortKey === 'voterCount') {
        aVal = a.voterCount;
        bVal = b.voterCount;
      } else if (sortKey === 'pvcReadyCount') {
        aVal = a.pvcReadyCount;
        bVal = b.pvcReadyCount;
      } else if (sortKey === 'pvcPercentage') {
        aVal = a.voterCount > 0 ? a.pvcReadyCount / a.voterCount : 0;
        bVal = b.voterCount > 0 ? b.pvcReadyCount / b.voterCount : 0;
      } else {
        const col = ALL_COLUMNS.find((c) => c.key === sortKey);
        aVal = col ? col.getValue(a) : 0;
        bVal = col ? col.getValue(b) : 0;
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDir === 'asc'
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
  }, [data, sortKey, sortDir]);

  const renderSortHeader = (key: string, label: string, align: 'left' | 'right' = 'right') => (
    <button
      onClick={() => handleSort(key)}
      className={`flex items-center gap-1 text-xs font-semibold text-[#888] uppercase tracking-wider hover:text-white transition-colors whitespace-nowrap ${
        align === 'right' ? 'ml-auto' : ''
      }`}
    >
      {label}
      <ArrowUpDown
        className={`h-3 w-3 ${sortKey === key ? 'text-[#ca8a04]' : ''}`}
      />
    </button>
  );

  // Group visible columns for the group header row
  const groups = useMemo(() => {
    const result: { name: string; count: number }[] = [];
    for (const col of visibleColumns) {
      const last = result[result.length - 1];
      if (last && last.name === col.group) {
        last.count++;
      } else {
        result.push({ name: col.group, count: 1 });
      }
    }
    return result;
  }, [visibleColumns]);

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
          onClick={() => exportToCSV(data, LEVEL_LABELS[level], visibleColumns)}
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
            {/* Group header row */}
            <tr className="border-b border-[#3a3a3e]">
              <th colSpan={4} className="border-r border-[#3a3a3e]" />
              {groups.map((g, i) => (
                <th
                  key={i}
                  colSpan={g.count}
                  className={`text-center px-2 py-2 text-[10px] font-bold text-[#ca8a04] uppercase tracking-widest border-l-2 border-[#ca8a04]/40${i < groups.length - 1 ? ' border-r-2 border-r-[#ca8a04]/40' : ''}`}
                >
                  {g.name}
                </th>
              ))}
              {canDrillDown && <th />}
            </tr>
            {/* Column header row */}
            <tr className="border-b border-[#2a2a2e]">
              <th className="text-left px-5 py-3 sticky left-0 bg-[#141417] z-10">
                {renderSortHeader('name', 'Name', 'left')}
              </th>
              <th className="text-right px-4 py-3">
                {renderSortHeader('voterCount', 'Voters')}
              </th>
              <th className="text-right px-4 py-3">
                {renderSortHeader('pvcReadyCount', 'PVC Ready')}
              </th>
              <th className="text-right px-4 py-3">
                {renderSortHeader('pvcPercentage', 'PVC %')}
              </th>
              {visibleColumns.map((col) => (
                <th key={col.key} className="text-right px-4 py-3">
                  {renderSortHeader(col.key, col.label)}
                </th>
              ))}
              {canDrillDown && <th className="px-3 py-3 w-10" />}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, idx) => {
              const pvcPct =
                item.voterCount > 0
                  ? (item.pvcReadyCount / item.voterCount) * 100
                  : 0;

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
                  <td className="px-5 py-3 sticky left-0 bg-[#141417]">
                    <div className="flex items-center gap-2">
                      <span className="text-[#555] text-xs w-6 shrink-0 tabular-nums">
                        {idx + 1}.
                      </span>
                      <span className="text-white font-medium whitespace-nowrap">{item.name}</span>
                    </div>
                  </td>
                  <td className="text-right px-4 py-3 text-[#ccc] tabular-nums">
                    {item.voterCount.toLocaleString()}
                  </td>
                  <td className="text-right px-4 py-3 text-[#ccc] tabular-nums">
                    {item.pvcReadyCount.toLocaleString()}
                  </td>
                  <td className="text-right px-4 py-3">
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
                  {visibleColumns.map((col) => {
                    const val = col.getValue(item);
                    return (
                      <td key={col.key} className="text-right px-4 py-3 tabular-nums">
                        <span className={val > 0 ? 'text-[#ccc]' : 'text-[#333]'}>
                          {val.toLocaleString()}
                        </span>
                      </td>
                    );
                  })}
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
