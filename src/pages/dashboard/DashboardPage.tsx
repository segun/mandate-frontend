import { useAuthStore } from '../../stores/auth.store';

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  const stats = [
    { label: 'Wards', value: '10', icon: '🏘️' },
    { label: 'Polling Units', value: '330', icon: '🗳️' },
    { label: 'Users', value: '2,033', icon: '👥' },
    { label: 'Voters', value: '13,200', icon: '📋' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-[#141417] rounded-2xl border border-[#2a2a2e] shadow-lg px-5 sm:px-6 py-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Dashboard</h1>
          <p className="text-[#888] mt-1">Welcome back, {user?.fullName}</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-[#ca8a04]/10 px-4 py-2 text-sm font-medium text-[#ca8a04]">
          Operational status
          <span className="inline-flex h-2 w-2 rounded-full bg-[#ca8a04] animate-pulse" aria-hidden />
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#141417] rounded-xl border border-[#2a2a2e] shadow-lg p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ca8a04]/10 text-[#ca8a04]">
                <span className="text-lg">{stat.icon}</span>
              </div>
            </div>
            <p className="text-[#888] text-sm font-medium mt-3">{stat.label}</p>
            <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-[#666]">Updated today</p>

      {/* Quick Actions */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#ca8a04]/15 text-[#ca8a04] flex items-center justify-center text-lg">⚡</div>
          <div>
            <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
            <p className="text-sm text-[#888]">Move faster on the most common field tasks</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/voters"
            className="p-5 rounded-xl border border-[#ca8a04]/30 bg-[#141417] text-white shadow-sm hover:bg-[#ca8a04]/10 hover:border-[#ca8a04] hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold group-hover:text-[#ca8a04]">Register Voter</h3>
              <span className="text-[#ca8a04]">→</span>
            </div>
            <p className="text-sm text-[#888] mt-2">Add a new voter to the registry</p>
          </a>
          <a
            href="/voters"
            className="p-5 rounded-xl border border-[#ca8a04]/30 bg-[#141417] text-white shadow-sm hover:bg-[#ca8a04]/10 hover:border-[#ca8a04] hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold group-hover:text-[#ca8a04]">Search Voters</h3>
              <span className="text-[#ca8a04]">→</span>
            </div>
            <p className="text-sm text-[#888] mt-2">Find and manage existing voters</p>
          </a>
          <a
            href="/wards"
            className="p-5 rounded-xl border border-[#ca8a04]/30 bg-[#141417] text-white shadow-sm hover:bg-[#ca8a04]/10 hover:border-[#ca8a04] hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold group-hover:text-[#ca8a04]">View Wards</h3>
              <span className="text-[#ca8a04]">→</span>
            </div>
            <p className="text-sm text-[#888] mt-2">Manage ward assignments</p>
          </a>
        </div>
      </div>
    </div>
  );
}
