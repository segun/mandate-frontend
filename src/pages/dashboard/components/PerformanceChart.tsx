import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import type { AreaStatistics, GeoLevel } from '../../../services/statistics.service';
import { NEXT_LEVEL } from '../../../services/statistics.service';

interface PerformanceChartProps {
  data: AreaStatistics[];
  level: GeoLevel;
  onDrillDown: (item: AreaStatistics) => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const item = payload[0].payload as AreaStatistics;
    const pvcPct = item.voterCount > 0
      ? ((item.pvcReadyCount / item.voterCount) * 100).toFixed(1)
      : '0';
    return (
      <div className="bg-[#1a1a1e] border border-[#2a2a2e] rounded-lg p-3 shadow-xl">
        <p className="text-white font-semibold">{item.name}</p>
        <p className="text-[#888] text-sm mt-1">
          Voters: <span className="text-white">{item.voterCount.toLocaleString()}</span>
        </p>
        <p className="text-[#888] text-sm">
          PVC Ready: <span className="text-green-400">{item.pvcReadyCount.toLocaleString()}</span>
          <span className="text-[#666]"> ({pvcPct}%)</span>
        </p>
      </div>
    );
  }
  return null;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const BAR_COLORS = ['#ca8a04', '#a16207', '#a16207', '#78350f'];

function getBarColor(index: number): string {
  if (index === 0) return BAR_COLORS[0];
  if (index < 3) return BAR_COLORS[1];
  return BAR_COLORS[3];
}

export function PerformanceChart({ data, level, onDrillDown }: PerformanceChartProps) {
  const sortedData = [...data]
    .sort((a, b) => b.voterCount - a.voterCount)
    .slice(0, 15);

  const canDrillDown = NEXT_LEVEL[level] !== null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChartClick = (state: any) => {
    if (canDrillDown && state?.activePayload?.[0]?.payload) {
      onDrillDown(state.activePayload[0].payload);
    }
  };

  return (
    <div className="bg-[#141417] rounded-xl border border-[#2a2a2e] shadow-lg p-5">
      <h3 className="text-white font-semibold mb-4">
        Top Performers by Voter Count
        {canDrillDown && (
          <span className="text-xs text-[#666] ml-2 font-normal">
            Click a bar to drill down
          </span>
        )}
      </h3>
      <div style={{ height: Math.max(300, sortedData.length * 36) }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            onClick={handleChartClick}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2e" horizontal={false} />
            <XAxis
              type="number"
              stroke="#666"
              tick={{ fill: '#888', fontSize: 12 }}
              tickFormatter={(v: number) => v.toLocaleString()}
            />
            <YAxis
              dataKey="name"
              type="category"
              width={130}
              stroke="#666"
              tick={{ fill: '#ccc', fontSize: 12 }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(202, 138, 4, 0.08)' }}
            />
            <Bar
              dataKey="voterCount"
              radius={[0, 4, 4, 0]}
              cursor={canDrillDown ? 'pointer' : 'default'}
            >
              {sortedData.map((_, index) => (
                <Cell key={index} fill={getBarColor(index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {data.length > 15 && (
        <p className="text-xs text-[#555] mt-3 text-center">
          Showing top 15 of {data.length}. Switch to table view to see all data.
        </p>
      )}
    </div>
  );
}
