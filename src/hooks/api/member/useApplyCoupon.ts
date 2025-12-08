'use client';

import { useMutation } from '@tanstack/react-query';

import { memberApi } from '@/api/memberApis';

export default function useApplyCoupon() {
  const mutation = useMutation({
    mutationFn: memberApi.applyCoupon,
    onSuccess: () => {
      alert('쿠폰이 적용되었습니다.');
    },
    onError: () => {
      alert('쿠폰 적용에 실패하였습니다.');
    },
  });

  return { applyCoupon: mutation.mutate };
}
