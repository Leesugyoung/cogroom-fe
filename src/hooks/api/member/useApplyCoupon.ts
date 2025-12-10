'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { HTTPError } from '@/api/axios/errors/HTTPError';
import { memberApi } from '@/api/memberApis';
import { useAlertModalStore } from '@/stores/useModalStore';
import { ApplyCouponRequest } from '@/types/coupon';

export const useApplyCoupon = () => {
  const { open: openAlert } = useAlertModalStore();

  const mutation = useMutation({
    mutationFn: (params: ApplyCouponRequest) => memberApi.applyCoupon(params),
    onSuccess: () => {
      openAlert('alert', {
        message: '쿠폰이 적용되었습니다.',
        type: 'alert',
      });
    },
    onError: (error: HTTPError) => {
      const errorCode = error.code;
      let message = error.message || '쿠폰을 사용할 수 없습니다.';

      switch (errorCode) {
        case 'COUPON_NOT_FOUND':
          message = '발급받은 쿠폰이 없습니다.';
          break;
        case 'COUPON_EXPIRED':
          message = '만료된 쿠폰입니다.';
          break;
        case 'COUPON_ALREADY_USED':
          message = '이미 사용된 쿠폰입니다.';
          break;
        case 'COUPON_NOT_APPLICABLE':
          message = '해당 상품에 적용할 수 없는 쿠폰입니다.';
          break;
        case 'COUPON_EXPIRED_BEFORE_NEXT_PAYMENT':
          message = '다음 정기결제 이전에 만료되는 쿠폰입니다.';
          break;
      }

      openAlert('alert', {
        message,
        type: 'alert',
      });
    },
  });

  return {
    applyCouponToSubscription: (
      params: ApplyCouponRequest,
      options?: Omit<UseMutationOptions<unknown, HTTPError, ApplyCouponRequest>, 'mutationFn'>,
    ) => mutation.mutate(params, options),
  };
};
