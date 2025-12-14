import { create } from 'zustand';

import { PLAN_MAPPING } from '@/constants/common';
import type { MemberRole } from '@/types/member';

export type AuthStatus = 'unknown' | 'authenticated' | 'unauthenticated';

interface AuthState {
  status: AuthStatus;
  role: MemberRole | null;
  planId: number | null;

  isUnknown: () => boolean;
  isUnauth: () => boolean;
  isAuth: () => boolean;
  isAdmin: () => boolean;
  isContentProvider: () => boolean;

  isMonthly: () => boolean;
  isYearly: () => boolean;
  isFree: () => boolean;

  setAuthenticated: (role: MemberRole, planId: number) => void;
  setUnauthenticated: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  status: 'unknown',
  role: null,
  planId: null,

  isAuth: () => get().status === 'authenticated',
  isUnauth: () => get().status === 'unauthenticated',
  isUnknown: () => get().status === 'unknown',
  isAdmin: () => get().role === 'ADMIN',
  isContentProvider: () => get().role === 'CONTENT_PROVIDER',

  isMonthly: () => get().planId === PLAN_MAPPING.MONTH,
  isYearly: () => get().planId === PLAN_MAPPING.YEAR,
  isFree: () => get().planId === PLAN_MAPPING.FREE,

  setAuthenticated: (role, planId) => set({ status: 'authenticated', role, planId }),
  setUnauthenticated: () => set({ status: 'unauthenticated', role: null, planId: null }),
  reset: () => set({ status: 'unknown', role: null, planId: null }),
}));
