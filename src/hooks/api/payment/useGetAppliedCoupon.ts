import { useQuery } from '@tanstack/react-query';

import { paymentApi } from '@/api/paymentApis';
import { PAYMENT_QUERY_KEYS } from '@/constants/queryKeys';
import { useAuthStore } from '@/stores/useAuthStore';
import { AppliedCouponRequest } from '@/types/payment';

export const useGetAppliedCoupon = ({ paymentHistoryId }: AppliedCouponRequest) => {
  const isAuth = useAuthStore((s) => s.isAuth());

  return useQuery({
    queryKey: [...PAYMENT_QUERY_KEYS.APPLIED_COUPON],
    queryFn: () => paymentApi.getAppliedCoupon({ paymentHistoryId }),
    enabled: isAuth && !!paymentHistoryId,
  });
};
