import { useInfiniteQuery } from '@tanstack/react-query';

import { paymentApi } from '@/api/paymentApis';
import { PAYMENT_QUERY_KEYS } from '@/constants/queryKeys';

export default function useGetCoupons() {
  return useInfiniteQuery({
    queryKey: PAYMENT_QUERY_KEYS.COUPONS,
    queryFn: ({ pageParam = null }) =>
      paymentApi.getCoupons({
        cursor: pageParam,
      }),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.last) return null;
      return lastPage.nextCursor ?? null;
    },
  });
}
