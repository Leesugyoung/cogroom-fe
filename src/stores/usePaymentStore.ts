import { create } from 'zustand';

interface PaymentState {
  isResuming: boolean;
  setIsResuming: (status: boolean) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  isResuming: false,
  setIsResuming: (status) => set({ isResuming: status }),
}));
