export const applyCouponSuccess = {
  code: 'SUCCESS',
  message: '쿠폰 적용에 성공했습니다.',
  result: {
    isPossible: true,
    couponId: 1,
    couponName: '월간 정기구독 1회 무료쿠폰',
    couponDiscount: 1002,
    finalPrice: 124,
    couponHistoryId: 1,
  },
};

export const applyCouponError = {
  code: 'EMPTY_FILED_ERROR',
  message: '쿠폰 적용에 실패했습니다.',
};
