import { useQuery } from '@tanstack/react-query';

import { adminApi } from '@/api/adminApi';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { CouponHistoryRequest } from '@/types/admin';

export function useGetCouponHistory(params: CouponHistoryRequest) {
  return useQuery({
    queryKey: [...ADMIN_QUERY_KEYS.ADMIN_COUPON_HISTORY, params],
    queryFn: () => adminApi.getCouponHistory(params),
    enabled: !!params.couponId,
  });
}
