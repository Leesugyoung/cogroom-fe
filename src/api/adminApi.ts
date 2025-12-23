import { AxiosResponse } from 'axios';

import { END_POINTS } from '@/constants/api';
import {
  CreateDailyQuestionsRequest,
  DailyQuestionsRequest,
  DeleteMemberRequest,
  MemberListRequest,
  MemberListResponse,
  MemberDailyQuestionsResponse,
  DailyQuestionsResponse,
  ChangeMemberRoleRequest,
  AdminPostListRequest,
  AdminPostListResponse,
  AdminCommentListRequest,
  AdminCommentListResponse,
  CouponListRequest,
  CouponListResponse,
  AdminPaymentHistoryRequest,
  AdminPaymentHistoryResponse,
  CreateCouponRequest,
  UpdateCouponRequest,
  CouponHistoryRequest,
  CouponHistoryResponse,
} from '@/types/admin';
import { ApiResponse } from '@/types/api';

import { axiosInstance } from './axios/axiosInstance';

/** 회원 목록 조회 */
const getMemberList = async (params: MemberListRequest) => {
  const { data } = await axiosInstance.get<MemberListResponse>(END_POINTS.ADMIN.MEMBERS.ROOT, { params });
  return data.result;
};

/** 특정 회원의 데일리 질문/답변 조회 */
const getMemberDailyQuestions = async ({ memberId, params }: { memberId: string; params: DailyQuestionsRequest }) => {
  const { data } = await axiosInstance.get<MemberDailyQuestionsResponse>(END_POINTS.ADMIN.MEMBERS.DAILY(memberId), {
    params,
  });
  return data.result;
};

/** 회원 권한 변경 */
const changeMemberRole = async ({ memberId, role }: ChangeMemberRoleRequest) => {
  const { data } = await axiosInstance.patch<ApiResponse>(
    END_POINTS.ADMIN.MEMBERS.CHANGE_ROLE(memberId),
    {},
    { params: { role } },
  );
  return data;
};

/** 회원 삭제 */
const deleteMember = async ({ memberIdList }: DeleteMemberRequest) => {
  const { data } = await axiosInstance.delete<DeleteMemberRequest, AxiosResponse<ApiResponse>>(
    END_POINTS.ADMIN.MEMBERS.ROOT,
    { data: { memberIdList } },
  );
  return data;
};

/** 데일리 질문 목록 조회 */
const getDailyQuestions = async (params: DailyQuestionsRequest) => {
  const { data } = await axiosInstance.get<DailyQuestionsResponse>(END_POINTS.ADMIN.DAILY.QUESTIONS, { params });
  return data.result;
};

/** 데일리 질문 등록 */
const createDailyQuestions = async (request: CreateDailyQuestionsRequest) => {
  const { data } = await axiosInstance.post<CreateDailyQuestionsRequest, AxiosResponse<ApiResponse>>(
    END_POINTS.ADMIN.DAILY.QUESTIONS,
    request,
  );
  return data;
};

/** 커뮤니티 게시글 목록 조회 */
const getAdminPostList = async (params: AdminPostListRequest) => {
  const { data } = await axiosInstance.get<AdminPostListResponse>(END_POINTS.ADMIN.COMMUNITY.POSTS, { params });
  return data.result;
};

/** 커뮤니티 댓글 목록 조회 */
const getAdminCommentList = async (params: AdminCommentListRequest) => {
  const { data } = await axiosInstance.get<AdminCommentListResponse>(END_POINTS.ADMIN.COMMUNITY.COMMENTS, {
    params,
  });
  return data.result;
};

/** 쿠폰 목록 조회 */
const getCoupons = async (params: CouponListRequest) => {
  const queryParams = {
    ...params,
    status: Array.from(params.status),
    couponTypes: params.couponTypes ? Array.from(params.couponTypes) : undefined,
  };
  const { data } = await axiosInstance.get<CouponListResponse>(END_POINTS.ADMIN.COUPONS.LIST, { params: queryParams });
  return data.result;
};

/** 어드민 결제 내역 조회 */
const getPaymentHistory = async (params: AdminPaymentHistoryRequest) => {
  const { data } = await axiosInstance.get<AdminPaymentHistoryResponse>(END_POINTS.ADMIN.PAYMENTS.LIST, { params });
  return data.result;
};

/** 쿠폰 등록 */
const createCoupon = async (request: CreateCouponRequest) => {
  const { data } = await axiosInstance.post<CreateCouponRequest, AxiosResponse<ApiResponse>>(
    END_POINTS.ADMIN.COUPONS.REGIST,
    request,
  );
  return data;
};

/** 쿠폰 수정 */
const updateCoupon = async (request: UpdateCouponRequest) => {
  const { data } = await axiosInstance.patch<UpdateCouponRequest, AxiosResponse<ApiResponse>>(
    END_POINTS.ADMIN.COUPONS.LIST,
    request,
  );
  return data;
};

/** 쿠폰 발급 내역 조회 */
const getCouponHistory = async (params: CouponHistoryRequest) => {
  const { data } = await axiosInstance.get<CouponHistoryResponse>(END_POINTS.ADMIN.COUPONS.HISTORY, { params });
  return data.result;
};

export const adminApi = {
  getMemberList,
  getMemberDailyQuestions,
  changeMemberRole,
  deleteMember,
  getDailyQuestions,
  createDailyQuestions,
  getAdminPostList,
  getAdminCommentList,
  getCoupons,
  getPaymentHistory,
  createCoupon,
  updateCoupon,
  getCouponHistory,
};
