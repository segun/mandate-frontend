import axios from 'axios';
import { TenantSubscriptionAccessStatus } from '../services/auth.service';
import { useAuthStore } from '../stores/auth.store';
import { toast } from '../stores/toast.store';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
// Standard page size for API lists; keep at or below backend max (100)
export const DEFAULT_PAGE_LIMIT = 100;
// Smaller page size for modal tables to avoid overwhelming the UI
export const DEFAULT_MODAL_PAGE_LIMIT = 20;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let lastToastStatus: TenantSubscriptionAccessStatus | null = null;

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors and subscription meta
api.interceptors.response.use(
  (response) => {
    const meta = response?.data?.meta;
    const subscription = meta?.subscription;

    if (subscription) {
      const status = subscription.subscriptionAccessStatus as TenantSubscriptionAccessStatus | undefined;
      const tenant = subscription.tenant;

      if (status) {
        const store = useAuthStore.getState();
        store.updateSubscriptionStatus(status, tenant);

        const isActive =
          status === TenantSubscriptionAccessStatus.SUBSCRIPTION_ACTIVE ||
          status === TenantSubscriptionAccessStatus.SUBSCRIPTION_GRACE;

        const pathname = window.location.pathname;
        const isBillingPage = pathname.startsWith('/user/settings');

        if (!isActive && !isBillingPage) {
          if (status !== lastToastStatus) {
            const message = (() => {
              switch (status) {
                case TenantSubscriptionAccessStatus.SUBSCRIPTION_PENDING:
                  return 'Your subscription is pending payment confirmation. Please complete payment.';
                case TenantSubscriptionAccessStatus.SUBSCRIPTION_PAST_DUE:
                  return 'Your subscription payment is past due. Please renew to restore access.';
                case TenantSubscriptionAccessStatus.SUBSCRIPTION_EXPIRED:
                  return 'Your subscription has expired. Please renew to regain access.';
                case TenantSubscriptionAccessStatus.SUBSCRIPTION_CANCELED:
                  return 'Your subscription is canceled. Please subscribe again to continue.';
                case TenantSubscriptionAccessStatus.NO_SUBSCRIPTION:
                  return 'No active subscription found. Please subscribe to continue.';
                default:
                  return 'Subscription requires attention. Please review your billing.';
              }
            })();

            toast.warning(message);
            lastToastStatus = status;
          }
        } else if (isActive) {
          lastToastStatus = null;
        }
      }
    }

    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect if we actually had a token (genuine expiry),
      // and avoid redirect loops if already on /login
      const hadToken = !!localStorage.getItem('accessToken');
      localStorage.removeItem('accessToken');
      if (hadToken && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
