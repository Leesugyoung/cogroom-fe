import { useState } from 'react';

import { useLargeModalStore, useMediumModalStore } from '@/stores/useModalStore2';

import { useCancelSubscriptionMutation } from '../api/member/useCancelSubscription';

/**
 * 3단계 구독 취소 플로우를 관리하는 훅
 * 1. 혜택 안내 (CancelSubscription - Large Custom Modal)
 * 2. 취소 사유 입력 (Form - Large Base Modal)
 * 3. 최종 결과 알림 (AlertMedium - Medium Base Modal)
 */
export const useCancelSubscriptionFlow = () => {
  const largeModal = useLargeModalStore();
  const mediumModal = useMediumModalStore();

  const [cancelReason, setCancelReason] = useState<string>('');

  const { cancelSubscription } = useCancelSubscriptionMutation();

  /**
   * 3단계: API를 호출하고 최종 결과 모달 열기
   */
  const startStep3 = (reason: string) => {
    largeModal.close(); // 2단계 Form 모달 닫기

    cancelSubscription(
      { reason },
      {
        onSuccess: () => {
          openResultModal('마음이 부를 때, 다시 만나요', '플랜이 취소되었습니다', 'primary');
        },
      },
    );
  };

  /**
   * 3단계 결과 모달 열기 (AlertMedium)
   */
  const openResultModal = (title: string, description: string, buttonColor: 'primary' | 'assistive') => {
    mediumModal.open('alert', {
      title: title,
      description: description,
      buttonColor: buttonColor,
      button: { label: '확인했어요', onClick: mediumModal.close },
    });
  };

  /**
   * 2단계: 취소 사유 입력 모달 열기 (Large Form Modal)
   */
  const startStep2 = () => {
    largeModal.close(); // 1단계 모달 닫기

    largeModal.open('form', {
      title: '왜 플랜을 취소하시나요?',
      description: '목소리를 들려주세요!',
      maxLength: 100,
      placeholder: '예)\n잠시 쉬었다 올게요\n이런기능이 있었으면 좋겠어요.',

      value: cancelReason,
      onValueChange: setCancelReason,

      primaryButton: {
        label: '계속 성장하기',
        onClick: largeModal.close,
      },
      assistiveButton: {
        label: '플랜 취소하기',
        onClick: (reason?: string) => {
          const finalReason = reason || cancelReason;

          startStep3(finalReason);
        },
      },
    });
  };

  /**
   * 1단계: 구독 취소 혜택 안내 모달을 엽니다. (Large Custom Modal)
   */
  const startStep1 = () => {
    largeModal.open('cancelSubscription', {
      onNext: startStep2,
    });
  };

  return {
    openCancelFlow: startStep1,
  };
};
