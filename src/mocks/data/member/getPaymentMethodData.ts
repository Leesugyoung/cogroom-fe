export const getPaymentMethodSuccess = {
  isSuccess: true,
  code: 'SUCCESS',
  message: '요청에 성공했습니다.',
  result: {
    data: [
      {
        paymentMethodId: 1,
        cardName: '신한',
        cardNum: 1234,
        type: 'CARD',
        isPresent: true,
      },
      {
        paymentMethodId: 2,
        cardName: '농협',
        cardNum: 1234,
        type: 'CARD',
        isPresent: false,
      },
      {
        paymentMethodId: 3,
        cardName: '카카오뱅크',
        cardNum: null,
        type: 'KAKAO_PAY',
        isPresent: false,
      },
    ],
  },
};

export const getPaymentMethodError = {
  isSuccess: false,
  code: 'PAYMENT_METHOD_NOT_FOUND',
  message: '등록된 결제 수단을 찾을 수 없습니다.',
};
