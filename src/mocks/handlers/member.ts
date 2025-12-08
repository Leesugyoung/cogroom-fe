import { http, HttpResponse } from 'msw';

import { END_POINTS, HTTP_STATUS_CODE } from '@/constants/api';
import type { CheckNicknameRequest, EditUserInfoRequest } from '@/types/member';

import { getCouponListSuccess } from '../data/coupon/getCouponListData';
import { registerCouponSuccess, registerCouponNotFound } from '../data/coupon/registerCouponData';
import { checkNicknameError, checkNicknameSuccess } from '../data/member/checkNicknameData';
import { deleteUserPostError, deleteUserPostSuccess } from '../data/member/deleteUserPostData';
import { editUserInfoError, editUserInfoSuccess } from '../data/member/editUserInfoData';
import { getPaymentMethodSuccess } from '../data/member/getPaymentMethodData';
import { getUserCommentListSuccess } from '../data/member/getUserCommentListData';
import { getUserDailySuccess } from '../data/member/getUserDailyData';
import { getUserDashboardSuccess } from '../data/member/getUserDashboardData';
import { getUserInfoSuccess } from '../data/member/getUserInfoData';
import { getUserLikeCommentListSuccess } from '../data/member/getUserLikeCommentListData';
import { getUserLikePostListSuccess } from '../data/member/getUserLikePostListData';
import { getUserPostListSuccess } from '../data/member/getUserPostListData';
import { getUserProfileError, getUserProfileSuccess } from '../data/member/getUserProfileData';
import { getUserSaveListSuccess } from '../data/member/getUserSaveData';
import { getUserSubscriptionMonthly } from '../data/member/getUserSubscriptionData';
import { getUserSummarySuccess } from '../data/member/getUserSummaryData';
import { withdrawSuccess } from '../data/member/withdrawData';
import { getPaymentDetailSuccess, getPaymentDetailPaymentRecordNotFound } from '../data/payment/getPaymentDetailData';
import { getPaymentHistorySuccess } from '../data/payment/getPaymentHistoryData';

export const memberHandlers = [
  // 사용자 요약 정보 조회
  http.get(END_POINTS.MEMBERS.SUMMARY, async () => {
    return new HttpResponse(JSON.stringify(getUserSummarySuccess), {
      status: HTTP_STATUS_CODE.OK,
    });

    // 로그아웃 상태 원할 시 주석 해제
    // return new HttpResponse(JSON.stringify(getUserSummaryError), {
    //     status: HTTP_STATUS_CODE.BAD_REQUEST,
    //   });
  }),

  // 사용자 대시보드 정보 조회
  http.get(END_POINTS.MEMBERS.DASHBOARD, async () => {
    return new HttpResponse(JSON.stringify(getUserDashboardSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 내 정보 조회
  http.get(END_POINTS.MEMBERS.ME, async () => {
    return new HttpResponse(JSON.stringify(getUserInfoSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 다른 사용자 프로필 조회
  http.get(END_POINTS.MEMBERS.PROFILE(':memberId'), async ({ params }) => {
    const { memberId } = params;
    if (!memberId) {
      return new HttpResponse(JSON.stringify(getUserProfileError), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }
    return new HttpResponse(JSON.stringify(getUserProfileSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 내 데일리 질문 및 답변 조회
  http.get(END_POINTS.MEMBERS.DAILY, async () => {
    return new HttpResponse(JSON.stringify(getUserDailySuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 내가 작성한 게시글 조회
  http.get(END_POINTS.MEMBERS.POSTS, async () => {
    return new HttpResponse(JSON.stringify(getUserPostListSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 내가 저장한 게시글 조회
  http.get(END_POINTS.MEMBERS.POSTS_SAVES, async () => {
    return new HttpResponse(JSON.stringify(getUserSaveListSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 내가 좋아요한 게시글 조회
  http.get(END_POINTS.MEMBERS.POSTS_LIKES, async () => {
    return new HttpResponse(JSON.stringify(getUserLikePostListSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 내가 작성한 댓글 조회
  http.get(END_POINTS.MEMBERS.COMMENTS, async () => {
    return new HttpResponse(JSON.stringify(getUserCommentListSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 내가 좋아요한 댓글 조회
  http.get(END_POINTS.MEMBERS.COMMENTS_LIKES, async () => {
    return new HttpResponse(JSON.stringify(getUserLikeCommentListSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 내가 작성한 게시글 일괄 삭제
  http.delete(END_POINTS.MEMBERS.POSTS, async ({ request }) => {
    const body = (await request.json()) as { postList?: number[] } | undefined;

    if (!body?.postList || body.postList.length === 0) {
      return new HttpResponse(JSON.stringify(deleteUserPostError), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    return new HttpResponse(JSON.stringify(deleteUserPostSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 사용자 정보 수정
  http.patch(END_POINTS.MEMBERS.ME, async ({ request }) => {
    const body = (await request.json()) as EditUserInfoRequest;

    if (!body.email || !body.nickname) {
      return new HttpResponse(JSON.stringify(editUserInfoError), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    return new HttpResponse(JSON.stringify(editUserInfoSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 닉네임 중복 검사
  http.post(END_POINTS.MEMBERS.NICKNAME_CHECK, async ({ request }) => {
    const body = (await request.json()) as CheckNicknameRequest;

    if (!body.nickname) {
      return new HttpResponse(JSON.stringify(checkNicknameError), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    return new HttpResponse(JSON.stringify(checkNicknameSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 구독 정보 조회
  http.get(END_POINTS.MEMBERS.SUBSCRIPTION, async () => {
    return new HttpResponse(JSON.stringify(getUserSubscriptionMonthly), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 회원 탈퇴
  http.delete(END_POINTS.MEMBERS.WITHDRAW, async () => {
    return new HttpResponse(JSON.stringify(withdrawSuccess), {
      status: HTTP_STATUS_CODE.OK,
      headers: new Headers([
        ['Set-Cookie', 'accessToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax'],
        ['Set-Cookie', 'refreshToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax'],
        ['Content-Type', 'application/json'],
      ]),
    });
  }),

  // 결제 내역 조회
  http.get(END_POINTS.MEMBERS.PAYMENT_HISTORY, async () => {
    return new HttpResponse(JSON.stringify(getPaymentHistorySuccess), {});
  }),

  // 결제 상세 정보 조회
  http.get(END_POINTS.MEMBERS.PAYMENT_DETAIL, async ({ request }) => {
    const url = new URL(request.url);
    const paymentHistoryId = url.searchParams.get('paymentHistoryId');

    if (!paymentHistoryId) {
      return new HttpResponse(JSON.stringify(getPaymentDetailPaymentRecordNotFound), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    return new HttpResponse(JSON.stringify(getPaymentDetailSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 쿠폰 목록 조회
  http.get(END_POINTS.MEMBERS.COUPON, async () => {
    return new HttpResponse(JSON.stringify(getCouponListSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 쿠폰 등록
  http.post(END_POINTS.MEMBERS.COUPON, async ({ request }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return new HttpResponse(JSON.stringify(registerCouponNotFound), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    return new HttpResponse(JSON.stringify(registerCouponSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 결제 수단 조회
  http.get(END_POINTS.MEMBERS.PAYMENT_METHOD, async () => {
    return new HttpResponse(JSON.stringify(getPaymentMethodSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 결제 수단 삭제
  http.delete(END_POINTS.MEMBERS.PAYMENT_METHOD, async ({ request }) => {
    const url = new URL(request.url);

    return new HttpResponse(null, {
      status: HTTP_STATUS_CODE.OK,
    });
  }),
];
