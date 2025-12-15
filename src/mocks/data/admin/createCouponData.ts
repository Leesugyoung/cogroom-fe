import { HTTP_STATUS_CODE } from '@/constants/api';
import { ApiResponse } from '@/types/api';

export const createCouponSuccess: ApiResponse = {
  code: HTTP_STATUS_CODE.OK,
  message: '요청에 성공했습니다.',
};

export const createCouponCodeDuplicateError: ApiResponse = {
  code: HTTP_STATUS_CODE.BAD_REQUEST,
  message: '이미 존재하는 쿠폰 코드입니다.',
};

export const createCouponInvalidDiscountValueError: ApiResponse = {
  code: HTTP_STATUS_CODE.BAD_REQUEST,
  message: '할인 값이 유효하지 않습니다.',
};

export const createCouponInvalidDateRangeError: ApiResponse = {
  code: HTTP_STATUS_CODE.BAD_REQUEST,
  message: '사용 기간이 유효하지 않습니다.',
};

export const createCouponInvalidTargetPlanError: ApiResponse = {
  code: HTTP_STATUS_CODE.BAD_REQUEST,
  message: '선택한 사용범위가 유효하지 않습니다.',
};
