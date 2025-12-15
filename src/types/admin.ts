import { RoleKey } from '@/constants/common';
import { ApiResponse, PaginationResult } from '@/types/api';

import { Comment } from './comment';
import { MemberRole } from './member';
import { Post } from './post';

export interface MemberListRequest {
  page?: number;
  startDate?: string;
  endDate?: string;
  keyword?: string;
}

export interface Member {
  memberId: number;
  nickname: string;
  email: string;
  imageUrl: string;
  createdAt: string;
  memberRole: MemberRole;
}

export interface MemberListResponse extends ApiResponse {
  result: PaginationResult<Member>;
}

export interface DailyQuestionsRequest {
  page?: number;
  level?: string[];
  category?: number[];
  keyword?: string;
  startDate?: string;
  endDate?: string;
}

export interface MemberDailyQuestion {
  assignedQuestionId: number;
  nickname: string;
  imageUrl: string;
  question: string;
  level: string;
  categories: string[];
  answer: string;
  answeredAt: string;
}

export interface MemberDailyQuestionsResponse extends ApiResponse {
  result: PaginationResult<MemberDailyQuestion>;
}

export interface DailyQuestion {
  questionId: number;
  question: string;
  level: string;
  categories: string[];
}

export interface DailyQuestionsResponse extends ApiResponse {
  result: PaginationResult<DailyQuestion>;
}

export interface AdminPostListRequest {
  page?: number;
  categoryId?: number[];
  nickname?: string;
  title?: string;
  startDate?: string;
  endDate?: string;
}

export interface AdminPostListResponse extends ApiResponse {
  result: PaginationResult<Post>;
}

export interface AdminCommentListRequest {
  page?: number;
  categoryId?: number[];
  nickname?: string;
  content?: string;
  startDate?: string;
  endDate?: string;
}

export interface AdminCommentListResponse extends ApiResponse {
  result: PaginationResult<Comment>;
}

export interface ChangeMemberRoleRequest {
  memberId: string;
  role: RoleKey;
}

export interface DeleteMemberRequest {
  memberIdList: number[];
}

export interface CreateDailyQuestionsRequest {
  level: string;
  categoryList: number[];
  questionList: { question: string }[];
}

export interface CouponListRequest {
  keyword?: string;
  couponTypes?: Set<string>;
  startDate?: string;
  endDate?: string;
  status: Set<string>;
  cursor?: number | null;
  size?: number;
  sort?: string;
}

export interface Coupon {
  couponId: number;
  couponName: string;
  createdAt: string;
  createdBy: string;
  couponType: string;
  applicablePlan: number;
  endedDate: string;
  issuedCount: number;
  status: string;
  couponTargets?: string[];
  couponCode?: string;
  discountValue?: number;
  discountType?: string;
}

export interface CouponListResponse {
  code: string;
  message: string;
  result: {
    data: Coupon[];
    nextCursor: number;
    last: boolean;
    totalElements: number;
  };
}

export interface AdminPaymentHistoryRequest {
  startDate?: string;
  endDate?: string;
  keyword?: string;
  category?: string[];
  cursor?: number;
  size?: number;
  sort?: string;
}

export interface PaymentHistory {
  paymentHistoryId: string;
  memberId: string;
  nickname: string;
  planId: number;
  planName: string;
  category: string;
  count: number;
  price: number;
  method: string;
  status: string;
  paidAt: string;
  paymentMethodId: number;
}

export interface AdminPaymentHistoryResponse {
  code: string;
  message: string;
  result: {
    totalCount: number;
    totalPrice: number;
    totalMember: number;
    averageAmount: number;
    data: PaymentHistory[];
    nextCursor: number;
    last: boolean;
    totalElements: number;
  };
}

export interface CreateCouponRequest {
  couponName: string;
  couponCode: string;
  couponType: string;
  discountValue: number;
  discountType: string;
  applicablePlan: number;
  couponTargets: string[];
  maxIssuedCount: number;
  startDate: string | null;
  endDate: string | null;
}

export interface UpdateCouponRequest {
  couponName: string;
  maxIssuedCount: number;
  startDate: string;
  endDate: string;
  couponId: number;
}
