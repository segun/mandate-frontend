import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ShoppingCart } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { toast } from '../../stores/toast.store';
import { useAuthStore } from '../../stores/auth.store';
import { TenantSubscriptionAccessStatus } from '../../services/auth.service';
import { tenantsService } from '../../services/tenants.service.ts';
import { paymentsService } from '../../services/payments.service.ts';
import { UserRole } from '../../lib/permissions';

const GOLD = '#ca8a04';

type TabKey = 'profile' | 'billing';

type TenantSummary = {
  id: string;
  name: string;
  subscriptionStatus: string;
  subscriptionAccessStatus?: string | null;
  subscriptionInterval: string | null;
  subscriptionMode: string | null;
  subscriptionEndsAt: string | null;
  gracePeriodEndsAt: string | null;
  maxUsers: number | null;
  defaultUserLimit: number | null;
  totalLicences: number | null;
  extraLicencesPurchased: number | null;
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
  const [searchParams] = useSearchParams();
  const { user, updateSubscriptionStatus } = useAuthStore();
  const isSuperAdmin = user?.role === UserRole.SUPER_ADMIN;
  const availableTabs = useMemo<TabKey[]>(() => (isSuperAdmin ? ['profile', 'billing'] : ['profile']), [isSuperAdmin]);
  const initialTabParam = searchParams.get('tab');
  const initialTab: TabKey = initialTabParam === 'billing' && isSuperAdmin ? 'billing' : 'profile';
  const [activeTab, setActiveTab] = useState<TabKey>(availableTabs.includes(initialTab) ? initialTab : availableTabs[0] ?? 'profile');
  const [tenant, setTenant] = useState<TenantSummary | null>(null);
  const [loadingTenant, setLoadingTenant] = useState(false);
  const [licencePlan, setLicencePlan] = useState<{ name: string; amount: number; interval: string; currency: string } | null>(null);
  const [licenceQuantity, setLicenceQuantity] = useState(1);
  const [buyingLicence, setBuyingLicence] = useState(false);

  useEffect(() => {
    const tenantId = user?.tenantId;

    if (!isSuperAdmin || !tenantId) {
      return;
    }

    let mounted = true;
    const loadTenant = async () => {
      setLoadingTenant(true);
      try {
        const response = await tenantsService.getTenant(tenantId);
        if (!mounted) return;
        if (response.subscriptionAccessStatus) {
          updateSubscriptionStatus(response.subscriptionAccessStatus as TenantSubscriptionAccessStatus, {
            id: response.id,
            name: response.name,
            slug: response.slug,
            isActive: response.isActive,
            subscriptionStatus: response.subscriptionStatus,
            subscriptionAccessStatus: response.subscriptionAccessStatus as TenantSubscriptionAccessStatus,
            subscriptionInterval: response.subscriptionInterval,
            subscriptionMode: response.subscriptionMode,
            subscriptionEndsAt: response.subscriptionEndsAt,
            gracePeriodEndsAt: response.gracePeriodEndsAt
          });
        }
        setTenant({
          id: response.id,
          name: response.name,
          subscriptionStatus: response.subscriptionStatus,
          subscriptionAccessStatus: response.subscriptionAccessStatus ?? null,
          subscriptionInterval: response.subscriptionInterval,
          subscriptionMode: response.subscriptionMode,
          subscriptionEndsAt: response.subscriptionEndsAt,
          gracePeriodEndsAt: response.gracePeriodEndsAt,
          maxUsers: response.maxUsers ?? null,
          defaultUserLimit: response.defaultUserLimit ?? null,
          totalLicences: response.totalLicences ?? null,
          extraLicencesPurchased: response.extraLicencesPurchased ?? null
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

    const loadLicencePlan = async () => {
      try {
        const plansResponse = await paymentsService.getPlans();
        if (!mounted) return;
        setLicencePlan({
          name: plansResponse.licence.name,
          amount: plansResponse.licence.amount,
          interval: plansResponse.licence.interval,
          currency: plansResponse.currency
        });
      } catch {
        if (mounted) {
          toast.error('Unable to load licence pricing.');
        }
      }
    };

    loadTenant();
    loadLicencePlan();
    return () => {
      mounted = false;
    };
  }, [isSuperAdmin, user?.tenantId, updateSubscriptionStatus]);

  const formatAmount = (amount: number, currency: string) => {
    try {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: currency || 'NGN',
        maximumFractionDigits: 0
      }).format(amount);
    } catch {
      return `${currency} ${amount.toFixed(0)}`;
    }
  };

  const handleBuyLicence = async () => {
    if (licenceQuantity < 1 || licenceQuantity > 100) {
      toast.error('Please select a valid quantity (1-100).');
      return;
    }

    setBuyingLicence(true);
    try {
      const response = await paymentsService.buyLicences({ quantity: licenceQuantity });
      if (response.authorizationUrl) {
        window.location.href = response.authorizationUrl;
      } else {
        toast.error('Unable to initialize payment. Please try again.');
      }
    } catch {
      toast.error('Failed to initialize licence purchase. Please try again.');
    } finally {
      setBuyingLicence(false);
    }
  };

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const desiredTab: TabKey | null = tabParam === 'billing' && isSuperAdmin ? 'billing' : tabParam === 'profile' ? 'profile' : null;

    if (desiredTab && availableTabs.includes(desiredTab) && desiredTab !== activeTab) {
      setActiveTab(desiredTab);
      return;
    }

    if (!availableTabs.includes(activeTab)) {
      setActiveTab(availableTabs[0] ?? 'profile');
    }
  }, [availableTabs, activeTab, searchParams, isSuperAdmin, updateSubscriptionStatus]);

  const subscriptionBanner = useMemo(() => {
    const status = tenant?.subscriptionAccessStatus || tenant?.subscriptionStatus;
    if (!status) return null;

    const lower = status.toLowerCase();
    if (lower === 'subscription_active') return null;

    const isGrace = lower === 'subscription_grace';
    const isDanger = lower === 'subscription_expired' || lower === 'subscription_canceled' || lower === 'no_subscription';

    const bg = isDanger ? 'rgba(239,68,68,0.08)' : 'rgba(234,179,8,0.08)';
    const border = isDanger ? '#ef4444' : '#eab308';
    const color = isDanger ? '#ef4444' : '#eab308';

    const message = (() => {
      if (isGrace) return 'Your subscription is in a grace period. Please renew to avoid interruption.';
      if (lower === 'subscription_pending') return 'Your subscription is pending payment confirmation. Complete payment to activate.';
      if (lower === 'subscription_past_due') return 'Your subscription payment is past due. Please renew to restore good standing.';
      if (lower === 'subscription_expired') return 'Your subscription has expired. Please renew to regain access.';
      if (lower === 'subscription_canceled') return 'Your subscription is canceled. Please subscribe again to regain access.';
      if (lower === 'no_subscription') return 'No active subscription found. Please subscribe to continue.';
      return null;
    })();

    if (!message) return null;

    return {
      message,
      bg,
      border,
      color
    };
  }, [tenant?.subscriptionAccessStatus, tenant?.subscriptionStatus]);

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
                <p className="text-xs uppercase tracking-wide text-[#888]">Admin ID</p>
                <p className="mt-2 text-sm text-white break-all">{user?.tenantId ?? 'N/A'}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="mt-6 grid gap-6">
            {subscriptionBanner && (
              <div
                className="rounded-xl border p-4"
                style={{ backgroundColor: subscriptionBanner.bg, borderColor: subscriptionBanner.border, color: subscriptionBanner.color }}
              >
                <p className="text-sm font-semibold">{subscriptionBanner.message}</p>
              </div>
            )}
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
                  <p className="text-xs uppercase tracking-wide text-[#888]">Max Users</p>
                  <p className="mt-2 text-base text-white">{tenant?.maxUsers ?? 'N/A'}</p>
                </div>
                <div className="rounded-lg border border-[#2a2a2e] bg-[#141417] p-4">
                  <p className="text-xs uppercase tracking-wide text-[#888]">Default User Limit</p>
                  <p className="mt-2 text-base text-white">{tenant?.defaultUserLimit ?? 'N/A'}</p>
                </div>
                <div className="rounded-lg border border-[#2a2a2e] bg-[#141417] p-4">
                  <p className="text-xs uppercase tracking-wide text-[#888]">Total Licences</p>
                  <p className="mt-2 text-base text-white">{tenant?.totalLicences ?? 'N/A'}</p>
                </div>
                <div className="rounded-lg border border-[#2a2a2e] bg-[#141417] p-4">
                  <p className="text-xs uppercase tracking-wide text-[#888]">Extra Licences Purchased</p>
                  <p className="mt-2 text-base text-white">{tenant?.extraLicencesPurchased ?? 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#2a2a2e] bg-[#0f0f12] p-6">
              <div>
                <h2 className="text-lg font-semibold text-white">Purchase User Licences</h2>
                <p className="text-sm text-[#888] mt-1">Add more user licences to your subscription.</p>
              </div>

              {licencePlan ? (
                <div className="mt-6">
                  <div className="rounded-lg border border-[#2a2a2e] bg-[#141417] p-4 mb-4">
                    <p className="text-xs uppercase tracking-wide text-[#888]">{licencePlan.name}</p>
                    <p className="mt-2 text-2xl font-bold text-white">
                      {formatAmount(licencePlan.amount, licencePlan.currency)}
                    </p>
                    <p className="text-sm text-[#888]">per user / {licencePlan.interval}</p>
                  </div>

                  <div className="flex items-end gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-2 text-[#ccc]">
                        Number of licences
                      </label>
                      <select
                        value={licenceQuantity}
                        onChange={(e) => setLicenceQuantity(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-lg text-base"
                        style={{
                          backgroundColor: '#141417',
                          border: '1px solid #2a2a2e',
                          color: '#f5f5f5'
                        }}
                      >
                        {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'licence' : 'licences'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={handleBuyLicence}
                      disabled={buyingLicence}
                      className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-opacity"
                      style={{
                        backgroundColor: GOLD,
                        color: '#000',
                        opacity: buyingLicence ? 0.7 : 1
                      }}
                    >
                      {buyingLicence ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          Buy Licences
                        </>
                      )}
                    </button>
                  </div>

                  <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: '#141417', border: '1px solid #2a2a2e' }}>
                    <p className="text-sm font-medium text-white">
                      Total: {formatAmount(licencePlan.amount * licenceQuantity, licencePlan.currency)}
                    </p>
                    <p className="text-xs text-[#888] mt-1">
                      You will be redirected to Paystack to complete the payment.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-6 flex items-center gap-2 text-sm text-[#888]">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading licence pricing...
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
