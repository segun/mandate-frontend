import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { getPlatformTenants, setTenantStatus, type PlatformTenant } from './mock-platform-data';

export function PlatformTenantsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'DISABLED'>('ALL');
  const [refreshTick, setRefreshTick] = useState(0);
  const [confirmState, setConfirmState] = useState<{ isOpen: boolean; tenant: PlatformTenant | null; action: 'disable' | 'enable' }>({
    isOpen: false,
    tenant: null,
    action: 'disable',
  });

  const tenants = useMemo(() => {
    const allTenants = getPlatformTenants();
    return allTenants.filter((tenant) => {
      const q = search.trim().toLowerCase();
      const searchMatch = !q || tenant.name.toLowerCase().includes(q) || tenant.slug.toLowerCase().includes(q);
      const statusMatch = statusFilter === 'ALL' || tenant.status === statusFilter;
      return searchMatch && statusMatch;
    });
  }, [search, statusFilter, refreshTick]);

  const openConfirm = (tenant: PlatformTenant, action: 'disable' | 'enable') => {
    setConfirmState({ isOpen: true, tenant, action });
  };

  const closeConfirm = () => {
    setConfirmState({ isOpen: false, tenant: null, action: 'disable' });
  };

  const handleStatusAction = () => {
    if (!confirmState.tenant) return;
    const nextStatus = confirmState.action === 'disable' ? 'DISABLED' : 'ACTIVE';
    setTenantStatus(confirmState.tenant.id, nextStatus);
    setRefreshTick((prev) => prev + 1);
    closeConfirm();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title={`${confirmState.action === 'disable' ? 'Disable' : 'Enable'} Tenant`}
        message={
          <>
            Are you sure you want to {confirmState.action}{' '}
            <span className="text-[#ca8a04] font-medium">"{confirmState.tenant?.name || ''}"</span>?
          </>
        }
        confirmLabel={confirmState.action === 'disable' ? 'Disable' : 'Enable'}
        cancelLabel="Cancel"
        variant={confirmState.action === 'disable' ? 'danger' : 'info'}
        onConfirm={handleStatusAction}
        onCancel={closeConfirm}
      />

      <div className="mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Platform Tenants</h1>
          <p className="text-sm text-[#888]">Manage tenants and enable/disable tenant access.</p>
        </div>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Search tenant by name or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:max-w-md px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ca8a04]"
          />

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'ALL' | 'ACTIVE' | 'DISABLED')}
              className="px-3 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
            >
              <option value="ALL">All statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="DISABLED">Disabled</option>
            </select>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setStatusFilter('ALL');
              }}
              className="px-3 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white font-semibold hover:bg-[#2a2a2e] transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {tenants.length === 0 ? (
          <div className="p-10 text-center text-[#888]">No tenants found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1a1a1d] border-b border-[#2a2a2e]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Tenant</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">States</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Users</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Voters</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a2e]">
                {tenants.map((tenant) => (
                  <tr
                    key={tenant.id}
                    onClick={() => navigate('/states')}
                    className="hover:bg-[#1a1a1d]/50 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <p className="text-[#ca8a04] font-medium">{tenant.name}</p>
                      <p className="text-xs text-[#888]">{tenant.slug}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#ddd]">{tenant.organizationType}</td>
                    <td className="px-4 py-3 text-sm text-[#ddd]">{tenant.statesCount}</td>
                    <td className="px-4 py-3 text-sm text-[#ddd]">{tenant.usersCount}</td>
                    <td className="px-4 py-3 text-sm text-[#ddd]">{tenant.votersCount}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                          tenant.status === 'ACTIVE' ? 'bg-[#ca8a04]/20 text-[#ca8a04]' : 'bg-red-500/15 text-red-300'
                        }`}
                      >
                        {tenant.status}
                      </span>
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-3">
                        <Link to="/states" className="text-[#ca8a04] hover:text-[#d4940a] text-sm font-semibold">
                          Open States
                        </Link>
                        {tenant.status === 'ACTIVE' ? (
                          <button
                            onClick={() => openConfirm(tenant, 'disable')}
                            className="text-red-400 hover:text-red-300 text-sm font-semibold"
                          >
                            Disable
                          </button>
                        ) : (
                          <button
                            onClick={() => openConfirm(tenant, 'enable')}
                            className="text-green-400 hover:text-green-300 text-sm font-semibold"
                          >
                            Enable
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
