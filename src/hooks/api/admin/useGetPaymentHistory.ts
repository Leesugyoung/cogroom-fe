import { useQuery } from '@tanstack/react-query';

import { adminApi } from '@/api/adminApi';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { AdminPaymentHistoryRequest } from '@/types/admin';

export const useGetPaymentHistory = (params: AdminPaymentHistoryRequest) => {
  const normalizedParams = {
    ...params,
    cursor: params.cursor === 0 ? null : params.cursor,
  };

  return useQuery({
    queryKey: [...ADMIN_QUERY_KEYS.PAYMENT_HISTORY, normalizedParams],
    queryFn: () => adminApi.getPaymentHistory(params),
  });
};
