import { AxiosResponse } from 'axios';

import { END_POINTS } from '@/constants/api';
import { ApiResponse, AxiosMeta } from '@/types/api';
import { ApplyCouponRequest, GetCouponListParams, RegisterCouponResponse } from '@/types/coupon';
import {
  CheckNicknameRequest,
  CheckNicknameResponse,
  EditUserInfoRequest,
  UserDailyResponse,
  UserDashboardResponse,
  UserInfoResponse,
  UserCommunityRequest,
  UserSummaryResponse,
  WithdrawRequest,
  UserCommentListResponse,
  UserPostListResponse,
  UserProfileResponse,
  UserSubscriptionResponse,
  CancelSubscriptionRequest,
  PaymentMethodResponse,
  DeletePaymentMethodRequest,
  ChangeDefaultPaymentMethodRequest,
} from '@/types/member';
import {
  PaymentHistoryApiResponse,
  PaymentHistoryParams,
  PaymentDetailResponse,
  PaymentDetailParams,
} from '@/types/payment';

import { axiosInstance } from './axios/axiosInstance';

/** 사용자 요약 정보 조회 (닉네임, 프로필 이미지 등) */
const getUserSummary = async (meta?: AxiosMeta) => {
  const { data } = await axiosInstance.get<UserSummaryResponse>(END_POINTS.MEMBERS.SUMMARY, { meta });
  return data.result;
};

/** 사용자 대시보드 정보 조회 (마이페이지) */
const getUserDashboard = async () => {
  const { data } = await axiosInstance.get<UserDashboardResponse>(END_POINTS.MEMBERS.DASHBOARD);
  return data.result;
};

/** 내 정보 조회 */
const getUserInfo = async () => {
  const { data } = await axiosInstance.get<UserInfoResponse>(END_POINTS.MEMBERS.ME);
  return data.result;
};

/** 다른 사용자 프로필 조회 */
const getUserProfile = async (memberId: string) => {
  const { data } = await axiosInstance.get<UserProfileResponse>(END_POINTS.MEMBERS.PROFILE(memberId));
  return data.result;
};

/** 내 데일리 질문 및 답변 조회 */
const getUserDaily = async () => {
  const { data } = await axiosInstance.get<UserDailyResponse>(END_POINTS.MEMBERS.DAILY);
  return data.result;
};

/** 내가 작성한 게시글 조회 */
const getUserPost = async (params: UserCommunityRequest) => {
  const { data } = await axiosInstance.get<UserPostListResponse>(END_POINTS.MEMBERS.POSTS, { params });
  return data.result;
};

/** 내가 저장한 게시글 조회 */
const getUserSavePost = async (params: UserCommunityRequest) => {
  const { data } = await axiosInstance.get<UserPostListResponse>(END_POINTS.MEMBERS.POSTS_SAVES, { params });
  return data.result;
};

/** 내가 좋아요한 게시글 조회 */
const getUserLikePost = async (params: UserCommunityRequest) => {
  const { data } = await axiosInstance.get<UserPostListResponse>(END_POINTS.MEMBERS.POSTS_LIKES, { params });
  return data.result;
};

/** 내가 작성한 댓글 조회 */
const getUserCommentList = async (params: UserCommunityRequest) => {
  const { data } = await axiosInstance.get<UserCommentListResponse>(END_POINTS.MEMBERS.COMMENTS, { params });
  return data.result;
};

/** 내가 좋아요한 댓글 조회 */
const getUserLikeComment = async (params: UserCommunityRequest) => {
  const { data } = await axiosInstance.get<UserCommentListResponse>(END_POINTS.MEMBERS.COMMENTS_LIKES, { params });
  return data.result;
};

/** 내가 작성한 게시글 일괄 삭제 */
const deleteUserPost = async (postList: number[]) => {
  await axiosInstance.delete(END_POINTS.MEMBERS.POSTS, { data: { postList } });
};

/** 사용자 정보 수정 */
const editUserInfo = async ({ email, nickname, imageUrl, phoneNumber, description }: EditUserInfoRequest) => {
  const { data } = await axiosInstance.patch<EditUserInfoRequest, AxiosResponse<ApiResponse>>(END_POINTS.MEMBERS.ME, {
    email,
    nickname,
    imageUrl,
    phoneNumber,
    description,
  });
  return data;
};

