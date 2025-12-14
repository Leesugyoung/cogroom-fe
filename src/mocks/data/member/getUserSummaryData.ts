import { MOCK_IMAGE } from '@/mocks/constants/mockAssets';

export const getUserSummarySuccess = {
  code: 'SUCCESS',
  message: '사용자 정보 조회(Summary)에 성공했습니다.',
  result: {
    nickname: '코그룸',
    imageUrl: MOCK_IMAGE.FEMALE_PROFILE,
    memberRole: 'ADMIN',
    isTrialUsed: true,
    planId: 2,
  },
};

export const getUserSummaryError = {
  code: 'REFRESH_TOKEN_EMPTY_ERROR',
  message: '사용자 정보 조회(Summary)에 실패했습니다.',
};
