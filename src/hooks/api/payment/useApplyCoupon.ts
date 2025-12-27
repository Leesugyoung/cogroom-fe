import { useMutation, useQueryClient } from '@tanstack/react-query';

import { paymentApi } from '@/api/paymentApis';
import { PAYMENT_QUERY_KEYS } from '@/constants/queryKeys';

export const useApplyCouponMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: paymentApi.applyCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...PAYMENT_QUERY_KEYS.APPLIED_COUPON] });
    },
    onError: () => {
      alert('쿠폰 적용에 실패하였습니다');
    },
  });

  return { applyCoupon: mutation.mutate };
};
