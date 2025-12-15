import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { adminApi } from '@/api/adminApi';
import { HTTPError } from '@/api/axios/errors/HTTPError';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { useAlertModalStore } from '@/stores/useModalStore';

export const useUpdateCouponMutation = () => {
  const { open } = useAlertModalStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: adminApi.updateCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...ADMIN_QUERY_KEYS.ADMIN_COUPON_LIST] });
      open('alert', {
        message: '쿠폰이 성공적으로 수정되었습니다.',
        onConfirm: () => router.push('/admin/payments/coupons'),
      });
    },
    onError: (error: HTTPError) => {
      const errorCode = error.code;
      let message = error.message || '쿠폰 수정에 실패했습니다.';

      switch (errorCode) {
        case 'FORBIDDEN_ERROR':
          message = '사용자 권한이 없습니다.';
          break;
        case 'COUPON_FORBIDDEN_ERROR':
          message = '쿠폰 관리 권한이 없습니다.';
          break;
        case 'COUPON_NOT_FOUND':
          message = '해당 쿠폰이 존재하지 않습니다.';
          break;
        case 'DATESTR_NOT_FOUND':
          message = '날짜 데이터가 존재하지 않습니다.';
          break;
        case 'INVALID_DATE_FORMAT':
          message = '날짜 형식이 올바르지 않습니다.';
          break;
        case 'COUPON_DATE_RANGE_ERROR':
          message = '발급 종료일은 발급 시작일보다 늦어야 합니다.';
          break;
        case 'INVALID_COUPON_MAX_ISSUED_COUNT':
          message = '유효하지 않은 발급 가능 수량입니다.';
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
    updateCoupon: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};
