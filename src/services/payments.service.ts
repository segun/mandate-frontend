import { api } from '../lib/api';

export type PaymentPlan = {
  planCode: string;
  name: string;
  amount: number;
  interval: string;
};

export type PlansResponse = {
  currency: string;
  subscription: PaymentPlan;
  licence: PaymentPlan;
};

export type PaymentVerification = {
  reference: string;
  status: 'success' | 'failed' | 'pending';
  amount: number;
  currency: string;
  paidAt: string | null;
  tenantId: string | null;
  subscriptionId: string | null;
  licenceQuantity?: number | null;
  purpose?: 'subscription' | 'licence';
  raw?: unknown;
};

export type BuyLicencesRequest = {
  quantity: number;
};

export type BuyLicencesResponse = {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
  amount: number;
  interval?: string;
  flow?: 'licence';
  licenceQuantity?: number;
  tenantId?: string;
};

export const paymentsService = {
  async getPlans(): Promise<PlansResponse> {
    const response = await api.get('/payments/plans');
    return response.data.data;
  },

  async verify(reference: string): Promise<PaymentVerification> {
    const response = await api.get('/payments/verify', { params: { reference } });
    return response.data.data;
  },

  async buyLicences(request: BuyLicencesRequest): Promise<BuyLicencesResponse> {
    const response = await api.post('/payments/buy-licences', request);
    return response.data.data;
  }
};
