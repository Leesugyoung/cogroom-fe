import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

import { loadPaymentState } from '@/stores/paymentStorage';
import { usePaymentStore } from '@/stores/usePaymentStore';

import { usePaymentProcessor } from './usePaymentProcessor';

/**
 * 본인 인증 리다이렉트 후 결제/등록 플로우를 재개하는 로직을 담당하는 훅
 */
export const usePaymentResume = ({ isFromMyPage = false }: { isFromMyPage?: boolean }) => {
  const searchParams = useSearchParams();
  const { registerBillingMethod } = usePaymentProcessor();
  const { isResuming, setIsResuming } = usePaymentStore();

  /**
   * 포트원 리다이렉트 관련 쿼리 파라미터를 URL에서 제거하여 UI를 깔끔하게 유지합니다.
   */
  const clearUrlParams = useCallback(() => {
    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);
    const paramsToRemove = [
      'code',
      'message',
      'identityVerificationId',
      'identityVerificationTxId',
      'billingKey',
      'pgCode',
      'pgMessage',
      'transactionType',
    ];

    paramsToRemove.forEach((param) => url.searchParams.delete(param));
    window.history.replaceState(null, '', url.toString());
  }, []);

  useEffect(() => {
    // URL 쿼리에서 필수 데이터 확인
    const identityVerificationId = searchParams.get('identityVerificationId');
    const billingKey = searchParams.get('billingKey');
    const errorCode = searchParams.get('code');
    const errorPgCode = searchParams.get('pgCode');
    const pgMessage = searchParams.get('pgMessage');

    if (!identityVerificationId && !billingKey) return;

    if (identityVerificationId && (errorCode || errorPgCode || pgMessage)) {
      clearUrlParams();
      alert('본인인증에 실패했습니다. 다시 시도해주세요.');
      return;
    }

    if (billingKey && (errorCode || errorPgCode || pgMessage)) {
      clearUrlParams();
      const errorDetail = pgMessage ? decodeURIComponent(pgMessage) : '결제 과정에서 문제가 발생했습니다.';
      alert(`결제 오류: ${errorDetail}`);
      return;
    }

    // 즉시 URL을 정리하여 새로고침 시 중복 호출 방지
    clearUrlParams();

    // 본인인증 성공 후 ID를 가지고 돌아온 경우
    if (identityVerificationId) {
      // Session Storage에서 이전 상태 로드
      const storedState = loadPaymentState();

      if (storedState) {
        /**
         * 결제 재개 로직 실행
         */
        const resumePayment = async () => {
          setIsResuming(true);
          try {
            // registerBillingMethod의 4번째 인자로 identityVerificationId를 주입
            // -> validatePaymentMethod 내부에서 본인인증 창을 다시 띄우지 않고 바로 서버 검증 진행
            await registerBillingMethod({
              paymentMethod: storedState.paymentMethod,
              paymentHistoryId: storedState.paymentHistoryId,
              planId: storedState.planId,
              resumedIdentityId: identityVerificationId,
              isFromMyPage,
            });
          } catch (error) {
          } finally {
            setIsResuming(false);
          }
        };

        resumePayment();
      } else {
        // 본인인증은 성공했으나 로컬 세션 데이터가 유실된 경우
        alert('이전 결제 정보를 찾을 수 없습니다. 다시 시도해주세요.');
      }
    }
  }, []);

  return { isResuming };
};