/** 닉네임 중복 검사 */
const checkNickname = async ({ nickname }: CheckNicknameRequest) => {
  const { data } = await axiosInstance.post<CheckNicknameRequest, AxiosResponse<CheckNicknameResponse>>(
    END_POINTS.MEMBERS.NICKNAME_CHECK,
    { nickname },
  );
  return data.result;
};

/** 회원 탈퇴 */
const withdraw = async ({ reason }: WithdrawRequest) => {
  const { data } = await axiosInstance.delete<WithdrawRequest, AxiosResponse<ApiResponse>>(
    END_POINTS.MEMBERS.WITHDRAW,
    { data: { reason } },
  );
  return data;
};

/** 구독 정보 조회 */
const getUserSubscription = async () => {
  const { data } = await axiosInstance.get<UserSubscriptionResponse>(END_POINTS.MEMBERS.SUBSCRIPTION);
  return data.result;
};

/** 쿠폰 목록 조회 */
const getCouponList = async (params?: GetCouponListParams) => {
  const { data } = await axiosInstance.get(END_POINTS.PAYMENTS.COUPONS, { params });
  return data.result;
};

/** 쿠폰 등록 */
const registerCoupon = async (code: string) => {
  const { data } = await axiosInstance.post<RegisterCouponResponse>(END_POINTS.MEMBERS.COUPON, { code });
  return data;
};

/** 정기결제에 쿠폰 적용  */
const applyCoupon = async ({ couponHistoryId }: ApplyCouponRequest) => {
  const { data } = await axiosInstance.post<ApiResponse>(END_POINTS.MEMBERS.APPLY_COUPON, null, {
    params: { couponHistoryId },
  });

  return data;
};

/** 결제 내역 조회 */
const getPaymentHistory = async (params?: PaymentHistoryParams) => {
  const { data } = await axiosInstance.get<PaymentHistoryApiResponse>(END_POINTS.MEMBERS.PAYMENT_HISTORY, { params });
  return data.result;
};

/** 결제 상세 정보 조회 */
const getPaymentDetail = async (params: PaymentDetailParams) => {
  const { data } = await axiosInstance.get<PaymentDetailResponse>(END_POINTS.MEMBERS.PAYMENT_DETAIL, { params });
  return data.result;
};

/** 구독 취소 */
const cancelSubscription = async ({ reason }: CancelSubscriptionRequest) => {
  await axiosInstance.delete<CancelSubscriptionRequest, AxiosResponse<ApiResponse>>(END_POINTS.MEMBERS.SUBSCRIPTION, {
    data: { reason },
  });
};

/** 결제 수단 조회 */
const getPaymentMethod = async () => {
  const { data } = await axiosInstance.get<PaymentMethodResponse>(END_POINTS.MEMBERS.PAYMENT_METHOD);
  return data.result;
};

/** 결제 수단 삭제 */
const deletePaymentMethod = async ({ paymentMethodId }: DeletePaymentMethodRequest) => {
  await axiosInstance.delete<DeletePaymentMethodRequest, AxiosResponse<ApiResponse>>(
    END_POINTS.MEMBERS.PAYMENT_METHOD,
    {
      params: { paymentMethodId },
    },
  );
};

/** 대표 결제 수단 변경 */
const changeDefaultPaymentMethod = async ({ paymentMethodId }: ChangeDefaultPaymentMethodRequest) => {
  await axiosInstance.patch<ChangeDefaultPaymentMethodRequest, AxiosResponse<ApiResponse>>(
    END_POINTS.MEMBERS.PAYMENT_METHOD,
    null,
    {
      params: { paymentMethodId },
    },
  );
};

export const memberApi = {
  getUserSummary,
  getUserDashboard,
  getUserInfo,
  getUserProfile,
  getUserDaily,
  getUserPost,
  getUserSavePost,
  getUserLikePost,
  getUserCommentList,
  getUserLikeComment,
  deleteUserPost,
  editUserInfo,
  checkNickname,
  withdraw,
  getUserSubscription,
  getCouponList,
  registerCoupon,
  applyCoupon,
  getPaymentHistory,
  getPaymentDetail,
  cancelSubscription,
  getPaymentMethod,
  deletePaymentMethod,
  changeDefaultPaymentMethod,
};
