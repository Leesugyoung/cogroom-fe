import { http, HttpResponse } from 'msw';

import { END_POINTS, HTTP_STATUS_CODE } from '@/constants/api';
import type { ApplyCouponRequest, VerifyPaymentRequest } from '@/types/payment';

import { applyCouponError, applyCouponSuccess } from '../data/payment/applyCouponData';
import { changePlanSuccess } from '../data/payment/changePlanData';
import { getBillingKeySuccess } from '../data/payment/getBillingKeyData';
import { getCouponsSuccess } from '../data/payment/getCouponsData';
import { getPlanInfoError, getPlanInfoSuccess } from '../data/payment/getPlanInfoData';
import { getPlansSuccess } from '../data/payment/getPlansData';
import { verifyPaymentError, verifyPaymentSuccess } from '../data/payment/verifyPaymentData';

export const paymentHandlers = [
  // 플랜 정보 조회
  http.get(END_POINTS.PAYMENTS.PLAN, async ({ request }) => {
    const url = new URL(request.url);
    const planId = url.searchParams.get('planId');

    if (!planId) {
      return new HttpResponse(JSON.stringify(getPlanInfoError), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    return new HttpResponse(JSON.stringify(getPlanInfoSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 플랜 전체 목록 조회
  http.get(END_POINTS.PAYMENTS.PLANS, async () => {
    return new HttpResponse(JSON.stringify(getPlansSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 빌링키 조회
  http.get(END_POINTS.PAYMENTS.BILLING_KEY, async () => {
    return new HttpResponse(JSON.stringify(getBillingKeySuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 사용할 수 있는 쿠폰 목록 조회
  http.get(END_POINTS.PAYMENTS.COUPONS, async () => {
    return new HttpResponse(JSON.stringify(getCouponsSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 플랜 변경
  http.patch(END_POINTS.PAYMENTS.CHANGE_PLAN, async () => {
    return new HttpResponse(JSON.stringify(changePlanSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 결제 인증 정보 조회
  http.post(END_POINTS.PAYMENTS.VERIFY, async ({ request }) => {
    const body = (await request.json()) as VerifyPaymentRequest;

    // 마이페이지에서는 paymentHistoryId가 없음
    if (!body.identityVerificationId) {
      return new HttpResponse(JSON.stringify(verifyPaymentError), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    return new HttpResponse(JSON.stringify(verifyPaymentSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 쿠폰 적용
  http.post(END_POINTS.PAYMENTS.APPLY_COUPON(':paymentHistoryId'), async ({ request, params }) => {
    const { paymentHistoryId } = params;
    const url = new URL(request.url);
    const couponHistoryId = url.searchParams.get('couponHistoryId');

    if (!paymentHistoryId || !couponHistoryId) {
      return new HttpResponse(JSON.stringify(applyCouponError), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    return new HttpResponse(JSON.stringify(applyCouponSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),
];
