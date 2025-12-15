import { http, HttpResponse } from 'msw';

import { END_POINTS, HTTP_STATUS_CODE } from '@/constants/api';
import { CreateDailyQuestionsRequest, DeleteMemberRequest, CreateCouponRequest } from '@/types/admin';

import { changeMemberRoleSuccess } from '../data/admin/changeMemberRoleData';
import {
  createCouponSuccess,
  createCouponCodeDuplicateError,
  createCouponInvalidDiscountValueError,
  createCouponInvalidDateRangeError,
  createCouponInvalidTargetPlanError,
} from '../data/admin/createCouponData';
import { createDailyQuestionsError, createDailyQuestionsSuccess } from '../data/admin/createDailyQuestionsData';
import { deleteMemberError, deleteMemberSuccess } from '../data/admin/deleteMemberData';
import { getAdminCommentListSuccess } from '../data/admin/getAdminCommentListData';
import { getAdminCouponListData } from '../data/admin/getAdminCouponsListData';
import { getAdminPaymentHistoryData } from '../data/admin/getAdminPaymentHistoryData';
import { getAdminPostListSuccess } from '../data/admin/getAdminPostListData';
import { getDailyQuestionsSuccess } from '../data/admin/getDailyQuestionsData';
import {
  getMemberDailyQuestionsError,
  getMemberDailyQuestionsSuccess,
} from '../data/admin/getMemberDailyQuestionsData';
import { getMemberListSuccess } from '../data/admin/getMemberListData';
import { updateCouponSuccess } from '../data/admin/updateCouponData';

