'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { HTTPError } from '@/api/axios/errors/HTTPError';
import { memberApi } from '@/api/memberApis';
import { useAlertModalStore } from '@/stores/useModalStore';
import { DeletePaymentMethodRequest } from '@/types/member';

export const useDeletePaymentMethodMutation = () => {
  const { open: openAlert } = useAlertModalStore();

  const mutation = useMutation({
    mutationFn: (params: DeletePaymentMethodRequest) => memberApi.deletePaymentMethod(params),
    onSuccess: () => {
      openAlert('alert', {
        message: '결제 수단이 삭제되었습니다.',
        type: 'alert',
      });
    },
    onError: (error: HTTPError) => {
      const errorCode = error.code;
      let message = '결제 수단 삭제에 실패하였습니다.';

      switch (errorCode) {
        case 'PAYMENT_METHOD_NOT_FOUND':
          message = '등록된 결제 수단을 찾을 수 없습니다.';
          break;
        case 'CANNOT_DELETE_DEFAULT_PAYMENT_METHOD':
          message = '활성 구독이 있는 경우 마지막 결제 수단을 삭제할 수 없습니다.';
          break;
      }

      openAlert('alert', {
        message,
        type: 'alert',
      });
    },
  });

  return {
    deletePaymentMethod: (
      params: DeletePaymentMethodRequest,
      options?: Omit<UseMutationOptions<unknown, HTTPError, DeletePaymentMethodRequest>, 'mutationFn'>,
    ) => mutation.mutate(params, options),
  };
};
