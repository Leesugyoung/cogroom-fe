import { useMutation } from '@tanstack/react-query';

import { HTTPError } from '@/api/axios/errors/HTTPError';
import { memberApi } from '@/api/memberApis';
import { useAlertModalStore } from '@/stores/useModalStore';

export default function useRegisterCoupon() {
  const { open: openAlert } = useAlertModalStore();

  const mutation = useMutation({
    mutationFn: memberApi.registerCoupon,
    onSuccess: () => {
      openAlert('alert', {
        message: '쿠폰이 등록되었습니다.',
        type: 'alert',
      });
    },
    onError: (error: HTTPError) => {
      const errorCode = error.code;
      let message = error.message || '쿠폰 등록에 실패했습니다.';

      switch (errorCode) {
        case 'COUPON_NOT_FOUND':
          message = '발급받은 쿠폰이 없습니다.';
          break;
        case 'COUPON_ALREADY_USED':
          message = '이미 사용된 쿠폰입니다.';
          break;
        case 'COUPON_EXPIRED':
          message = '만료된 쿠폰입니다.';
          break;
        case 'COUPON_NOT_APPLICABLE':
          message = '해당 상품에 적용할 수 없는 쿠폰입니다.';
          break;
        default:
          break;
      }

      openAlert('alert', {
        message,
        type: 'alert',
      });
    },
  });

  return {
    registerCoupon: (code: string) => mutation.mutate(code),
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
}
