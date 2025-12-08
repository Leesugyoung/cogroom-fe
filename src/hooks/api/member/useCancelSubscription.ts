'use client';

import { useMutation } from '@tanstack/react-query';

import { memberApi } from '@/api/memberApis';

export const useCancelSubscriptionMutation = () => {
  const mutation = useMutation({
    mutationFn: memberApi.cancelSubscription,
    onError: () => {
      alert('구독 취소에 실패하였습니다.');
    },
  });

  return { cancelSubscription: mutation.mutate };
};
