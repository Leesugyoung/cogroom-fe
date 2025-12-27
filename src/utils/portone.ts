/* eslint-disable @typescript-eslint/no-explicit-any */

import PortOne from '@portone/browser-sdk/v2';

import { PORTONE } from '@/constants/api';
import { PaymentMethod, RegisteredPaymentMethod } from '@/types/payment';

export type IdentityResponse = {
  identityVerificationId: string;
} | null;

export type BillingCustomer = {
  customerId: string;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
};

export type BillingRequestParams = {
  finalPrice: number;
  planName: string;
  paymentHistoryId?: number;
  customer?: BillingCustomer;
};

const ALERT_PAYMENT_ERROR = '결제 시스템 설정에 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';

/**
 * PortOne 응답의 에러 여부를 체크하는 공통 로직
 */
const handlePortOneResponse = <T>(response: any): T => {
  // 1. 응답이 없거나 code가 존재하면 실패로 간주
  if (!response || response.code) {
    const errorMessage = response?.message || '결제 처리 중 오류가 발생했습니다.';
    throw new Error(errorMessage);
  }
  return response as T;
};

/**
 * 본인 인증 요청
 */
export const requestIdentityVerification = async (isFromMyPage: boolean = false): Promise<IdentityResponse> => {
  const redirectUrl = isFromMyPage ? PORTONE.MYPAGE_IDENTITY_REDIRECT_URL : PORTONE.IDENTITY_REDIRECT_URL;

  if (!PORTONE.STORE_ID || !PORTONE.CHANNEL_KEYS.IDENTITY || !redirectUrl) {
    throw new Error(ALERT_PAYMENT_ERROR);
  }

  const response = await PortOne.requestIdentityVerification({
    storeId: PORTONE.STORE_ID,
    identityVerificationId: `identity-verification-${crypto.randomUUID()}`,
    channelKey: PORTONE.CHANNEL_KEYS.IDENTITY,
    redirectUrl,
  });

  return handlePortOneResponse<IdentityResponse>(response);
};

/**
 * 이니시스 카드 정기결제 빌링키 요청 유틸 함수
 */
export const requestInicisBillingKey = async (opts: BillingRequestParams, isFromMyPage: boolean = false) => {
  if (!PORTONE.STORE_ID || !PORTONE.CHANNEL_KEYS.INICIS) {
    throw new Error(ALERT_PAYMENT_ERROR); // alert 대신 에러를 던져 handlePortOneResponse와 흐름 통일
  }

  const { finalPrice, paymentHistoryId, planName, customer } = opts;
  // 마이페이지 여부에 따른 리다이렉트 URL 결정
  const redirectUrl = isFromMyPage ? PORTONE.MYPAGE_IDENTITY_REDIRECT_URL : PORTONE.PAYMENT_REDIRECT_URL;

  return await PortOne.requestIssueBillingKey({
    storeId: PORTONE.STORE_ID,
    currency: finalPrice ? 'KRW' : undefined,
    redirectUrl,
    offerPeriod: { interval: '1m' },
    displayAmount: finalPrice || undefined,
    billingKeyMethod: 'CARD',
    channelKey: PORTONE.CHANNEL_KEYS.INICIS,
    issueId: paymentHistoryId ? String(paymentHistoryId) : `${crypto.randomUUID()}`,
    issueName: planName || '카드 등록',
    customer,
  });
};

/**
 * 카카오페이 정기결제 빌링키 요청 유틸 함수
 */
export const requestKakaoBillingKey = async (opts: BillingRequestParams, isFromMyPage: boolean = false) => {
  if (!PORTONE.STORE_ID || !PORTONE.CHANNEL_KEYS.KAKAO) {
    throw new Error(ALERT_PAYMENT_ERROR);
  }

  const { finalPrice, paymentHistoryId, planName, customer } = opts;
  const redirectUrl = isFromMyPage ? PORTONE.MYPAGE_IDENTITY_REDIRECT_URL : PORTONE.PAYMENT_REDIRECT_URL;

  return await PortOne.requestIssueBillingKey({
    storeId: PORTONE.STORE_ID,
    currency: finalPrice ? 'KRW' : undefined,
    redirectUrl,
    displayAmount: finalPrice || undefined,
    billingKeyMethod: 'EASY_PAY',
    channelKey: PORTONE.CHANNEL_KEYS.KAKAO,
    issueId: paymentHistoryId ? String(paymentHistoryId) : `${crypto.randomUUID()}`,
    issueName: planName || '카카오페이 등록',
    customer,
  });
};

/**
 * 빌링키 통합 요청 함수
 */
export const requestBillingKey = async (
  method: PaymentMethod,
  params: BillingRequestParams,
  isFromMyPage: boolean = false,
) => {
  let response;

  switch (method) {
    case 'CARD':
      response = await requestInicisBillingKey(params, isFromMyPage);
      break;
    case 'KAKAO_PAY':
      response = await requestKakaoBillingKey(params, isFromMyPage);
      break;
    default:
      throw new Error(`지원하지 않는 결제 수단입니다: ${method}`);
  }

  return handlePortOneResponse(response);
};

/**
 * @typedef {Object} PaymentStatus
 * @property {boolean} hasCARD - CARD 타입 결제 수단 등록 여부
 * @property {boolean} hasKAKAOPAY - KAKAO_PAY 타입 결제 수단 등록 여부
 */

/**
 * 등록된 결제 수단 목록에서 CARD 또는 KAKAO_PAY 타입의 등록 여부를 확인합니다.
 *
 * @param {RegisteredPaymentMethod[]} paymentMethods - 등록된 결제 수단 객체 배열
 * @returns {PaymentStatus} - CARD 및 KAKAO_PAY의 등록 상태 객체
 */
export const checkPaymentMethods = (paymentMethods: RegisteredPaymentMethod[]) => {
  const result = {
    hasCARD: false,
    hasKAKAOPAY: false,
  };

  if (!Array.isArray(paymentMethods) || paymentMethods === null) {
    return result;
  }

  for (const method of paymentMethods) {
    if (result.hasCARD && result.hasKAKAOPAY) {
      break;
    }

    if (method.isPresent === true) {
      switch (method.paymentType) {
        case 'CARD':
          result.hasCARD = true;
          break;
        case 'KAKAO_PAY':
          result.hasKAKAOPAY = true;
          break;
      }
    }
  }

  return result;
};
