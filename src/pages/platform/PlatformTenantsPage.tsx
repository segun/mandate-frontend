import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { platformTenantsService, type PlatformTenant } from '../../services/platform-tenants.service';
import { toast } from '../../stores/toast.store';

type StatusFilter = 'ALL' | 'ACTIVE' | 'DISABLED';
type SubscriptionFilter = '' | 'ACTIVE' | 'PENDING_PAYMENT' | 'PAST_DUE' | 'EXPIRED' | 'CANCELED';

export function PlatformTenantsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionFilter>('');
  const [tenants, setTenants] = useState<PlatformTenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshTick, setRefreshTick] = useState(0);

  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    tenant: PlatformTenant | null;
    action: 'disable' | 'enable';
  }>({
    isOpen: false,
    tenant: null,
    action: 'disable',
  });

  const isDisabledFilter = useMemo(() => {
    if (statusFilter === 'ACTIVE') return false;
    if (statusFilter === 'DISABLED') return true;
    return undefined;
  }, [statusFilter]);

  const fetchTenants = useCallback(async () => {
    setLoading(true);
    try {
      const response = await platformTenantsService.listTenants({
        page,
        limit: 20,
        search: search.trim() || undefined,
        isDisabled: isDisabledFilter,
        subscriptionStatus: subscriptionStatus || undefined,
      });

      setTenants(response.data);
      setTotalPages(response.meta.totalPages || 1);
      setError('');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to load tenants';
      setError(message);
      setTenants([]);
    } finally {
      setLoading(false);
    }
  }, [page, search, isDisabledFilter, subscriptionStatus]);

  useEffect(() => {
    fetchTenants();
  }, [fetchTenants, refreshTick]);

  const openConfirm = (tenant: PlatformTenant, action: 'disable' | 'enable') => {
    setConfirmState({ isOpen: true, tenant, action });
  };

  const closeConfirm = () => {
    setConfirmState({ isOpen: false, tenant: null, action: 'disable' });
  };

  const handleStatusAction = async () => {
    const tenant = confirmState.tenant;
    if (!tenant) return;

    try {
      if (confirmState.action === 'disable') {
        await platformTenantsService.disableTenant(tenant.id);
        toast.success('Tenant disabled successfully');
      } else {
        await platformTenantsService.enableTenant(tenant.id);
        toast.success('Tenant enabled successfully');
      }
      setRefreshTick((prev) => prev + 1);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        `Failed to ${confirmState.action} tenant`;
      toast.error(message);
    } finally {
      closeConfirm();
    }
  };

  const formatSubscriptionStatus = (status: string) => status.replace(/_/g, ' ');

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
        <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Platform Tenants</h1>
        <p className="text-sm text-[#888]">Manage tenants and enable/disable tenant access.</p>
      </div>

      {!loading && error && (
        <div className="mb-4 text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-4">{error}</div>
      )}

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-4 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
          <input
            type="text"
            placeholder="Search tenant by name or slug..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="w-full lg:max-w-md px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ca8a04]"
          />

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => {
                setPage(1);
                setStatusFilter(e.target.value as StatusFilter);
              }}
              className="px-3 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
            >
              <option value="ALL">All statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="DISABLED">Disabled</option>
            </select>

            <select
              value={subscriptionStatus}
              onChange={(e) => {
                setPage(1);
                setSubscriptionStatus(e.target.value as SubscriptionFilter);
              }}
              className="px-3 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
            >
              <option value="">All subscriptions</option>
              <option value="ACTIVE">Active</option>
              <option value="PENDING_PAYMENT">Pending</option>
              <option value="PAST_DUE">Past Due</option>
              <option value="EXPIRED">Expired</option>
              <option value="CANCELED">Canceled</option>
            </select>

            <button
              type="button"
              onClick={() => {
                setSearch('');
                setStatusFilter('ALL');
                setSubscriptionStatus('');
                setPage(1);
              }}
              className="px-3 py-2.5 rounded-lg border border-[#ca8a04]/60 bg-[#1a1a1d] text-[#ca8a04] font-semibold hover:bg-[#2a2a2e] hover:border-[#ca8a04] transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center text-[#888]">Loading tenants...</div>
        ) : tenants.length === 0 ? (
          <div className="p-10 text-center text-[#888]">No tenants found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1a1a1d] border-b border-[#2a2a2e]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Tenant</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Subscription</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Disabled</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Created</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a2e]">
                {tenants.map((tenant) => (
                  <tr
                    key={tenant.id}
                    onClick={() => navigate(`/platform-owner/tenants/${tenant.id}`)}
                    className="hover:bg-[#1a1a1d]/50 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <p className="text-[#ca8a04] font-medium">{tenant.name}</p>
                      <p className="text-xs text-[#888]">{tenant.slug}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#ddd]">{formatSubscriptionStatus(tenant.subscriptionStatus)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                          tenant.isDisabled ? 'bg-red-500/15 text-red-300' : 'bg-[#ca8a04]/20 text-[#ca8a04]'
                        }`}
                      >
                        {tenant.isDisabled ? 'Disabled' : 'Enabled'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#bbb]">{new Date(tenant.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/platform-owner/tenants/${tenant.id}`}
                          className="text-[#ca8a04] hover:text-[#d4940a] text-sm font-semibold"
                        >
                          View
                        </Link>
                        {tenant.isDisabled ? (
                          <button
                            type="button"
                            onClick={() => openConfirm(tenant, 'enable')}
                            className="text-green-400 hover:text-green-300 text-sm font-semibold"
                          >
                            Enable
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openConfirm(tenant, 'disable')}
                            className="text-red-400 hover:text-red-300 text-sm font-semibold"
                          >
                            Disable
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

        {!loading && tenants.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#2a2a2e] bg-[#1a1a1d]">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-sm border border-[#2a2a2e] rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2a2e] transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-[#888]">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-sm border border-[#2a2a2e] rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2a2e] transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
