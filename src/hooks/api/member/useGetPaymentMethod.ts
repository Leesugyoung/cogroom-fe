import { useQuery } from '@tanstack/react-query';

import { memberApi } from '@/api/memberApis';
import { MEMBER_QUERY_KEYS } from '@/constants/queryKeys';
import { useAuthStore } from '@/stores/useAuthStore';

export default function useGetPaymentMethod() {
  const isAuth = useAuthStore((s) => s.isAuth());

  return useQuery({
    queryKey: [...MEMBER_QUERY_KEYS.MEMBER_PAYMENT_METHOD],
    queryFn: memberApi.getPaymentMethod,
    enabled: isAuth,
  });
}
