import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { adminApi } from '@/api/adminApi';
import { HTTPError } from '@/api/axios/errors/HTTPError';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { useAlertModalStore } from '@/stores/useModalStore';

export const useCreateCouponMutation = () => {
  const { open } = useAlertModalStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: adminApi.createCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...ADMIN_QUERY_KEYS.ADMIN_COUPON_LIST] });
      open('alert', {
        message: '쿠폰이 성공적으로 등록되었습니다.',
        onConfirm: () => router.push('/admin/payments/coupons'),
      });
    },
    onError: (error: HTTPError) => {
      const errorCode = error.code;
      let message = error.message || '쿠폰 등록에 실패했습니다.';

      switch (errorCode) {
        case 'COUPON_CODE_DUPLICATE':
          message = '이미 존재하는 쿠폰 코드입니다.';
          break;
        case 'INVALID_DISCOUNT_VALUE':
          message = '할인 값이 유효하지 않습니다.';
          break;
        case 'INVALID_DATE_RANGE':
          message = '사용 기간이 유효하지 않습니다.';
          break;
        case 'INVALID_TARGET_PLAN':
          message = '선택한 사용범위가 유효하지 않습니다.';
          break;
        default:
          break;
      }

      open('alert', {
        message,
        type: 'alert',
      });
    },
  });

  return {
    createCoupon: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};
