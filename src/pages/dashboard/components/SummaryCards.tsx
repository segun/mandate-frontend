import { Users, CheckCircle, Trophy, MapPin } from 'lucide-react';
import type { AreaStatistics, GeoLevel } from '../../../services/statistics.service';
import { LEVEL_LABELS } from '../../../services/statistics.service';

interface SummaryCardsProps {
  data: AreaStatistics[];
  level: GeoLevel;
}

export function SummaryCards({ data, level }: SummaryCardsProps) {
  const totalVoters = data.reduce((sum, item) => sum + item.voterCount, 0);
  const totalPvcReady = data.reduce((sum, item) => sum + item.pvcReadyCount, 0);
  const pvcPercentage = totalVoters > 0 ? ((totalPvcReady / totalVoters) * 100).toFixed(1) : '0';
  const topPerformer = data.length > 0
    ? data.reduce((max, item) => (item.voterCount > max.voterCount ? item : max), data[0])
    : null;

  const cards = [
    {
      label: 'Total Voters',
      value: totalVoters.toLocaleString(),
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      label: 'PVC Ready',
      value: `${totalPvcReady.toLocaleString()} (${pvcPercentage}%)`,
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      label: 'Top Performer',
      value: topPerformer?.name || '—',
      subtitle: topPerformer ? `${topPerformer.voterCount.toLocaleString()} voters` : undefined,
      icon: Trophy,
      color: 'text-[#ca8a04]',
      bgColor: 'bg-[#ca8a04]/10',
    },
    {
      label: `Total ${LEVEL_LABELS[level]}`,
      value: data.length.toLocaleString(),
      icon: MapPin,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-[#141417] rounded-xl border border-[#2a2a2e] shadow-lg p-5"
        >
          <div className="flex items-center justify-between">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.bgColor}`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
          </div>
          <p className="text-[#888] text-sm font-medium mt-3">{card.label}</p>
          <p className="text-2xl font-bold text-white mt-1 truncate">{card.value}</p>
          {card.subtitle && <p className="text-xs text-[#666] mt-1">{card.subtitle}</p>}
        </div>
      ))}
    </div>
  );
}
