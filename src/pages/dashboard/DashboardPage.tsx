import { useAuthStore } from '../../stores/auth.store';

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  const stats = [
    { label: 'Wards', value: '10', icon: '🏘️', tone: 'bg-primary/10 text-primary' },
    { label: 'Polling Units', value: '330', icon: '🗳️', tone: 'bg-secondary/10 text-secondary' },
    { label: 'Users', value: '2,033', icon: '👥', tone: 'bg-info/10 text-info' },
    { label: 'Voters', value: '13,200', icon: '📋', tone: 'bg-amber-100 text-amber-700' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-surface/90 rounded-2xl border border-slate-100 shadow-card px-5 sm:px-6 py-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-slate-600 mt-1">Welcome back, {user?.fullName}</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          Operational status
          <span className="inline-flex h-2 w-2 rounded-full bg-secondary animate-pulse" aria-hidden />
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface rounded-xl border border-slate-100 shadow-card p-5"
          >
            <div className="flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.tone}`}>
                <span className="text-lg">{stat.icon}</span>
              </div>
            </div>
            <p className="text-slate-500 text-sm font-medium mt-3">{stat.label}</p>
            <p className="text-3xl font-bold text-primary mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500">Updated today</p>

      {/* Quick Actions */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-secondary/15 text-secondary flex items-center justify-center text-lg">⚡</div>
          <div>
            <h2 className="text-lg font-semibold text-primary">Quick Actions</h2>
            <p className="text-sm text-slate-600">Move faster on the most common field tasks</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/voters"
            className="p-5 rounded-xl border border-blue-200 bg-blue-50 text-blue-900 shadow-sm hover:bg-blue-100 hover:border-blue-300 hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold group-hover:text-blue-900">Register Voter</h3>
              <span className="text-blue-700">→</span>
            </div>
            <p className="text-sm text-blue-800/80 mt-2">Add a new voter to the registry</p>
          </a>
          <a
            href="/voters"
            className="p-5 rounded-xl border border-blue-200 bg-blue-50 text-blue-900 shadow-sm hover:bg-blue-100 hover:border-blue-300 hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold group-hover:text-blue-900">Search Voters</h3>
              <span className="text-blue-700">→</span>
            </div>
            <p className="text-sm text-blue-800/80 mt-2">Find and manage existing voters</p>
          </a>
          <a
            href="/wards"
            className="p-5 rounded-xl border border-blue-200 bg-blue-50 text-blue-900 shadow-sm hover:bg-blue-100 hover:border-blue-300 hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold group-hover:text-blue-900">View Wards</h3>
              <span className="text-blue-700">→</span>
            </div>
            <p className="text-sm text-blue-800/80 mt-2">Manage ward assignments</p>
          </a>
        </div>
      </div>
    </div>
  );
}
