import { ApiResponse, CursorPaginationResult } from './api';
import { Comment } from './comment';
import { Post } from './post';

export type MemberRole = 'USER' | 'ADMIN' | 'CONTENT_PROVIDER';

export type SortType = 'latest' | 'oldest' | 'highest' | 'lowest';

export type UserSummary = {
  nickname: string;
  imageUrl: string;
  memberRole: MemberRole;
  isTrialUsed: boolean;
  planId: number;
  isRevived: boolean;
};

export interface UserSummaryResponse extends ApiResponse {
  result: UserSummary;
}

export type UserInfo = {
  email: string;
  nickname: string;
  imageUrl?: string;
  phoneNumber?: string;
  description?: string;
};

export interface UserInfoResponse extends ApiResponse {
  result: UserInfo;
}

export type UserProfile = {
  memberId: number;
  nickname: string;
  profileUrl?: string;
  description?: string;
};

export interface UserProfileResponse extends ApiResponse {
  result: UserProfile;
}

export interface EditUserInfoRequest extends UserInfo {}

export type UserDaily = {
  question: string;
  answer: string;
  assignedDate: string;
  answerDate: string;
  questionId: number;
  updatable: boolean;
};

export interface UserDailyResponse extends ApiResponse {
  result: UserDaily[];
}

export interface UserDashboardResponse extends ApiResponse {
  result: {
    nickname: string;
    signupDays: number;
    dailyStreak: number;
  };
}

export interface CheckNicknameRequest {
  nickname: string;
}

export interface CheckNicknameResponse extends ApiResponse {
  result: boolean;
}

export interface WithdrawRequest {
  reason: string;
}

export interface UserCommunityRequest {
  sort?: string;
  categoryId?: number[];
  keyword?: string;
  startDate?: string;
  endDate?: string;
  cursor?: number | null;
}

export interface UserPostListResponse extends ApiResponse {
  result: CursorPaginationResult<Post>;
}

export interface UserCommentListResponse extends ApiResponse {
  result: CursorPaginationResult<Comment>;
}

export type UserSubscription = {
  planId: number;
  name: string;
  nextPaymentDate: string;
  startedAt: string;
  duration: number;
  paymentHistoryId: number | null;
  isPaidBefore: boolean;
};

export interface UserSubscriptionResponse extends ApiResponse {
  result: UserSubscription;
}

export interface CancelSubscriptionRequest {
  reason: string;
}

export type PaymentMethodType = 'CARD' | 'KAKAO_PAY';

export type PaymentMethodItem = {
  paymentMethodId: number;
  cardName?: string;
  cardNum?: number | null;
  type: PaymentMethodType;
  isPresent: boolean;
};

export type PaymentMethod = {
  data: PaymentMethodItem[];
};

export interface PaymentMethodResponse extends ApiResponse {
  result: PaymentMethod;
}

export interface DeletePaymentMethodRequest {
  paymentMethodId: number;
}

export interface ChangeDefaultPaymentMethodRequest {
  paymentMethodId: number;
}
