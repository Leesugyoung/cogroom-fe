import { HTTP_STATUS_CODE } from '@/constants/api';
import { ApiResponse } from '@/types/api';

export const updateCouponSuccess: ApiResponse = {
  code: HTTP_STATUS_CODE.OK,
  message: '요청에 성공했습니다.',
};
