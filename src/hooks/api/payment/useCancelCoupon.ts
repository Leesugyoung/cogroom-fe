import { useMutation } from '@tanstack/react-query';

import { paymentApi } from '@/api/paymentApis';

export const useCancelCouponMutation = () => {
  const mutation = useMutation({
    mutationFn: paymentApi.cancelCoupon,
    onError: () => {
      alert('쿠폰 취소에 실패하였습니다');
    },
  });

  return { cancelCoupon: mutation.mutate };
};
