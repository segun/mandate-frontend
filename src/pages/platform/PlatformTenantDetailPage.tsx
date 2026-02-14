import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { getPlatformTenantById, setTenantStatus } from './mock-platform-data';

type DetailTab = 'overview' | 'states' | 'lgas' | 'wards' | 'polling-units' | 'voters' | 'users';

export function PlatformTenantDetailPage() {
  const { tenantId } = useParams<{ tenantId: string }>();
  const [tab, setTab] = useState<DetailTab>('overview');
  const [refreshTick, setRefreshTick] = useState(0);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const tenant = useMemo(() => (tenantId ? getPlatformTenantById(tenantId) : undefined), [tenantId, refreshTick]);

  if (!tenant) {
    return <Navigate to="/platform-owner/tenants" replace />;
  }

  const nextAction = tenant.status === 'ACTIVE' ? 'disable' : 'enable';

  const toggleTenantStatus = () => {
    setTenantStatus(tenant.id, tenant.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE');
    setRefreshTick((prev) => prev + 1);
    setIsConfirmOpen(false);
  };

  const TabButton = ({ value, label }: { value: DetailTab; label: string }) => (
    <button
      type="button"
      onClick={() => setTab(value)}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        tab === value ? 'bg-[#ca8a04]/15 text-[#ca8a04]' : 'text-[#bbb] hover:bg-[#1a1a1e]'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title={`${nextAction === 'disable' ? 'Disable' : 'Enable'} Tenant`}
        message={
          <>
            Are you sure you want to {nextAction}{' '}
            <span className="text-[#ca8a04] font-medium">"{tenant.name}"</span>?
          </>
        }
        confirmLabel={nextAction === 'disable' ? 'Disable' : 'Enable'}
        cancelLabel="Cancel"
        variant={nextAction === 'disable' ? 'danger' : 'info'}
        onConfirm={toggleTenantStatus}
        onCancel={() => setIsConfirmOpen(false)}
      />

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <Link to="/platform-owner/tenants" className="text-sm text-[#ca8a04] hover:text-[#d4940a]">
            ← Back to tenants
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04] mt-2">{tenant.name}</h1>
          <p className="text-sm text-[#888]">{tenant.slug} • {tenant.organizationType}</p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`inline-block px-2 py-1 text-xs font-medium rounded ${
              tenant.status === 'ACTIVE' ? 'bg-[#ca8a04]/20 text-[#ca8a04]' : 'bg-red-500/15 text-red-300'
            }`}
          >
            {tenant.status}
          </span>
          <button
            type="button"
            onClick={() => setIsConfirmOpen(true)}
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              tenant.status === 'ACTIVE'
                ? 'bg-red-500/15 text-red-300 hover:bg-red-500/20'
                : 'bg-green-500/15 text-green-300 hover:bg-green-500/20'
            }`}
          >
            {tenant.status === 'ACTIVE' ? 'Disable Tenant' : 'Enable Tenant'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
        <div className="bg-[#141417] border border-[#2a2a2e] rounded-xl p-3">
          <p className="text-xs text-[#888]">States</p>
          <p className="text-lg font-semibold text-white">{tenant.states.length}</p>
        </div>
        <div className="bg-[#141417] border border-[#2a2a2e] rounded-xl p-3">
          <p className="text-xs text-[#888]">LGAs</p>
          <p className="text-lg font-semibold text-white">{tenant.lgas.length}</p>
        </div>
        <div className="bg-[#141417] border border-[#2a2a2e] rounded-xl p-3">
          <p className="text-xs text-[#888]">Wards</p>
          <p className="text-lg font-semibold text-white">{tenant.wards.length}</p>
        </div>
        <div className="bg-[#141417] border border-[#2a2a2e] rounded-xl p-3">
          <p className="text-xs text-[#888]">Polling Units</p>
          <p className="text-lg font-semibold text-white">{tenant.pollingUnits.length}</p>
        </div>
        <div className="bg-[#141417] border border-[#2a2a2e] rounded-xl p-3">
          <p className="text-xs text-[#888]">Users</p>
          <p className="text-lg font-semibold text-white">{tenant.users.length}</p>
        </div>
        <div className="bg-[#141417] border border-[#2a2a2e] rounded-xl p-3">
          <p className="text-xs text-[#888]">Voters</p>
          <p className="text-lg font-semibold text-white">{tenant.voters.length}</p>
        </div>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 py-3 flex flex-wrap gap-2">
          <TabButton value="overview" label="Overview" />
          <TabButton value="states" label="States" />
          <TabButton value="lgas" label="LGAs" />
          <TabButton value="wards" label="Wards" />
          <TabButton value="polling-units" label="Polling Units" />
          <TabButton value="voters" label="Voters" />
          <TabButton value="users" label="Users" />
        </div>

        <div className="p-4 sm:p-6 overflow-x-auto">
          {tab === 'overview' && (
            <div className="text-sm text-[#ddd] space-y-2">
              <p>Created: {new Date(tenant.createdAt).toLocaleDateString()}</p>
              <p>Tenant ID: {tenant.id}</p>
              <p>Status: {tenant.status}</p>
              <p>Use tabs to drill into states, LGAs, wards, polling units, voters, and users.</p>
            </div>
          )}

          {tab === 'states' && (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2a2a2e]">
                  <th className="text-left py-2 text-sm text-white">Code</th>
                  <th className="text-left py-2 text-sm text-white">State Name</th>
                </tr>
              </thead>
              <tbody>
                {tenant.states.map((item) => (
                  <tr key={item.id} className="border-b border-[#2a2a2e]/60">
                    <td className="py-2 text-sm text-[#bbb]">{item.code}</td>
                    <td className="py-2 text-sm text-[#ddd]">{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === 'lgas' && (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2a2a2e]">
                  <th className="text-left py-2 text-sm text-white">Code</th>
                  <th className="text-left py-2 text-sm text-white">LGA Name</th>
                  <th className="text-left py-2 text-sm text-white">State</th>
                </tr>
              </thead>
              <tbody>
                {tenant.lgas.map((item) => (
                  <tr key={item.id} className="border-b border-[#2a2a2e]/60">
                    <td className="py-2 text-sm text-[#bbb]">{item.code}</td>
                    <td className="py-2 text-sm text-[#ddd]">{item.name}</td>
                    <td className="py-2 text-sm text-[#bbb]">{item.stateName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === 'wards' && (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2a2a2e]">
                  <th className="text-left py-2 text-sm text-white">Code</th>
                  <th className="text-left py-2 text-sm text-white">Ward Name</th>
                  <th className="text-left py-2 text-sm text-white">LGA</th>
                </tr>
              </thead>
              <tbody>
                {tenant.wards.map((item) => (
                  <tr key={item.id} className="border-b border-[#2a2a2e]/60">
                    <td className="py-2 text-sm text-[#bbb]">{item.code}</td>
                    <td className="py-2 text-sm text-[#ddd]">{item.name}</td>
                    <td className="py-2 text-sm text-[#bbb]">{item.lgaName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === 'polling-units' && (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2a2a2e]">
                  <th className="text-left py-2 text-sm text-white">Code</th>
                  <th className="text-left py-2 text-sm text-white">Polling Unit</th>
                  <th className="text-left py-2 text-sm text-white">Ward</th>
                </tr>
              </thead>
              <tbody>
                {tenant.pollingUnits.map((item) => (
                  <tr key={item.id} className="border-b border-[#2a2a2e]/60">
                    <td className="py-2 text-sm text-[#bbb]">{item.code}</td>
                    <td className="py-2 text-sm text-[#ddd]">{item.name}</td>
                    <td className="py-2 text-sm text-[#bbb]">{item.wardName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === 'voters' && (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2a2a2e]">
                  <th className="text-left py-2 text-sm text-white">Name</th>
                  <th className="text-left py-2 text-sm text-white">Phone</th>
                  <th className="text-left py-2 text-sm text-white">Polling Unit</th>
                </tr>
              </thead>
              <tbody>
                {tenant.voters.map((item) => (
                  <tr key={item.id} className="border-b border-[#2a2a2e]/60">
                    <td className="py-2 text-sm text-[#ddd]">{item.fullName}</td>
                    <td className="py-2 text-sm text-[#bbb]">{item.phone}</td>
                    <td className="py-2 text-sm text-[#bbb]">{item.pollingUnitName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === 'users' && (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2a2a2e]">
                  <th className="text-left py-2 text-sm text-white">Name</th>
                  <th className="text-left py-2 text-sm text-white">Email</th>
                  <th className="text-left py-2 text-sm text-white">Role</th>
                  <th className="text-left py-2 text-sm text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                {tenant.users.map((item) => (
                  <tr key={item.id} className="border-b border-[#2a2a2e]/60">
                    <td className="py-2 text-sm text-[#ddd]">{item.fullName}</td>
                    <td className="py-2 text-sm text-[#bbb]">{item.email}</td>
                    <td className="py-2 text-sm text-[#bbb]">{item.role}</td>
                    <td className="py-2 text-sm">
                      <span className={`inline-block px-2 py-1 text-xs rounded ${item.isActive ? 'bg-[#ca8a04]/20 text-[#ca8a04]' : 'bg-red-500/15 text-red-300'}`}>
                        {item.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
