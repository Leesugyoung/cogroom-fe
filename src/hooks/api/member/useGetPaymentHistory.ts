import { useQuery } from '@tanstack/react-query';

import { memberApi } from '@/api/memberApis';
import { PaymentHistoryParams } from '@/types/payment';

export default function useGetPaymentHistory(params?: PaymentHistoryParams) {
  const normalizedParams = params
    ? {
        ...params,
        cursor: params.cursor === 0 ? null : params.cursor,
      }
    : undefined;

  return useQuery({
    queryKey: ['member', 'payment-history', normalizedParams],
    queryFn: () => memberApi.getPaymentHistory(params),
  });
}
