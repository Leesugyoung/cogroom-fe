'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import SortButton from '@/app/(shared)/(standard)/mypage/_components/SortButton/SortButton';
import Plus from '@/assets/icons/plus.svg';
import ScriptX from '@/assets/icons/script-x.svg';
import SolidButton from '@/components/atoms/SolidButton/SolidButton';
import NumberPagination from '@/components/molecules/NumberPagination/NumberPagination';
import SearchFilter from '@/components/molecules/SearchFilter/SearchFilter';
import EmptyState from '@/components/organisms/EmptyState/EmptyState';
import Loading from '@/components/organisms/Loading/Loading';
import Table from '@/components/organisms/Table/Table';
import { COUPON_HISTORY_TABLE_HEADER_ITEMS } from '@/constants/common';
import { useGetCouponHistory } from '@/hooks/api/admin/useGetCouponHistory';
import { useAlertModalStore } from '@/stores/useModalStore';
import { CouponHistoryRequest } from '@/types/admin';
import { SortType } from '@/types/member';
import { formatDayAsSlashYYYYMMDD } from '@/utils/date/formatDay';

import CouponHistoryRow from './_components/CouponHistoryRow/CouponHistoryRow';
import * as S from './page.styled';
import PaymentTabSelect from '../../../_components/PaymentTabSelect/PaymentTabSelect';
import * as SS from '../../../page.styled';

const COUPON_HISTORY_STATUS_OPTIONS = [
  { value: 'ALL', label: '전체' },
  { value: 'UNUSED', label: '미사용' },
  { value: 'USED', label: '사용완료' },
];

