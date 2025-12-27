import { useVerifyPaymentMutation } from '@/hooks/api/payment/useVerifyPayment';
import { clearPaymentState, savePaymentState } from '@/stores/paymentStorage';
import { PaymentMethod } from '@/types/payment';
import { requestIdentityVerification, requestBillingKey, BillingRequestParams } from '@/utils/portone';

import { useCompletePlanMutation } from './useCompletePlan';

export const usePaymentProcessor = () => {
  const { completePlan } = useCompletePlanMutation();
  const { verifyPayment } = useVerifyPaymentMutation();

  /**
   * 결제 수단 유효성 검사
   * @param resumedIdentityId: 본인 인증 리다이렉트 후 돌아온 경우 전달받는 ID
   */
  const validatePaymentMethod = async ({
    paymentMethod,
    paymentHistoryId,
    resumedIdentityId,
    isFromMyPage,
  }: {
    paymentMethod: PaymentMethod;
    paymentHistoryId?: number;
    resumedIdentityId?: string;
    isFromMyPage?: boolean;
  }) => {
    let identityVerificationId = resumedIdentityId;

    // CARD이면서, 아직 인증 ID가 없는 경우에만 인증 창 실행
    if (paymentMethod === 'CARD' && !identityVerificationId) {
      const identityRes = await requestIdentityVerification(isFromMyPage);
      identityVerificationId = identityRes?.identityVerificationId;
    }

    // 서버 검증 (인증 ID가 있든 없든(카카오페이 등) 공통 실행)
    return await verifyPayment({
      identityVerificationId,
      paymentHistoryId,
    });
  };

  /**
   * 빌링키 등록 프로세스
   * @param resumedIdentityId: 리다이렉트 재개 시 사용하는 인증 ID
   */
  const registerBillingMethod = async ({
    paymentMethod,
    paymentHistoryId,
    planId,
    resumedIdentityId,
    isFromMyPage,
  }: {
    paymentMethod: PaymentMethod;
    paymentHistoryId?: number;
    planId?: number;
    resumedIdentityId?: string;
    isFromMyPage?: boolean;
  }): Promise<boolean> => {
    try {
      // 1. 처음 시작하는 경우(resumedIdentityId 없음)에만 세션에 상태 저장
      if (!resumedIdentityId) {
        savePaymentState({ paymentHistoryId, paymentMethod, planId });
      }
      // 2. 수단 검증 (본인인증 포함) - 주입받은 인증 ID가 있으면 validatePaymentMethod가 인증 창을 띄우지 않음
      const verifyData = await validatePaymentMethod({
        paymentMethod,
        paymentHistoryId,
        resumedIdentityId,
        isFromMyPage,
      });

      // 3. 빌링키 발급 요청 파라미터 구성
      const params: BillingRequestParams = {
        finalPrice: verifyData.finalPrice,
        planName: verifyData.planName,
        paymentHistoryId: verifyData.paymentHistoryId,
        customer: {
          customerId: String(verifyData.memberId),
          fullName: verifyData.name,
          phoneNumber: verifyData.phoneNumber,
          email: verifyData.email,
        },
      };

      // 4. PG사 빌링키 발급 요청
      await requestBillingKey(paymentMethod, params, isFromMyPage);

      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : '결제 수단 등록 중 오류가 발생했습니다.';
      alert(message);
      return false;
    } finally {
      clearPaymentState();
    }
  };

  /**
   * 전체 결제/구독 플로우 시작
   */
  const startPaymentFlow = async ({
    paymentMethod,
    paymentHistoryId,
    billingKeyExists,
    planId,
  }: {
    paymentMethod: PaymentMethod;
    paymentHistoryId: number;
    billingKeyExists: boolean;
    planId: number;
  }) => {
    // 빌링키가 없으면 등록 프로세스 먼저 진행
    if (!billingKeyExists) {
      const isSuccess = await registerBillingMethod({ paymentMethod, paymentHistoryId, planId });
      if (!isSuccess) return;
    }

    // 최종 결제/플랜 적용 완료
    completePlan({ paymentHistoryId, paymentMethod });
  };

  return { startPaymentFlow, registerBillingMethod };
};
