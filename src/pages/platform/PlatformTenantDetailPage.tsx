import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import {
  platformTenantsService,
  type PlatformTenant,
  type TenantLga,
  type TenantPollingUnit,
  type TenantState,
  type TenantUser,
  type TenantVoter,
  type TenantWard,
} from '../../services/platform-tenants.service';
import { toast } from '../../stores/toast.store';

type DetailTab = 'overview' | 'states' | 'lgas' | 'wards' | 'polling-units' | 'voters' | 'users';

export function PlatformTenantDetailPage() {
  const { tenantId } = useParams<{ tenantId: string }>();
  const [tab, setTab] = useState<DetailTab>('overview');

  const [tenant, setTenant] = useState<PlatformTenant | null>(null);
  const [loadingTenant, setLoadingTenant] = useState(true);

  const [states, setStates] = useState<TenantState[]>([]);
  const [lgas, setLgas] = useState<TenantLga[]>([]);
  const [wards, setWards] = useState<TenantWard[]>([]);
  const [pollingUnits, setPollingUnits] = useState<TenantPollingUnit[]>([]);
  const [voters, setVoters] = useState<TenantVoter[]>([]);
  const [users, setUsers] = useState<TenantUser[]>([]);

  const [loadingTab, setLoadingTab] = useState(false);
  const [error, setError] = useState('');

  const [stateSearch, setStateSearch] = useState('');
  const [lgaSearch, setLgaSearch] = useState('');
  const [wardSearch, setWardSearch] = useState('');
  const [pollingUnitSearch, setPollingUnitSearch] = useState('');
  const [voterSearch, setVoterSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');

  const [selectedState, setSelectedState] = useState<TenantState | null>(null);
  const [selectedLga, setSelectedLga] = useState<TenantLga | null>(null);
  const [selectedWard, setSelectedWard] = useState<TenantWard | null>(null);
  const [selectedPollingUnit, setSelectedPollingUnit] = useState<TenantPollingUnit | null>(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const fetchTenant = useCallback(async () => {
    if (!tenantId) return;
    setLoadingTenant(true);
    try {
      const data = await platformTenantsService.getTenant(tenantId);
      setTenant(data);
      setError('');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to load tenant';
      setError(message);
      setTenant(null);
    } finally {
      setLoadingTenant(false);
    }
  }, [tenantId]);

  useEffect(() => {
    fetchTenant();
  }, [fetchTenant]);

  const fetchStates = useCallback(async () => {
    if (!tenantId) return;
    setLoadingTab(true);
    try {
      const response = await platformTenantsService.listTenantStates(tenantId, { search: stateSearch || undefined, page: 1, limit: 50 });
      setStates(response.data);
      setError('');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to load tenant states';
      setError(message);
      setStates([]);
    } finally {
      setLoadingTab(false);
    }
  }, [tenantId, stateSearch]);

  const fetchLgas = useCallback(async () => {
    if (!tenantId || !selectedState?.id) return;
    setLoadingTab(true);
    try {
      const response = await platformTenantsService.listTenantLgas(tenantId, selectedState.id, { search: lgaSearch || undefined, page: 1, limit: 50 });
      setLgas(response.data);
      setError('');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to load tenant LGAs';
      setError(message);
      setLgas([]);
    } finally {
      setLoadingTab(false);
    }
  }, [tenantId, selectedState?.id, lgaSearch]);

  const fetchWards = useCallback(async () => {
    if (!tenantId || !selectedLga?.id) return;
    setLoadingTab(true);
    try {
      const response = await platformTenantsService.listTenantWards(tenantId, selectedLga.id, { search: wardSearch || undefined, page: 1, limit: 50 });
      setWards(response.data);
      setError('');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to load tenant wards';
      setError(message);
      setWards([]);
    } finally {
      setLoadingTab(false);
    }
  }, [tenantId, selectedLga?.id, wardSearch]);

  const fetchPollingUnits = useCallback(async () => {
    if (!tenantId || !selectedWard?.id) return;
    setLoadingTab(true);
    try {
      const response = await platformTenantsService.listTenantPollingUnits(tenantId, selectedWard.id, {
        search: pollingUnitSearch || undefined,
        page: 1,
        limit: 50,
      });
      setPollingUnits(response.data);
      setError('');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to load tenant polling units';
      setError(message);
      setPollingUnits([]);
    } finally {
      setLoadingTab(false);
    }
  }, [tenantId, selectedWard?.id, pollingUnitSearch]);

  const fetchVoters = useCallback(async () => {
    if (!tenantId || !selectedPollingUnit?.id) return;
    setLoadingTab(true);
    try {
      const response = await platformTenantsService.listTenantVoters(tenantId, selectedPollingUnit.id, {
        search: voterSearch || undefined,
        page: 1,
        limit: 50,
      });
      setVoters(response.data);
      setError('');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to load tenant voters';
      setError(message);
      setVoters([]);
    } finally {
      setLoadingTab(false);
    }
  }, [tenantId, selectedPollingUnit?.id, voterSearch]);

  const fetchUsers = useCallback(async () => {
    if (!tenantId) return;
    setLoadingTab(true);
    try {
      const response = await platformTenantsService.listTenantUsers(tenantId, {
        search: userSearch || undefined,
        page: 1,
        limit: 50,
      });
      setUsers(response.data);
      setError('');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to load tenant users';
      setError(message);
      setUsers([]);
    } finally {
      setLoadingTab(false);
    }
  }, [tenantId, userSearch]);

  useEffect(() => {
    if (tab === 'states') fetchStates();
  }, [tab, fetchStates]);

  useEffect(() => {
    if (tab === 'lgas') fetchLgas();
  }, [tab, fetchLgas]);

  useEffect(() => {
    if (tab === 'wards') fetchWards();
  }, [tab, fetchWards]);

  useEffect(() => {
    if (tab === 'polling-units') fetchPollingUnits();
  }, [tab, fetchPollingUnits]);

  useEffect(() => {
    if (tab === 'voters') fetchVoters();
  }, [tab, fetchVoters]);

  useEffect(() => {
    if (tab === 'users') fetchUsers();
  }, [tab, fetchUsers]);

  const nextAction = tenant?.isDisabled ? 'enable' : 'disable';

  const toggleTenantStatus = async () => {
    if (!tenant) return;

    try {
      if (tenant.isDisabled) {
        const data = await platformTenantsService.enableTenant(tenant.id);
        setTenant((prev) => (prev ? { ...prev, ...data } : prev));
        toast.success('Tenant enabled successfully');
      } else {
        const data = await platformTenantsService.disableTenant(tenant.id);
        setTenant((prev) => (prev ? { ...prev, ...data } : prev));
        toast.success('Tenant disabled successfully');
      }
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to update tenant status';
      toast.error(message);
    } finally {
      setIsConfirmOpen(false);
    }
  };

  const activeCounts = useMemo(
    () => ({
      states: tenant?.stats?.states ?? states.length,
      lgas: tenant?.stats?.lgas ?? lgas.length,
      wards: tenant?.stats?.wards ?? wards.length,
      pollingUnits: tenant?.stats?.pollingUnits ?? pollingUnits.length,
      voters: tenant?.stats?.voters ?? voters.length,
      users: tenant?.stats?.users ?? users.length,
    }),
    [tenant?.stats, states.length, lgas.length, wards.length, pollingUnits.length, voters.length, users.length]
  );

  if (!tenantId) return <Navigate to="/platform-owner/tenants" replace />;

  if (!loadingTenant && !tenant) {
    return <Navigate to="/platform-owner/tenants" replace />;
  }

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
            <span className="text-[#ca8a04] font-medium">"{tenant?.name || ''}"</span>?
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
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04] mt-2">{tenant?.name || 'Tenant'}</h1>
          <p className="text-sm text-[#888]">{tenant?.slug || ''}</p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`inline-block px-2 py-1 text-xs font-medium rounded ${
              tenant?.isDisabled ? 'bg-red-500/15 text-red-300' : 'bg-[#ca8a04]/20 text-[#ca8a04]'
            }`}
          >
            {tenant?.isDisabled ? 'Disabled' : 'Enabled'}
          </span>
          <button
            type="button"
            onClick={() => setIsConfirmOpen(true)}
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              tenant?.isDisabled
                ? 'bg-green-500/15 text-green-300 hover:bg-green-500/20'
                : 'bg-red-500/15 text-red-300 hover:bg-red-500/20'
            }`}
          >
            {tenant?.isDisabled ? 'Enable Tenant' : 'Disable Tenant'}
          </button>
        </div>
      </div>

      {error && <div className="mb-4 text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-4">{error}</div>}

      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
        <div className="bg-[#141417] border border-[#2a2a2e] rounded-xl p-3">
          <p className="text-xs text-[#888]">States</p>
          <p className="text-lg font-semibold text-white">{activeCounts.states}</p>
        </div>
        <div className="bg-[#141417] border border-[#2a2a2e] rounded-xl p-3">
          <p className="text-xs text-[#888]">LGAs</p>
          <p className="text-lg font-semibold text-white">{activeCounts.lgas}</p>
        </div>
        <div className="bg-[#141417] border border-[#2a2a2e] rounded-xl p-3">
          <p className="text-xs text-[#888]">Wards</p>
          <p className="text-lg font-semibold text-white">{activeCounts.wards}</p>
        </div>
        <div className="bg-[#141417] border border-[#2a2a2e] rounded-xl p-3">
          <p className="text-xs text-[#888]">Polling Units</p>
          <p className="text-lg font-semibold text-white">{activeCounts.pollingUnits}</p>
        </div>
        <div className="bg-[#141417] border border-[#2a2a2e] rounded-xl p-3">
          <p className="text-xs text-[#888]">Users</p>
          <p className="text-lg font-semibold text-white">{activeCounts.users}</p>
        </div>
        <div className="bg-[#141417] border border-[#2a2a2e] rounded-xl p-3">
          <p className="text-xs text-[#888]">Voters</p>
          <p className="text-lg font-semibold text-white">{activeCounts.voters}</p>
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
          {loadingTenant || loadingTab ? <div className="text-[#888]">Loading...</div> : null}

          {tab === 'overview' && tenant && (
            <div className="text-sm text-[#ddd] space-y-2">
              <p>Tenant ID: {tenant.id}</p>
              <p>Subscription: {tenant.subscriptionStatus.replace(/_/g, ' ')}</p>
              <p>Created: {new Date(tenant.createdAt).toLocaleDateString()}</p>
              {tenant.disabledAt && <p>Disabled at: {new Date(tenant.disabledAt).toLocaleString()}</p>}
              <p>Select the tabs to drill from states down to voters or view users.</p>
            </div>
          )}

          {tab === 'states' && (
            <>
              <input
                type="text"
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                placeholder="Search states..."
                className="mb-3 w-full md:max-w-sm px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
              />
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2a2a2e]">
                    <th className="text-left py-2 text-sm text-white">State</th>
                    <th className="text-left py-2 text-sm text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {states.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => {
                        setSelectedState(item);
                        setSelectedLga(null);
                        setSelectedWard(null);
                        setSelectedPollingUnit(null);
                        setTab('lgas');
                      }}
                      className="border-b border-[#2a2a2e]/60 cursor-pointer hover:bg-[#1a1a1d]/50"
                    >
                      <td className="py-2 text-sm text-[#ddd]">{item.geoState?.name || item.id}</td>
                      <td className="py-2 text-sm" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedState(item);
                            setSelectedLga(null);
                            setSelectedWard(null);
                            setSelectedPollingUnit(null);
                            setTab('lgas');
                          }}
                          className="text-[#ca8a04] hover:text-[#d4940a] font-semibold"
                        >
                          View LGAs
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {tab === 'lgas' && (
            <>
              <p className="text-xs text-[#888] mb-2">State: {selectedState?.geoState?.name || 'Select a state from States tab'}</p>
              <input
                type="text"
                value={lgaSearch}
                onChange={(e) => setLgaSearch(e.target.value)}
                placeholder="Search LGAs..."
                className="mb-3 w-full md:max-w-sm px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
              />
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2a2a2e]">
                    <th className="text-left py-2 text-sm text-white">LGA</th>
                    <th className="text-left py-2 text-sm text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {lgas.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => {
                        setSelectedLga(item);
                        setSelectedWard(null);
                        setSelectedPollingUnit(null);
                        setTab('wards');
                      }}
                      className="border-b border-[#2a2a2e]/60 cursor-pointer hover:bg-[#1a1a1d]/50"
                    >
                      <td className="py-2 text-sm text-[#ddd]">{item.geoLga?.name || item.id}</td>
                      <td className="py-2 text-sm" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedLga(item);
                            setSelectedWard(null);
                            setSelectedPollingUnit(null);
                            setTab('wards');
                          }}
                          className="text-[#ca8a04] hover:text-[#d4940a] font-semibold"
                        >
                          View Wards
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {tab === 'wards' && (
            <>
              <p className="text-xs text-[#888] mb-2">LGA: {selectedLga?.geoLga?.name || 'Select an LGA from LGAs tab'}</p>
              <input
                type="text"
                value={wardSearch}
                onChange={(e) => setWardSearch(e.target.value)}
                placeholder="Search wards..."
                className="mb-3 w-full md:max-w-sm px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
              />
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2a2a2e]">
                    <th className="text-left py-2 text-sm text-white">Ward</th>
                    <th className="text-left py-2 text-sm text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {wards.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => {
                        setSelectedWard(item);
                        setSelectedPollingUnit(null);
                        setTab('polling-units');
                      }}
                      className="border-b border-[#2a2a2e]/60 cursor-pointer hover:bg-[#1a1a1d]/50"
                    >
                      <td className="py-2 text-sm text-[#ddd]">{item.geoWard?.name || item.id}</td>
                      <td className="py-2 text-sm" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedWard(item);
                            setSelectedPollingUnit(null);
                            setTab('polling-units');
                          }}
                          className="text-[#ca8a04] hover:text-[#d4940a] font-semibold"
                        >
                          View Polling Units
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {tab === 'polling-units' && (
            <>
              <p className="text-xs text-[#888] mb-2">Ward: {selectedWard?.geoWard?.name || 'Select a ward from Wards tab'}</p>
              <input
                type="text"
                value={pollingUnitSearch}
                onChange={(e) => setPollingUnitSearch(e.target.value)}
                placeholder="Search polling units..."
                className="mb-3 w-full md:max-w-sm px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
              />
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2a2a2e]">
                    <th className="text-left py-2 text-sm text-white">Polling Unit</th>
                    <th className="text-left py-2 text-sm text-white">Code</th>
                    <th className="text-left py-2 text-sm text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pollingUnits.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => {
                        setSelectedPollingUnit(item);
                        setTab('voters');
                      }}
                      className="border-b border-[#2a2a2e]/60 cursor-pointer hover:bg-[#1a1a1d]/50"
                    >
                      <td className="py-2 text-sm text-[#ddd]">{item.geoPollingUnit?.name || item.id}</td>
                      <td className="py-2 text-sm text-[#bbb]">{item.geoPollingUnit?.code || '-'}</td>
                      <td className="py-2 text-sm" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPollingUnit(item);
                            setTab('voters');
                          }}
                          className="text-[#ca8a04] hover:text-[#d4940a] font-semibold"
                        >
                          View Voters
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {tab === 'voters' && (
            <>
              <p className="text-xs text-[#888] mb-2">
                Polling Unit: {selectedPollingUnit?.geoPollingUnit?.name || 'Select a polling unit from Polling Units tab'}
              </p>
              <input
                type="text"
                value={voterSearch}
                onChange={(e) => setVoterSearch(e.target.value)}
                placeholder="Search voters..."
                className="mb-3 w-full md:max-w-sm px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
              />
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2a2a2e]">
                    <th className="text-left py-2 text-sm text-white">Name</th>
                    <th className="text-left py-2 text-sm text-white">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {voters.map((item) => (
                    <tr key={item.id} className="border-b border-[#2a2a2e]/60">
                      <td className="py-2 text-sm text-[#ddd]">{item.fullName}</td>
                      <td className="py-2 text-sm text-[#bbb]">{item.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {tab === 'users' && (
            <>
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search users..."
                className="mb-3 w-full md:max-w-sm px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
              />
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
                  {users.map((item) => (
                    <tr key={item.id} className="border-b border-[#2a2a2e]/60">
                      <td className="py-2 text-sm text-[#ddd]">{item.fullName}</td>
                      <td className="py-2 text-sm text-[#bbb]">{item.email}</td>
                      <td className="py-2 text-sm text-[#bbb]">{item.role.replace(/_/g, ' ')}</td>
                      <td className="py-2 text-sm">
                        <span className={`inline-block px-2 py-1 text-xs rounded ${item.isActive ? 'bg-[#ca8a04]/20 text-[#ca8a04]' : 'bg-red-500/15 text-red-300'}`}>
                          {item.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
