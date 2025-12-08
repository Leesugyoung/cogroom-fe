import { AxiosResponse } from 'axios';

import { END_POINTS } from '@/constants/api';
import { ApiResponse } from '@/types/api';
import {
  ApplyCouponRequest,
  ApplyCouponResponse,
  BillingKeyResponse,
  ChangePlanRequest,
  CompletePlanRequest,
  CouponsRequest,
  CouponsResponse,
  PlanInfoRequest,
  PlanInfoResponse,
  PlansResponse,
  VerifyPaymentRequest,
  VerifyPaymentResponse,
} from '@/types/payment';

import { axiosInstance } from './axios/axiosInstance';

/** 플랜 정보 조회 */
const getPlanInfo = async (params: PlanInfoRequest) => {
  const { data } = await axiosInstance.get<PlanInfoResponse>(END_POINTS.PAYMENTS.PLAN, { params });

  return data.result;
};

/** 플랜 정보 전체 조회 */
const getPlans = async () => {
  const { data } = await axiosInstance.get<PlansResponse>(END_POINTS.PAYMENTS.PLANS);

  return data.result;
};

/** 빌링키 조회 — 신규 결제자 / 플랜 업데이트 대상 확인용 */
const getBillingKey = async () => {
  const { data } = await axiosInstance.get<BillingKeyResponse>(END_POINTS.PAYMENTS.BILLING_KEY);

  return data.result;
};

/** 사용할 수 있는 쿠폰 목록 조회 */
const getCoupons = async ({ cursor }: CouponsRequest) => {
  const { data } = await axiosInstance.get<CouponsResponse>(END_POINTS.PAYMENTS.COUPONS, {
    params: { cursor },
  });

  return data.result;
};

/** 결제 요청 */
const completePlan = async ({ paymentHistoryId, paymentMethod }: CompletePlanRequest) => {
  const { data } = await axiosInstance.post<ApiResponse>(
    END_POINTS.PAYMENTS.COMPLETE_PLAN(paymentHistoryId, paymentMethod),
  );

  return data;
};

/** 플랜 변경 */
const changePlan = async ({ paymentHistoryId, applyNow }: ChangePlanRequest) => {
  const { data } = await axiosInstance.patch<ApiResponse>(END_POINTS.PAYMENTS.CHANGE_PLAN, {
    paymentHistoryId,
    applyNow,
  });

  return data;
};

/** 결제 인증 정보 조회 */
const verifyPayment = async ({ identityVerificationId, paymentHistoryId }: VerifyPaymentRequest) => {
  const { data } = await axiosInstance.post<VerifyPaymentRequest, AxiosResponse<VerifyPaymentResponse>>(
    END_POINTS.PAYMENTS.VERIFY,
    { identityVerificationId, paymentHistoryId },
  );

  return data.result;
};

/** 쿠폰 적용 */
const applyCoupon = async ({ paymentHistoryId, couponHistoryId }: ApplyCouponRequest) => {
  const urlWithQuery = `${END_POINTS.PAYMENTS.APPLY_COUPON(paymentHistoryId)}?couponHistoryId=${couponHistoryId}`;

  const { data } = await axiosInstance.post<ApplyCouponRequest, AxiosResponse<ApplyCouponResponse>>(urlWithQuery, {});

  return data.result;
};

export const paymentApi = {
  getPlanInfo,
  getPlans,
  getBillingKey,
  getCoupons,
  completePlan,
  changePlan,
  verifyPayment,
  applyCoupon,
};
