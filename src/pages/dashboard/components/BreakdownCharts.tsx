import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import type { AreaStatistics, SupportBreakdown, EngagementBreakdown } from '../../../services/statistics.service';
import {
  PVC_COLORS, SUPPORT_COLORS, ENGAGEMENT_COLORS,
  SUPPORT_LABELS, ENGAGEMENT_LABELS,
} from '../../../services/statistics.service';

interface BreakdownChartsProps {
  data: AreaStatistics[];
}

function aggregateBreakdowns(data: AreaStatistics[]) {
  const pvc = { YES: 0, NO: 0, UNKNOWN: 0 };
  const support: Record<string, number> = {
    STRONG_SUPPORTER: 0, LEAN_SUPPORTER: 0, UNDECIDED: 0,
    LEAN_OPPOSITION: 0, STRONG_OPPOSITION: 0,
  };
  const engagement: Record<string, number> = {
    NOT_CONTACTED: 0, CONTACTED: 0, FOLLOW_UP: 0,
    FOLLOW_UP_NEEDED: 0, COMMITTED: 0, MOBILIZED: 0, UNREACHABLE: 0,
  };

  for (const item of data) {
    for (const key of Object.keys(pvc) as (keyof typeof pvc)[]) {
      pvc[key] += item.pvcDistribution[key] || 0;
    }
    for (const key of Object.keys(support)) {
      support[key] += item.supportBreakdown[key as keyof SupportBreakdown] || 0;
    }
    for (const key of Object.keys(engagement)) {
      engagement[key] += item.engagementBreakdown[key as keyof EngagementBreakdown] || 0;
    }
  }

  return { pvc, support, engagement };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function DarkTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1e] border border-[#2a2a2e] rounded-lg p-3 shadow-xl">
        <p className="text-white font-semibold text-sm">{label || payload[0].name}</p>
        <p className="text-[#ccc] text-sm">{Number(payload[0].value).toLocaleString()}</p>
      </div>
    );
  }
  return null;
}

function PvcLegendFormatter(value: string) {
  return <span className="text-[#ccc] text-xs">{value}</span>;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export function BreakdownCharts({ data }: BreakdownChartsProps) {
  const { pvc, support, engagement } = aggregateBreakdowns(data);

  const pvcData = Object.entries(pvc).map(([key, value]) => ({
    name: key,
    value,
    color: PVC_COLORS[key],
  }));

  const supportData = Object.entries(support)
    .map(([key, value]) => ({
      name: SUPPORT_LABELS[key] || key,
      value,
      color: SUPPORT_COLORS[key],
    }))
    .sort((a, b) => b.value - a.value);

  const engagementData = Object.entries(engagement)
    .map(([key, value]) => ({
      name: ENGAGEMENT_LABELS[key] || key,
      value,
      color: ENGAGEMENT_COLORS[key],
    }))
    .sort((a, b) => b.value - a.value);

  const totalVoters = data.reduce((sum, item) => sum + item.voterCount, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* PVC Distribution Donut */}
      <div className="bg-[#141417] rounded-xl border border-[#2a2a2e] shadow-lg p-5">
        <h3 className="text-white font-semibold mb-2">PVC Distribution</h3>
        <p className="text-[#666] text-xs mb-3">
          Total: {totalVoters.toLocaleString()} voters
        </p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pvcData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
              >
                {pvcData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<DarkTooltip />} />
              <Legend formatter={PvcLegendFormatter} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Support Breakdown */}
      <div className="bg-[#141417] rounded-xl border border-[#2a2a2e] shadow-lg p-5">
        <h3 className="text-white font-semibold mb-2">Support Level</h3>
        <p className="text-[#666] text-xs mb-3">Aggregated across all areas</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={supportData}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2e" horizontal={false} />
              <XAxis
                type="number"
                stroke="#666"
                tick={{ fill: '#888', fontSize: 10 }}
                tickFormatter={(v: number) => v.toLocaleString()}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={110}
                stroke="#666"
                tick={{ fill: '#ccc', fontSize: 11 }}
              />
              <Tooltip content={<DarkTooltip />} cursor={{ fill: 'rgba(202, 138, 4, 0.08)' }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {supportData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Engagement Breakdown */}
      <div className="bg-[#141417] rounded-xl border border-[#2a2a2e] shadow-lg p-5">
        <h3 className="text-white font-semibold mb-2">Engagement Status</h3>
        <p className="text-[#666] text-xs mb-3">Aggregated across all areas</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={engagementData}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2e" horizontal={false} />
              <XAxis
                type="number"
                stroke="#666"
                tick={{ fill: '#888', fontSize: 10 }}
                tickFormatter={(v: number) => v.toLocaleString()}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={120}
                stroke="#666"
                tick={{ fill: '#ccc', fontSize: 11 }}
              />
              <Tooltip content={<DarkTooltip />} cursor={{ fill: 'rgba(202, 138, 4, 0.08)' }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {engagementData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
