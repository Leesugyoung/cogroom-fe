import { useMutation, useQueryClient } from '@tanstack/react-query';

import { HTTPError } from '@/api/axios/errors/HTTPError';
import { paymentApi } from '@/api/paymentApis';
import { MEMBER_QUERY_KEYS } from '@/constants/queryKeys';
import { useAlertModalStore } from '@/stores/useModalStore';

export const usePlanChangeMutation = () => {
  const { open: openAlert } = useAlertModalStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: paymentApi.changePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEMBER_QUERY_KEYS.MEMBER_SUBSCRIPTION });
      openAlert('alert', { message: '플랜 변경이 완료되었습니다.' });
    },
    onError: (error: HTTPError) => {
      const errorCode = error.code;

      let errorMessage = '플랜 변경에 실패했습니다.';

      switch (errorCode) {
        case 'SUBSCRIPTION_NOT_FOUND':
          errorMessage = '결제 구독 정보를 찾을 수 없습니다.';
          break;
        case 'PAYMENT_HISTORY_NOT_FOUND':
          errorMessage = '해당 결제 내역을 찾을 수 없습니다.';
          break;
        case 'INVALID_PLAN_CHANGE':
          errorMessage = '해당 플랜으로 업그레이드 및 다운그레이드 할 수 없습니다.';
          break;
        case 'PRESENT_PAYMENT_METHOD_NOT_FOUND':
          errorMessage = '대표 결제 수단이 존재하지 않습니다.';
          break;
      }

      openAlert('error', { message: errorMessage });
    },
  });

  return { planChange: mutation.mutate, isLoading: mutation.isPending };
};
