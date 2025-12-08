import { ApiResponse, PaginationResult } from './api';

export interface RegisterCouponRequest {
  code: string;
}

export interface RegisterCouponResponse extends ApiResponse {}

export interface ApplyCouponRequest {
  couponHistoryId: number;
}

export interface Coupon {
  id: number;
  name: string;
  code: string;
  discountType: 'PERCENTAGE' | 'AMOUNT';
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount: number | null;
  expiresAt: string;
  usedAt: string | null;
  isUsed: boolean;
}

export interface CouponListResponse extends ApiResponse {
  result: PaginationResult<Coupon>;
}

export type CouponErrorCode =
  | 'MEMBER_NOT_FOUND_ERROR'
  | 'COUPON_NOT_FOUND'
  | 'COUPON_EXPIRED'
  | 'COUPON_ALREADY_USED'
  | 'COUPON_NOT_APPLICABLE';

export const COUPON_ERROR_MESSAGES: Record<CouponErrorCode, string> = {
  MEMBER_NOT_FOUND_ERROR: '사용자를 찾을 수 없습니다.',
  COUPON_NOT_FOUND: '발급받은 쿠폰이 없습니다.',
  COUPON_EXPIRED: '만료된 쿠폰입니다.',
  COUPON_ALREADY_USED: '이미 사용된 쿠폰입니다.',
  COUPON_NOT_APPLICABLE: '해당 상품에 적용할 수 없는 쿠폰입니다.',
};
