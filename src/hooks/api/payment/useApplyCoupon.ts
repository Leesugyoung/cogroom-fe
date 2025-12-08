import { useMutation } from '@tanstack/react-query';

import { paymentApi } from '@/api/paymentApis';

export const useApplyCouponMutation = () => {
  const mutation = useMutation({
    mutationFn: paymentApi.applyCoupon,
    onSuccess: async () => {},
    onError: () => {
      alert('쿠폰 적용에 실패하였습니다');
    },
  });

  return { applyCoupon: mutation.mutate };
};
