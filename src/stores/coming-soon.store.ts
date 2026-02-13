import { create } from 'zustand';
import { api } from '../lib/api';

interface ComingSoonState {
  isComingSoon: boolean;
  isLoading: boolean;
  error: string | null;
  fetchStatus: () => Promise<void>;
}

export const useComingSoonStore = create<ComingSoonState>((set) => ({
  isComingSoon: false,
  isLoading: true,
  error: null,
  
  fetchStatus: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get('/status/coming-soon');
      
      const comingSoon = response.data?.data?.comingSoon ?? false;
      set({ isComingSoon: comingSoon });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      set({ error: errorMessage, isComingSoon: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
