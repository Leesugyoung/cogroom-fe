'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { HTTPError } from '@/api/axios/errors/HTTPError';
import { memberApi } from '@/api/memberApis';
import { useAlertModalStore } from '@/stores/useModalStore';
import { ChangeDefaultPaymentMethodRequest } from '@/types/member';

export const useChangeDefaultPaymentMethodMutation = () => {
  const { open: openAlert } = useAlertModalStore();

  const mutation = useMutation({
    mutationFn: (params: ChangeDefaultPaymentMethodRequest) => memberApi.changeDefaultPaymentMethod(params),
    onSuccess: () => {
      openAlert('alert', {
        message: '대표 결제 수단이 변경되었습니다.',
        type: 'alert',
      });
    },
    onError: (error: HTTPError) => {
      const errorCode = error.code;
      let message = '대표 결제 수단 변경에 실패하였습니다.';

      switch (errorCode) {
        case 'ALREADY_PRESENTED_PAYMENT_METHOD':
          message = '이미 대표 수단입니다.';
          break;
        case 'PAYMENT_METHOD_NOT_FOUND':
          message = '결제 수단이 존재하지 않습니다.';
          break;
      }

      openAlert('alert', {
        message,
        type: 'alert',
      });
    },
  });

  return {
    changeDefaultPaymentMethod: (
      params: ChangeDefaultPaymentMethodRequest,
      options?: Omit<UseMutationOptions<unknown, HTTPError, ChangeDefaultPaymentMethodRequest>, 'mutationFn'>,
    ) => mutation.mutate(params, options),
  };
};
