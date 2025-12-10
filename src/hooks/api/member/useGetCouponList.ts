import { useQuery } from '@tanstack/react-query';

import { memberApi } from '@/api/memberApis';
import { GetCouponListParams } from '@/types/coupon';

export default function useGetCouponList(params?: GetCouponListParams) {
  return useQuery({
    queryKey: ['member', 'coupon-list', params],
    queryFn: () => memberApi.getCouponList(params),
  });
}
