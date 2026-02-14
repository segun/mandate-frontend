import type { ComponentType } from 'react';
import { Building2, Users, Map, MapPinned, LocateFixed, Vote } from 'lucide-react';
import type { FieldOfficerPerformance, TenantStatistics } from '../../../services/statistics.service';

interface TenantStatisticsSectionProps {
  tenantStats: TenantStatistics;
}

const numberFormatter = new Intl.NumberFormat();

function formatNumber(value: number) {
  return numberFormatter.format(value);
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  bgColor,
}: {
  label: string;
  value: number;
  icon: ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="bg-[#141417] rounded-xl border border-[#2a2a2e] shadow-lg p-5">
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bgColor}`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
      </div>
      <p className="text-[#888] text-sm font-medium mt-3">{label}</p>
      <p className="text-2xl font-bold text-white mt-1">{formatNumber(value)}</p>
    </div>
  );
}

function FieldOfficerRow({ officer }: { officer: FieldOfficerPerformance }) {
  return (
    <tr className="border-b border-[#2a2a2e] last:border-0">
      <td className="px-4 py-3 align-top">
        <div className="text-white font-medium">{officer.fullName}</div>
        <div className="text-xs text-[#888] mt-0.5">{officer.email}</div>
        {officer.phone && <div className="text-xs text-[#666]">{officer.phone}</div>}
      </td>
      <td className="px-4 py-3 align-top">
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            officer.isActive
              ? 'bg-green-500/15 text-green-300 border border-green-500/30'
              : 'bg-[#3a3a40] text-[#999] border border-[#505056]'
          }`}
        >
          {officer.isActive ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="px-4 py-3 align-top">
        {officer.parentOfficer ? (
          <>
            <div className="text-sm text-white">{officer.parentOfficer.fullName}</div>
            <div className="text-xs text-[#888]">{officer.parentOfficer.role}</div>
            <div className="text-xs text-[#666] mt-0.5">{officer.parentOfficer.email}</div>
            {officer.parentOfficer.phone && (
              <div className="text-xs text-[#666]">{officer.parentOfficer.phone}</div>
            )}
          </>
        ) : (
          <span className="text-sm text-[#666]">—</span>
        )}
      </td>
      <td className="px-4 py-3 text-right text-white">{formatNumber(officer.metrics.totalVoters)}</td>
      <td className="px-4 py-3 text-right text-white">{formatNumber(officer.metrics.contactedVoters)}</td>
      <td className="px-4 py-3 text-right text-white">{formatNumber(officer.metrics.supporterVoters)}</td>
      <td className="px-4 py-3 text-right text-white">{formatNumber(officer.metrics.undecidedVoters)}</td>
      <td className="px-4 py-3 text-right text-white">{formatNumber(officer.metrics.oppositionVoters)}</td>
    </tr>
  );
}

export function TenantStatisticsSection({ tenantStats }: TenantStatisticsSectionProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-white">Overview</h2>
        <p className="text-sm text-[#888] mt-1">Coverage, users, and field officer performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Total Users" value={tenantStats.users} icon={Users} color="text-blue-400" bgColor="bg-blue-400/10" />
        <StatCard label="States" value={tenantStats.states} icon={Map} color="text-purple-400" bgColor="bg-purple-400/10" />
        <StatCard label="LGAs" value={tenantStats.lgas} icon={LocateFixed} color="text-cyan-400" bgColor="bg-cyan-400/10" />
        <StatCard label="Wards" value={tenantStats.wards} icon={MapPinned} color="text-orange-400" bgColor="bg-orange-400/10" />
        <StatCard label="Polling Units" value={tenantStats.pollingUnits} icon={Building2} color="text-emerald-400" bgColor="bg-emerald-400/10" />
        <StatCard label="Voters" value={tenantStats.voters} icon={Vote} color="text-[#ca8a04]" bgColor="bg-[#ca8a04]/10" />
      </div>

      <div className="bg-[#141417] rounded-xl border border-[#2a2a2e] shadow-lg overflow-hidden">
        <div className="px-4 sm:px-5 py-4 border-b border-[#2a2a2e]">
          <h3 className="text-white font-semibold">Field Officer Performance</h3>
          <p className="text-xs text-[#888] mt-1">
            Voter metrics by field officer, including supervising officer details
          </p>
        </div>

        {tenantStats.fieldOfficerPerformance.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <p className="text-[#888]">No field officer performance data available</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-[#888] border-b border-[#2a2a2e]">
                  <th className="px-4 py-3 font-medium">Field Officer</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Parent Officer</th>
                  <th className="px-4 py-3 font-medium text-right">Total</th>
                  <th className="px-4 py-3 font-medium text-right">Contacted</th>
                  <th className="px-4 py-3 font-medium text-right">Supporters</th>
                  <th className="px-4 py-3 font-medium text-right">Undecided</th>
                  <th className="px-4 py-3 font-medium text-right">Opposition</th>
                </tr>
              </thead>
              <tbody>
                {tenantStats.fieldOfficerPerformance.map((officer) => (
                  <FieldOfficerRow key={officer.id} officer={officer} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
