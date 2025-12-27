'use client';

import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';

import { HTTPError } from '@/api/axios/errors/HTTPError';
import { memberApi } from '@/api/memberApis';
import { MEMBER_QUERY_KEYS } from '@/constants/queryKeys';
import { useAlertModalStore } from '@/stores/useModalStore';

export const useCancelSubscriptionMutation = () => {
  const { open: openAlert } = useAlertModalStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (params: { reason: string }) => memberApi.cancelSubscription(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEMBER_QUERY_KEYS.MEMBER_SUBSCRIPTION });
    },
    onError: (error: HTTPError) => {
      const errorCode = error.code;
      let message = '구독 취소에 실패하였습니다.';

      switch (errorCode) {
        case 'ALREADY_CANCELLED_SUBSCRIPTION':
          message = '이미 취소되었거나 취소 예정인 구독입니다.';
          break;
        case 'USER_NOT_SUBSCRIBED':
          message = '구독 중인 플랜이 없습니다.';
          break;
      }

      openAlert('alert', {
        message,
        type: 'alert',
      });
    },
  });

  return {
    cancelSubscription: (
      params: { reason: string },
      options?: Omit<UseMutationOptions<unknown, HTTPError, { reason: string }>, 'mutationFn'>,
    ) => mutation.mutate(params, options),
  };
};