export const adminHandlers = [
  // 회원 목록 조회
  http.get(END_POINTS.ADMIN.MEMBERS.ROOT, async () => {
    return new HttpResponse(JSON.stringify(getMemberListSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 특정 회원의 데일리 질문/답변 조회
  http.get(END_POINTS.ADMIN.MEMBERS.DAILY(':memberId'), async ({ params }) => {
    const { memberId } = params;

    if (!memberId) {
      return new HttpResponse(JSON.stringify(getMemberDailyQuestionsError), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    return new HttpResponse(JSON.stringify(getMemberDailyQuestionsSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 회원 권한 변경
  http.patch(END_POINTS.ADMIN.MEMBERS.CHANGE_ROLE(':memberId'), async () => {
    return new HttpResponse(JSON.stringify(changeMemberRoleSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 회원 삭제
  http.delete(END_POINTS.ADMIN.MEMBERS.ROOT, async ({ request }) => {
    const body = (await request.json()) as DeleteMemberRequest;

    if (!body.memberIdList) {
      return new HttpResponse(JSON.stringify(deleteMemberError), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    return new HttpResponse(JSON.stringify(deleteMemberSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 데일리 질문 목록 조회
  http.get(END_POINTS.ADMIN.DAILY.QUESTIONS, async () => {
    return new HttpResponse(JSON.stringify(getDailyQuestionsSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 데일리 질문 등록
  http.post(END_POINTS.ADMIN.DAILY.QUESTIONS, async ({ request }) => {
    const body = (await request.json()) as CreateDailyQuestionsRequest;

    if (!body.level || !body.categoryList) {
      return new HttpResponse(JSON.stringify(createDailyQuestionsError), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    return new HttpResponse(JSON.stringify(createDailyQuestionsSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 커뮤니티 게시글 목록 조회
  http.get(END_POINTS.ADMIN.COMMUNITY.POSTS, async () => {
    return new HttpResponse(JSON.stringify(getAdminPostListSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 커뮤니티 댓글 목록 조회
  http.get(END_POINTS.ADMIN.COMMUNITY.COMMENTS, async () => {
    return new HttpResponse(JSON.stringify(getAdminCommentListSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 쿠폰 목록 조회
  http.get(END_POINTS.ADMIN.COUPONS.LIST, async ({ request }) => {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams.entries());
    const statusArray = url.searchParams.getAll('status');
    const keyword = params.keyword;
    const couponTypes = url.searchParams.getAll('couponTypes');
    const sort = params.sort || 'latest';

    const size = Number(params.size) || 4;
    const cursor = Number(params.cursor) || 0;

    let filteredData = [...getAdminCouponListData.result.data];

    if (statusArray.length > 0 && !statusArray.includes('ALL')) {
      filteredData = filteredData.filter((coupon) => statusArray.includes(coupon.status));
    }

    if (keyword) {
      filteredData = filteredData.filter((coupon) => coupon.couponName.toLowerCase().includes(keyword.toLowerCase()));
    }

    if (couponTypes.length > 0 && !couponTypes.includes('ALL')) {
      filteredData = filteredData.filter((coupon) => couponTypes.includes(coupon.couponType));
    }

    // 정렬 적용
    if (sort === 'latest') {
      filteredData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sort === 'oldest') {
      filteredData.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    const paginatedData = filteredData.slice(cursor, cursor + size);

    const response = {
      ...getAdminCouponListData,
      result: {
        ...getAdminCouponListData.result,
        data: paginatedData,
        totalElements: filteredData.length,
      },
    };

    return new HttpResponse(JSON.stringify(response), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 어드민 결제 내역 조회
  http.get(END_POINTS.ADMIN.PAYMENTS.LIST, async ({ request }) => {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams.entries());
    const categoryArray = url.searchParams.getAll('category');
    const keyword = params.keyword;
    const sort = params.sort || 'latest';

    const size = Number(params.size) || 5;
    const cursor = Number(params.cursor) || 0;

    let filteredData = [...getAdminPaymentHistoryData.result.data];

    if (categoryArray.length > 0) {
      filteredData = filteredData.filter((payment) => categoryArray.includes(payment.category));
    }

    if (keyword) {
      filteredData = filteredData.filter((payment) => {
        const searchKeyword = keyword.toLowerCase();
        const nicknameMatch = payment.nickname.toLowerCase().includes(searchKeyword);
        const idMatch = payment.paymentHistoryId.toString().includes(keyword);

        // ORD 형식으로 검색 시 (예: ORD00000125)
        const ordMatch =
          searchKeyword.startsWith('ord') &&
          payment.paymentHistoryId.toString().padStart(8, '0').includes(searchKeyword.substring(3));

        return nicknameMatch || idMatch || ordMatch;
      });
    }

    // 정렬 적용
    if (sort === 'latest') {
      filteredData.sort((a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime());
    } else if (sort === 'highest') {
      filteredData.sort((a, b) => b.price - a.price);
    } else if (sort === 'lowest') {
      filteredData.sort((a, b) => a.price - b.price);
    }

    const paginatedData = filteredData.slice(cursor, cursor + size);

    const response = {
      ...getAdminPaymentHistoryData,
      result: {
        ...getAdminPaymentHistoryData.result,
        data: paginatedData,
        totalElements: filteredData.length,
      },
    };

    return new HttpResponse(JSON.stringify(response), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 쿠폰 등록
  http.post(END_POINTS.ADMIN.COUPONS.REGIST, async ({ request }) => {
    const body = (await request.json()) as CreateCouponRequest;

    // 중복 쿠폰 코드 체크 (기존에 있는 코드들과 비교)
    const existingCodes = ['TRIAL10', 'NEWBIE5', 'YEARLY50K', 'PARTNER10', 'NEWBIE5_2'];
    if (existingCodes.includes(body.couponCode)) {
      return new HttpResponse(JSON.stringify(createCouponCodeDuplicateError), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    // 할인 값 검증
    if (!body.discountValue || body.discountValue <= 0) {
      return new HttpResponse(JSON.stringify(createCouponInvalidDiscountValueError), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    // 날짜 범위 검증
    if (body.startDate && body.endDate) {
      const startDate = new Date(body.startDate);
      const endDate = new Date(body.endDate);
      if (endDate <= startDate) {
        return new HttpResponse(JSON.stringify(createCouponInvalidDateRangeError), {
          status: HTTP_STATUS_CODE.BAD_REQUEST,
        });
      }
    }

    // 발급 수량 검증
    if (!body.maxIssuedCount || body.maxIssuedCount <= 0) {
      return new HttpResponse(JSON.stringify(createCouponInvalidTargetPlanError), {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    return new HttpResponse(JSON.stringify(createCouponSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),

  // 쿠폰 수정
  http.patch(END_POINTS.ADMIN.COUPONS.LIST, async () => {
    return new HttpResponse(JSON.stringify(updateCouponSuccess), {
      status: HTTP_STATUS_CODE.OK,
    });
  }),
];
