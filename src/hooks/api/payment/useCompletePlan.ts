import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { paymentApi } from '@/api/paymentApis';
import { DEFAULT_PAYMENT_SUCCESS } from '@/constants/image';
import { useLargeModalStore, useMediumModalStore } from '@/stores/useModalStore2';

export const useCompletePlanMutation = () => {
  const router = useRouter();
  const { open: largeStoreOpen, close: largeStoreClose } = useLargeModalStore();
  const { open: mediumStoreOpen, close: mediumStoreClose } = useMediumModalStore();

  const mutation = useMutation({
    mutationFn: paymentApi.completePlan,
    onSuccess: async () => {
      largeStoreOpen('info', {
        title: '결제 완료',
        description: '이제, 코그룸을 더욱 자유롭게 이용해보세요!',
        imageSrc: DEFAULT_PAYMENT_SUCCESS,

        primaryButton: {
          label: '시작하기',
          onClick: () => {
            router.push('/daily');
            largeStoreClose();
          },
        },
        assistiveButton: {
          label: '마이페이지',
          onClick: () => {
            router.push('/mypage/purchase/subscribe');
            largeStoreClose();
          },
        },
      });
    },
    onError: () => {
      mediumStoreOpen('alert', {
        title: '결제 실패',
        description: '결제가 정상적으로 처리 되지 않았습니다.',
        buttonColor: 'primary',

        button: {
          label: '확인',
          onClick: mediumStoreClose,
        },
      });
    },
  });

  return { completePlan: mutation.mutate };
};