export default function CouponHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<SortType>('latest');
  const [filters, setFilters] = useState<CouponHistoryRequest>({
    size: 5,
    cursor: 0,
  });

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { open: openAlert } = useAlertModalStore();
  const couponId = params.id ? Number(params.id) : undefined;
  const couponName = searchParams.get('couponName') || '-';

  useEffect(() => {
    const keyword = searchParams.get('keyword') || undefined;
    const usageStatus = searchParams.get('usageStatus') || undefined;
    const startDate = searchParams.get('startDate') || undefined;
    const endDate = searchParams.get('endDate') || undefined;

    let couponHistoryStatus: string | undefined;
    if (usageStatus === 'UNUSED') {
      couponHistoryStatus = 'ACTIVE';
    } else if (usageStatus === 'USED') {
      couponHistoryStatus = 'USED';
    }

    setFilters({
      size: 5,
      cursor: 0,
      keyword,
      couponHistoryStatus,
      startDate: startDate ? formatDayAsSlashYYYYMMDD(startDate) : undefined,
      endDate: endDate ? formatDayAsSlashYYYYMMDD(endDate) : undefined,
    });
  }, [searchParams]);

  const {
    data: couponHistoryData,
    isLoading,
    error,
  } = useGetCouponHistory({
    ...filters,
    couponId,
  });

  useEffect(() => {
    if (error) {
      const errorCode = (error as { response?: { data?: { errorCode?: string; message?: string } } })?.response?.data
        ?.errorCode;

      const excludedErrorCodes = [
        'TOKEN_INVALID_ERROR',
        'TOKEN_EXPIRED_ERROR',
        'ACCESS_TOKEN_EMPTY_ERROR',
        'INTERNAL_SERVER_ERROR',
      ];

      if (errorCode && !excludedErrorCodes.includes(errorCode)) {
        let errorMessage = '오류가 발생했습니다.';

        switch (errorCode) {
          case 'FORBIDDEN_ERROR':
            errorMessage = '사용자 권한이 없습니다.';
            break;
          case 'COUPON_FORBIDDEN_ERROR':
            errorMessage = '쿠폰 관리 권한이 없습니다.';
            break;
          case 'PAGE_OUT_OF_RANGE_ERROR':
            errorMessage = '요청한 페이지가 범위를 초과했습니다.';
            break;
          case 'DATE_FORMAT_INVALID_ERROR':
            errorMessage = '유효한 날짜 형식이 아닙니다.';
            break;
          case 'INVALID_CATEGORY_ERROR':
            errorMessage = '유효하지 않은 카테고리입니다.';
            break;
          case 'MEMBER_NOT_FOUND_ERROR':
            errorMessage = '사용자를 찾을 수 없습니다.';
            break;
          default:
            errorMessage =
              (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
              '오류가 발생했습니다.';
        }

        openAlert('alert', {
          message: errorMessage,
          type: 'alert',
          onConfirm: () => {
            if (errorCode === 'FORBIDDEN_ERROR' || errorCode === 'COUPON_FORBIDDEN_ERROR') {
              router.push('/mypage');
            }
          },
        });
      }
    }
  }, [error, openAlert]);

  const itemsPerPage = 5;
  const totalPages = couponHistoryData ? Math.ceil(couponHistoryData.totalElements / itemsPerPage) : 1;

  const handleCouponCreate = () => {
    router.push('/admin/payments/coupons/create');
  };

  const handleSortToggle = () => {
    setSort((prev) => (prev === 'latest' ? 'oldest' : 'latest'));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const newCursor = (page - 1) * itemsPerPage;
    setFilters((prev) => ({
      ...prev,
      cursor: newCursor,
    }));
  };

  const handleSearchSubmit = () => {
    setCurrentPage(1);
  };

  const filterFields = {
    search: [{ name: 'keyword', placeholder: '회원정보 검색' }],
    select: [
      {
        name: 'usageStatus',
        placeholder: '사용여부',
        options: COUPON_HISTORY_STATUS_OPTIONS,
        isMulti: false,
      },
    ],
    dateRange: {
      startDateName: 'startDate',
      endDateName: 'endDate',
    },
  };

  const filterAction = {
    label: '검색하기',
    variant: 'outlined' as const,
    onClick: handleSearchSubmit,
  };

  if (isLoading) return <Loading />;

  return (
    <S.CouponHistoryContainer>
      <SS.TabHeader>
        <PaymentTabSelect />
        <SolidButton
          size='sm'
          color='primary'
          label='쿠폰 등록'
          iconRight={<Plus />}
          interactionVariant='normal'
          onClick={handleCouponCreate}
        />
      </SS.TabHeader>

      <S.CouponHistoryTitle>발급 내역 관리</S.CouponHistoryTitle>

      <SearchFilter
        fields={filterFields}
        action={filterAction}
      />
      <S.FilterHeader>
        <S.CheckCouponwrapper>
          <S.CheckCouponTitle>조회 쿠폰 |</S.CheckCouponTitle>
          <S.CheckCouponValue>{couponName}</S.CheckCouponValue>
        </S.CheckCouponwrapper>
        <SortButton
          sort={sort}
          onClick={handleSortToggle}
        />
      </S.FilterHeader>

      <Table
        headerItems={COUPON_HISTORY_TABLE_HEADER_ITEMS}
        isEmpty={!couponHistoryData?.data?.couponHistory?.length}
        emptyState={
          <EmptyState
            icon={<ScriptX />}
            description='발급 내역이 없어요'
          />
        }
      >
        {couponHistoryData?.data?.couponHistory?.map((item) => (
          <CouponHistoryRow
            key={item.couponHistoryId}
            item={{
              id: item.couponHistoryId,
              nickname: item.nickname,
              memberId: item.memberId,
              userId: item.email,
              issuedAt: item.issuedAt,
              couponType: item.couponType,
              isUsed: item.couponHistoryStatus === 'USED',
              usedAt: item.usedAt || '-',
              couponHistoryStatus: item.couponHistoryStatus,
            }}
          />
        ))}
      </Table>

      <S.SearchResults>
        <S.BoldText>총 수량</S.BoldText> : {couponHistoryData?.data?.totalCouponHistory || 0}개 /
        <S.BoldText> 미사용</S.BoldText> : {couponHistoryData?.data?.unusedCouponHistoryCount || 0}개 /
        <S.BoldText> 사용완료</S.BoldText> : {couponHistoryData?.data?.usedCouponHistoryCount || 0}개
      </S.SearchResults>
      <S.NumberPaginationBox>
        <NumberPagination
          size='sm'
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </S.NumberPaginationBox>
    </S.CouponHistoryContainer>
  );
}
