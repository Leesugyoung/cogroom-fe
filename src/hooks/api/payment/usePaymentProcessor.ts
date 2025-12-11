import { useVerifyPaymentMutation } from '@/hooks/api/payment/useVerifyPayment';
import { clearPaymentState, savePaymentState } from '@/stores/paymentStorage';
import { PaymentMethod, VerifyPaymentData } from '@/types/payment';
import { requestIdentityVerification, requestBillingKey, BillingRequestParams } from '@/utils/portone';

import { useCompletePlanMutation } from './useCompletePlan';

/**
 * 결제 플로우를 처리하는 커스텀 훅
 */
export const usePaymentProcessor = () => {
  const { completePlan } = useCompletePlanMutation();
  const { verifyPayment } = useVerifyPaymentMutation();

  /**
   * 서버 검증 후 빌링키 생성 로직 (verifyPayment 성공 후 실행)
   */
  const handleBillingKeyCreation = async (data: VerifyPaymentData, paymentMethod: PaymentMethod) => {
    const { finalPrice, planName, email, phoneNumber, name, paymentHistoryId, memberId } = data;

    const params: BillingRequestParams = {
      finalPrice,
      planName,
      paymentHistoryId,
      customer: { customerId: String(memberId), fullName: name, phoneNumber, email },
    };

    const billingKeyRes = await requestBillingKey(paymentMethod, params);

    if (!billingKeyRes || (billingKeyRes as { code?: string }).code) {
      alert('결제 정보를 등록하는 데 실패하였습니다.');
      return;
    }

    completePlan({ paymentHistoryId, paymentMethod });
  };

  /**
   * 신규 결제 흐름 (서버 검증 및 빌링키 생성) 로직
   * 본인 인증 후 재개되는 흐름에 사용됩니다.
   */
  const handleNewPayment = async (
    paymentHistoryId: number,
    paymentMethod: PaymentMethod,
    identityVerificationId?: string,
  ) => {
    try {
      const verifyData = await verifyPayment({
        identityVerificationId,
        paymentHistoryId,
      });

      await handleBillingKeyCreation(verifyData, paymentMethod);
      return true;
    } catch (error) {
      alert('결제에 실패하였습니다');
      return false;
    } finally {
      // 결제 성공/실패와 관계없이 임시 상태 정리
      clearPaymentState();
    }
  };

  /**
   * 결제 흐름 시작 (빌링키 유무, 구독 상태에 따라 분기)
   */
  const startPaymentFlow = async (
    paymentHistoryId: number,
    billingKeyExists: boolean,
    paymentMethod: PaymentMethod,
    isSubscribed: boolean,
    planId: number,
  ) => {
    // 1. 플랜 변경 (구독 중, 빌링키 있음)
    if (isSubscribed && billingKeyExists) {
      return;
    }

    // 2. 빌링키 재사용 (구독 중 아님, 빌링키 있음)
    if (!isSubscribed && billingKeyExists) {
      completePlan({ paymentHistoryId, paymentMethod });
      return;
    }

    // 3. 신규 빌링키 생성 플로우 (빌링키 없음, 구독 중 아님)
    if (!billingKeyExists && !isSubscribed) {
      // 본인 인증이 필요한 경우 (카드, 휴대폰)
      if (['CARD'].includes(paymentMethod)) {
        // 상태를 저장하고 본인 인증 리다이렉트 요청
        savePaymentState({ paymentHistoryId, paymentMethod, planId });

        const identityRes = await requestIdentityVerification();

        if (!identityRes) {
          clearPaymentState();
          alert('본인인증에 실패하였습니다');
          return;
        }

        await handleNewPayment(paymentHistoryId, paymentMethod, identityRes.identityVerificationId);
        return;
      } else {
        // 본인 인증이 필요 없는 경우, 바로 신규 결제 흐름 시작
        await handleNewPayment(paymentHistoryId, paymentMethod);
      }
    }
  };

  return { startPaymentFlow, handleNewPayment };
};
