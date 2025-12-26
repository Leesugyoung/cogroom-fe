import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { MEMBER_QUERY_KEYS } from '@/constants/queryKeys';
import { useVerifyPaymentMutation } from '@/hooks/api/payment/useVerifyPayment';
import { useAlertModalStore } from '@/stores/useModalStore';
import { PaymentMethod } from '@/types/payment';
import { requestIdentityVerification, requestBillingKey, BillingRequestParams } from '@/utils/portone';

interface RegisterPaymentMethodParams {
  paymentMethod: PaymentMethod; // 'CARD' | 'KAKAO_PAY'
  billingParams: BillingRequestParams;
  isFromMyPage?: boolean; // 마이페이지에서 호출했는지 구분 (기본값: false)
}

export const useRegisterPaymentMethod = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { open: openAlert } = useAlertModalStore();
  const { verifyPayment } = useVerifyPaymentMutation();
  const queryClient = useQueryClient();

  const billingKeyMutation = useMutation({
    mutationFn: async ({ paymentMethod, billingParams, isFromMyPage }: RegisterPaymentMethodParams) => {
      setIsProcessing(true);

      try {
        let identityVerificationId: string | undefined;

        // 1. 본인인증 (카드결제인 경우만)
        if (paymentMethod === 'CARD') {
          const identityRes = await requestIdentityVerification(isFromMyPage);

          if (!identityRes) {
            throw new Error('본인인증에 실패하였습니다');
          }

          identityVerificationId = identityRes.identityVerificationId;
        }
        // 카카오페이는 본인인증 건너뜀

        let verifyData;

        // 2. 서버 검증 (카드결제인 경우만)
        if (paymentMethod === 'CARD') {
          verifyData = await verifyPayment({
            identityVerificationId,
          });
        }

        // 3. 빌링키 생성 (결제수단에 따라 다른 함수 호출)
        const billingKeyRes = await requestBillingKey(paymentMethod, {
          ...billingParams,
          ...(verifyData && {
            customer: {
              customerId: String(verifyData.memberId),
              fullName: verifyData.name,
              phoneNumber: verifyData.phoneNumber,
              email: verifyData.email,
            },
          }),
        });

        if (!billingKeyRes || (billingKeyRes as { code?: string }).code) {
          throw new Error('결제 정보를 등록하는 데 실패하였습니다');
        }

        // 4. 성공 시 빌링키 정보 반환
        return {
          billingKey: billingKeyRes,
          verifyData,
          paymentMethod,
        };
      } finally {
        setIsProcessing(false);
      }
    },
    onSuccess: (data) => {
      const methodText = data.paymentMethod === 'CARD' ? '카드' : '카카오페이';
      openAlert('alert', { message: `${methodText} 결제 수단이 성공적으로 등록되었습니다.` });

      // 결제 수단 목록 새로고침
      queryClient.invalidateQueries({
        queryKey: MEMBER_QUERY_KEYS.MEMBER_PAYMENT_METHOD,
      });
    },
    onError: (error: Error) => {
      openAlert('error', { message: error.message || '결제 수단 등록에 실패했습니다.' });
    },
  });

  return {
    registerPaymentMethod: billingKeyMutation.mutate,
    isLoading: billingKeyMutation.isPending || isProcessing,
    isSuccess: billingKeyMutation.isSuccess,
    isError: billingKeyMutation.isError,
    data: billingKeyMutation.data,
  };
};
