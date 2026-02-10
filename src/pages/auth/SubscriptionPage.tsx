import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, AlertCircle, XCircle, Clock, ShieldAlert } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { paymentsService } from '../../services/payments.service';
import { tenantsService } from '../../services/tenants.service';
import { useAuthStore } from '../../stores/auth.store';
import { TenantSubscriptionAccessStatus } from '../../services/auth.service';
import { toast } from '../../stores/toast.store';

const GOLD = '#ca8a04';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const statusConfig: Record<TenantSubscriptionAccessStatus, { icon: LucideIcon; color: string; title: string; message: string }> = {
  [TenantSubscriptionAccessStatus.NO_SUBSCRIPTION]: {
    icon: AlertCircle,
    color: '#ca8a04',
    title: 'No Active Subscription',
    message: 'Your organization needs an active subscription to access CONTROLHQ. Please select a plan below to continue.'
  },
  [TenantSubscriptionAccessStatus.SUBSCRIPTION_PENDING]: {
    icon: Clock,
    color: '#eab308',
    title: 'Subscription Pending',
    message: 'Your subscription is pending payment confirmation. Please complete your payment to activate your subscription.'
  },
  [TenantSubscriptionAccessStatus.SUBSCRIPTION_ACTIVE]: {
    icon: Check,
    color: '#22c55e',
    title: 'Subscription Active',
    message: 'Your subscription is active and in good standing.'
  },
  [TenantSubscriptionAccessStatus.SUBSCRIPTION_GRACE]: {
    icon: Clock,
    color: '#f59e0b',
    title: 'Subscription in Grace Period',
    message: 'Your subscription is currently in a grace period. Please renew to continue uninterrupted access.'
  },
  [TenantSubscriptionAccessStatus.SUBSCRIPTION_PAST_DUE]: {
    icon: AlertCircle,
    color: '#ef4444',
    title: 'Subscription Past Due',
    message: 'Your subscription payment is past due. Please renew your subscription to restore access.'
  },
  [TenantSubscriptionAccessStatus.SUBSCRIPTION_EXPIRED]: {
    icon: XCircle,
    color: '#dc2626',
    title: 'Subscription Expired',
    message: 'Your subscription has expired. Please renew to regain access to CONTROLHQ.'
  },
  [TenantSubscriptionAccessStatus.SUBSCRIPTION_CANCELED]: {
    icon: XCircle,
    color: '#991b1b',
    title: 'Subscription Canceled',
    message: 'Your subscription has been canceled. Please subscribe to regain access to CONTROLHQ.'
  }
};

