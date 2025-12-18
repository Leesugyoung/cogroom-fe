import { ApiResponse } from './api';

export interface Plan {
  planId: number;
  name: string;
  basePrice: number;
  baseDiscountAmount: number;
  baseDiscountRate: number;
  finalPrice: number;
  monthlyPrice: number;
  billingCycle: 'MONTHLY' | 'YEARLY';
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface PlanInfo extends Plan {
  paymentHistoryId: number;
  expiresAt: string;
  isSubscribed: boolean;
}

export interface PlanInfoRequest {
  planId: number;
  isTrial: boolean;
}

export interface PlanInfoResponse extends ApiResponse {
  result: PlanInfo;
}

export interface PlansResponse extends ApiResponse {
  result: Plan[];
}

export type PaymentMethod = 'CARD' | 'KAKAO_PAY';

export interface RegisteredPaymentMethod {
  paymentMethodId: number;
  isPresent: boolean;
  cardCompanyName: string;
  cardMaskedNumber: string;
  paymentType: PaymentMethod;
}

export interface BillingKeyResponse extends ApiResponse {
  result: {
    isExist: boolean;
    paymentMethods: RegisteredPaymentMethod[];
  };
}

type DiscountType = 'PERCENT' | 'AMOUNT';

export interface CouponInfo {
  couponId: number;
  couponName: string;
  couponType: string;
  discountType: DiscountType;
  discountValue: number;
  couponHistoryId: number;
  couponCode: number;
  endDate: string;
  status: string;
}

export interface AppliedCouponRequest {
  paymentHistoryId?: number;
}

export interface AppliedCouponResponse extends ApiResponse {
  result: {
    couponDiscount: number;
    finalPrice: number;
    couponInfo: {
      couponId: number;
      couponName: string;
      couponHistoryId: number;
      couponType: string;
      discountType: DiscountType;
      discountValue: number;
      couponCode: number;
      endDate: string;
      status: string;
    };
  };
}

export interface CouponsRequest {
  cursor: number | null;
}

export interface CouponsResponse extends ApiResponse {
  result: {
    data: CouponInfo[];
    nextCursor: number | null;
    last: boolean;
    totalElements?: number;
  };
}

export interface CompletePlanRequest {
  paymentHistoryId: number;
  paymentMethod: PaymentMethod;
}

export interface ChangePlanRequest {
  paymentHistoryId: number;
  applyNow: boolean;
}

export interface VerifyPaymentRequest {
  identityVerificationId?: string;
  paymentHistoryId?: number;
}

export interface VerifyPaymentData {
  email?: string;
  phoneNumber?: string;
  name?: string;
  paymentHistoryId: number;
  finalPrice: number;
  planName: string;
  memberId: number;
}

export interface VerifyPaymentResponse extends ApiResponse {
  result: VerifyPaymentData;
}

export interface ApplyCouponRequest {
  paymentHistoryId: string;
  couponHistoryId: number | null;
}

export interface PaymentHistory {
  id: number;
  plan: string;
  isPaid: boolean;
  amount: number;
  paymentDate: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED' | 'CANCELED';
}

export interface PaymentHistoryResponse extends ApiResponse {
  result: {
    payments: PaymentHistory[];
    totalCount: number;
  };
}

export interface PaymentHistoryItem {
  paymentHistoryId: number;
  amount: number;
  status: string;
  planId: number;
  planName: string;
  paymentDate: string;
}

export interface PaymentHistoryApiResponse extends ApiResponse {
  result: {
    data: PaymentHistoryItem[];
    nextCursor: number;
    last: boolean;
    totalElements: number;
  };
}

export interface PaymentHistoryParams {
  cursor?: number;
  sort?: string;
  size?: number;
}

export type PaymentStatus = 'PAID' | 'FAILED' | 'PENDING';

export interface PaymentDetailData {
  planName: string;
  paymentHistoryId: number;
  status: PaymentStatus;
  memberId: number;
  email: string;
  paidAt: string;
  method: PaymentMethod;
  nextPaymentDate?: string;
  basePrice: number;
  baseDiscountAmount: number;
  couponName?: string;
  couponDiscountAmount?: number;
  amount: number;
  cardCompanyName: string;
}

export interface PaymentDetailResponse extends ApiResponse {
  result: PaymentDetailData;
}

export interface PaymentDetailParams {
  paymentHistoryId: number;
}
