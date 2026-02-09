import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from '../../stores/toast.store';
import { useAuthStore } from '../../stores/auth.store';
import { tenantsService } from '../../services/tenants.service.ts';
import { UserRole } from '../../lib/permissions';

const GOLD = '#ca8a04';

type TabKey = 'profile' | 'billing';

type TenantSummary = {
  id: string;
  name: string;
  subscriptionStatus: string;
  subscriptionInterval: string | null;
  subscriptionMode: string | null;
  subscriptionEndsAt: string | null;
  gracePeriodEndsAt: string | null;
  concurrentUserLimit: number | null;
  currentActiveSessions: number | null;
};

const formatDate = (value: string | null) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default function UserSettingsPage() {
  const { user } = useAuthStore();
  const isSuperAdmin = user?.role === UserRole.SUPER_ADMIN;
  const availableTabs = useMemo<TabKey[]>(() => (isSuperAdmin ? ['profile', 'billing'] : ['profile']), [isSuperAdmin]);
  const [activeTab, setActiveTab] = useState<TabKey>(availableTabs[0] ?? 'profile');
  const [tenant, setTenant] = useState<TenantSummary | null>(null);
  const [loadingTenant, setLoadingTenant] = useState(false);

  useEffect(() => {
    if (!isSuperAdmin || !user?.tenantId) {
      return;
    }

    let mounted = true;
    const loadTenant = async () => {
      setLoadingTenant(true);
      try {
        const response = await tenantsService.getTenant(user.tenantId);
        if (!mounted) return;
        setTenant({
          id: response.id,
          name: response.name,
          subscriptionStatus: response.subscriptionStatus,
          subscriptionInterval: response.subscriptionInterval,
          subscriptionMode: response.subscriptionMode,
          subscriptionEndsAt: response.subscriptionEndsAt,
          gracePeriodEndsAt: response.gracePeriodEndsAt,
          concurrentUserLimit: response.concurrentUserLimit,
          currentActiveSessions: response.currentActiveSessions
        });
      } catch {
        if (mounted) {
          toast.error('Unable to load subscription details.');
        }
      } finally {
        if (mounted) {
          setLoadingTenant(false);
        }
      }
    };

    loadTenant();
    return () => {
      mounted = false;
    };
  }, [isSuperAdmin, user?.tenantId]);

  useEffect(() => {
    if (!availableTabs.includes(activeTab)) {
      setActiveTab(availableTabs[0] ?? 'profile');
    }
  }, [availableTabs, activeTab]);

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#141417] border border-[#2a2a2e] rounded-2xl p-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">User Settings</h1>
            <p className="text-sm text-[#888]">Manage your profile and subscription details.</p>
          </div>
        </div>

        <div className="mt-6 border-b border-[#2a2a2e] flex flex-wrap gap-2">
          {availableTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 text-sm font-semibold rounded-t-lg"
              style={{
                color: activeTab === tab ? GOLD : '#888',
                borderBottom: activeTab === tab ? `2px solid ${GOLD}` : '2px solid transparent'
              }}
            >
              {tab === 'profile' ? 'User Information' : 'Billing'}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && (
          <div className="mt-6 grid gap-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[#2a2a2e] bg-[#0f0f12] p-4">
                <p className="text-xs uppercase tracking-wide text-[#888]">Full Name</p>
                <p className="mt-2 text-lg text-white">{user?.fullName ?? 'N/A'}</p>
              </div>
              <div className="rounded-xl border border-[#2a2a2e] bg-[#0f0f12] p-4">
                <p className="text-xs uppercase tracking-wide text-[#888]">Email</p>
                <p className="mt-2 text-lg text-white">{user?.email ?? 'N/A'}</p>
              </div>
              <div className="rounded-xl border border-[#2a2a2e] bg-[#0f0f12] p-4">
                <p className="text-xs uppercase tracking-wide text-[#888]">Role</p>
                <p className="mt-2 text-lg text-white">{user?.role ?? 'N/A'}</p>
              </div>
              <div className="rounded-xl border border-[#2a2a2e] bg-[#0f0f12] p-4">
                <p className="text-xs uppercase tracking-wide text-[#888]">Tenant ID</p>
                <p className="mt-2 text-sm text-white break-all">{user?.tenantId ?? 'N/A'}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="mt-6 grid gap-6">
            <div className="rounded-xl border border-[#2a2a2e] bg-[#0f0f12] p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">Subscription Status</h2>
                  <p className="text-sm text-[#888]">Current billing information for your tenant.</p>
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'rgba(202, 138, 4, 0.2)', color: GOLD }}>
                  {loadingTenant ? 'Loading' : tenant?.subscriptionStatus ?? 'Unknown'}
                </div>
              </div>

              <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="rounded-lg border border-[#2a2a2e] bg-[#141417] p-4">
                  <p className="text-xs uppercase tracking-wide text-[#888]">Plan Interval</p>
                  <p className="mt-2 text-base text-white">{tenant?.subscriptionInterval ?? 'N/A'}</p>
                </div>
                <div className="rounded-lg border border-[#2a2a2e] bg-[#141417] p-4">
                  <p className="text-xs uppercase tracking-wide text-[#888]">Payment Mode</p>
                  <p className="mt-2 text-base text-white">{tenant?.subscriptionMode ?? 'N/A'}</p>
                </div>
                <div className="rounded-lg border border-[#2a2a2e] bg-[#141417] p-4">
                  <p className="text-xs uppercase tracking-wide text-[#888]">Subscription Ends</p>
                  <p className="mt-2 text-base text-white">{formatDate(tenant?.subscriptionEndsAt ?? null)}</p>
                </div>
                <div className="rounded-lg border border-[#2a2a2e] bg-[#141417] p-4">
                  <p className="text-xs uppercase tracking-wide text-[#888]">Grace Period Ends</p>
                  <p className="mt-2 text-base text-white">{formatDate(tenant?.gracePeriodEndsAt ?? null)}</p>
                </div>
                <div className="rounded-lg border border-[#2a2a2e] bg-[#141417] p-4">
                  <p className="text-xs uppercase tracking-wide text-[#888]">Concurrent Limit</p>
                  <p className="mt-2 text-base text-white">{tenant?.concurrentUserLimit ?? 'N/A'}</p>
                </div>
                <div className="rounded-lg border border-[#2a2a2e] bg-[#141417] p-4">
                  <p className="text-xs uppercase tracking-wide text-[#888]">Active Sessions</p>
                  <p className="mt-2 text-base text-white">{tenant?.currentActiveSessions ?? 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
