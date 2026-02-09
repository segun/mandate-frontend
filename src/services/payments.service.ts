import { api } from '../lib/api';

export type PaymentPlan = {
  interval: 'MONTHLY' | 'YEARLY';
  amount: number;
};

export type PlansResponse = {
  currency: string;
  plans: PaymentPlan[];
};

export type PaymentVerification = {
  reference: string;
  status: 'success' | 'failed' | 'pending';
  amount: number;
  currency: string;
  paidAt: string | null;
  tenantId: string;
  subscriptionId: string | null;
};

export const paymentsService = {
  async getPlans(): Promise<PlansResponse> {
    const response = await api.get('/payments/plans');
    return response.data.data;
  },

  async verify(reference: string): Promise<PaymentVerification> {
    const response = await api.get('/payments/verify', { params: { reference } });
    return response.data.data;
  }
};