export function SubscriptionPage() {
  const { subscriptionAccessStatus, tenant, user, logout } = useAuthStore();
  const [planCurrency, setPlanCurrency] = useState('NGN');
  const [subscriptionPlan, setSubscriptionPlan] = useState<{ name: string; amount: number; interval: string } | null>(null);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'AUTO' | 'MANUAL' | ''>('');

  const status = subscriptionAccessStatus || TenantSubscriptionAccessStatus.NO_SUBSCRIPTION;
  const config = statusConfig[status];
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  useEffect(() => {
    // Only load plans if user is a SUPER_ADMIN
    if (!isSuperAdmin) {
      setLoadingPlans(false);
      return;
    }

    let mounted = true;
    const loadPlans = async () => {
      try {
        const response = await paymentsService.getPlans();
        if (!mounted) {
          return;
        }
        setPlanCurrency(response.currency || 'NGN');
        setSubscriptionPlan(response.subscription || null);
      } catch {
        if (mounted) {
          toast.error('Unable to load pricing plans. Please try again shortly.');
        }
      } finally {
        if (mounted) {
          setLoadingPlans(false);
        }
      }
    };
    loadPlans();
    return () => {
      mounted = false;
    };
  }, [isSuperAdmin]);

  const formatAmount = (amount: number) => {
    try {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: planCurrency || 'NGN',
        maximumFractionDigits: 0
      }).format(amount);
    } catch {
      return `${planCurrency} ${amount.toFixed(0)}`;
    }
  };

  const handleSubscribe = async () => {
    if (!selectedMode) {
      toast.error('Please select a payment mode to continue.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await tenantsService.subscribe({
        subscriptionMode: selectedMode
      });

      if (response.payment?.authorizationUrl) {
        window.location.href = response.payment.authorizationUrl;
        return;
      }
      toast.error('Payment authorization could not be generated. Please contact support.');
    } catch {
      toast.error('Subscription failed. Please try again or contact support.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-[#f2f2f2] py-12 px-4">
      <div className="section-container max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeIn} className="flex items-center justify-center mb-6">
            <img src="/images/logo.png" alt="ControlHQ" className="h-16 w-auto" />
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${config.color}20` }}
            >
              <config.icon className="w-6 h-6" style={{ color: config.color }} />
            </div>
          </motion.div>

          <motion.h1
            variants={fadeIn}
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
          >
            {config.title}
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className="text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: '#ccc' }}
          >
            {config.message}
          </motion.p>

          {tenant && (
            <motion.div variants={fadeIn} className="mt-4">
              <p className="text-sm text-[#888]">
                Organization: <span className="text-[#f2f2f2] font-semibold">{tenant.name}</span>
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Subscription Plans */}
        {!isSuperAdmin ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-12"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
            >
              <ShieldAlert className="w-8 h-8" style={{ color: '#ef4444' }} />
            </div>
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              Administrator Access Required
            </h3>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto mb-6" style={{ color: '#ccc' }}>
              Only your organization's administrators can manage subscriptions.
            </p>
            <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: '#888' }}>
              Please contact your organization's administrator.
            </p>
          </motion.div>
        ) : loadingPlans ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto" style={{ color: GOLD }} />
            <p className="mt-4 text-[#888]">Loading subscription plans...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Subscription Plan Display */}
            <div>
              <h3
                className="text-xl font-semibold mb-4 text-center"
                style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
              >
                Your Subscription Plan
              </h3>
              <div className="max-w-2xl mx-auto">
                <div
                  className="p-6 rounded-lg"
                  style={{
                    backgroundColor: 'rgba(202, 138, 4, 0.15)',
                    border: `2px solid ${GOLD}`
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold" style={{ color: GOLD }}>
                        {subscriptionPlan?.name || 'Control HQ Subscription'}
                      </h4>
                      <p className="text-sm text-[#888]">
                        Billed {subscriptionPlan?.interval || 'annually'}
                      </p>
                    </div>
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: GOLD }}
                    >
                      <Check className="w-4 h-4 text-black" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: GOLD }}>
                    {subscriptionPlan ? formatAmount(subscriptionPlan.amount) : 'Loading...'}
                  </p>
                  <p className="text-xs text-[#888] mt-1">
                    per {subscriptionPlan?.interval || 'year'}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Mode Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3
                className="text-xl font-semibold mb-4 text-center"
                style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
              >
                Choose Payment Mode
              </h3>
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {[
                  { value: 'AUTO' as const, label: 'Automatic Renewal', desc: 'Automatically renew your subscription' },
                  { value: 'MANUAL' as const, label: 'Manual Renewal', desc: 'Manually renew before expiration' }
                ].map((mode) => {
                  const isSelected = selectedMode === mode.value;
                  return (
                    <button
                      key={mode.value}
                      onClick={() => setSelectedMode(mode.value)}
                      className="p-6 rounded-lg text-left transition-all"
                      style={{
                        backgroundColor: isSelected ? 'rgba(202, 138, 4, 0.15)' : '#0f0f12',
                        border: `2px solid ${isSelected ? GOLD : '#2a2a2e'}`
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-semibold" style={{ color: isSelected ? GOLD : '#f2f2f2' }}>
                          {mode.label}
                        </h4>
                        {isSelected && (
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: GOLD }}
                          >
                            <Check className="w-4 h-4 text-black" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-[#888]">{mode.desc}</p>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Subscribe Button */}
            {selectedMode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center pt-4"
              >
                <button
                  onClick={handleSubscribe}
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: GOLD, color: '#000000' }}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Payment'
                  )}
                </button>
                <p className="text-sm text-[#888] mt-4">
                  You will be redirected to a secure payment page to complete your subscription.
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Logout Option */}
        <div className="text-center mt-12">
          <button
            onClick={logout}
            className="text-sm text-[#888] hover:text-[#f2f2f2] transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
