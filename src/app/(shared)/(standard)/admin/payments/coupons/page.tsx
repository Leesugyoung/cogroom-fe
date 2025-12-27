'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useMemo, useCallback, useEffect } from 'react';

import SortButton from '@/app/(shared)/(standard)/mypage/_components/SortButton/SortButton';
import Plus from '@/assets/icons/plus.svg';
import ScriptX from '@/assets/icons/script-x.svg';
import Checkbox from '@/components/atoms/Checkbox/Checkbox';
import SolidButton from '@/components/atoms/SolidButton/SolidButton';
import NumberPagination from '@/components/molecules/NumberPagination/NumberPagination';
import SearchFilter from '@/components/molecules/SearchFilter/SearchFilter';
import EmptyState from '@/components/organisms/EmptyState/EmptyState';
import Loading from '@/components/organisms/Loading/Loading';
import Table from '@/components/organisms/Table/Table';
import { COUPON_TYPE_OPTIONS, COUPON_STATUS_OPTIONS, COUPON_TABLE_HEADER_ITEMS } from '@/constants/common';
import { useGetCoupons } from '@/hooks/api/admin/useGetCoupons';
import { useAlertModalStore } from '@/stores/useModalStore';
import { Coupon } from '@/types/admin';
import { SortType } from '@/types/member';

import * as S from './page.styled';
import CouponListRow from '../_components/CouponListRow/CouponListRow';
import PaymentTabSelect from '../_components/PaymentTabSelect/PaymentTabSelect';
import * as SS from '../page.styled';

export default function Coupons() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { open: openAlert } = useAlertModalStore();
  const [selectedStatusOptions, setSelectedStatusOptions] = useState<string[]>(['ALL']);
  const [sort, setSort] = useState<SortType>('latest');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cursors, setCursors] = useState<{ [page: number]: number | null }>({ 1: null });
  const [searchFilters, setSearchFilters] = useState({
    keyword: '',
    couponTypes: [] as string[],
  });
  const itemsPerPage = 4;

  useEffect(() => {
    const urlStatus = searchParams.getAll('couponStatus') || [];
    if (urlStatus.length > 0) {
      setSelectedStatusOptions(urlStatus);
    }

    const keyword = searchParams.get('keyword') || '';
    const couponType = searchParams.getAll('couponType') || [];

    setSearchFilters({
      keyword: keyword,
      couponTypes: couponType,
    });
  }, [searchParams]);

  const handleStatusToggle = (value: string, checked: boolean) => {
    let newStatusOptions: string[] = [];

    if (value === 'ALL') {
      newStatusOptions = checked ? ['ALL'] : ['ALL'];
    } else {
      const prev = selectedStatusOptions.filter((item) => item !== 'ALL');
      const next = checked ? [...prev, value] : prev.filter((item) => item !== value);

      const uniqueOptions = ['ING', 'DONE', 'PAUSE'];
      const isAllSelected = uniqueOptions.every((opt) => next.includes(opt));

      if (isAllSelected || next.length === 0) {
        newStatusOptions = ['ALL'];
      } else {
        newStatusOptions = next;
      }
    }

    setSelectedStatusOptions(newStatusOptions);
    setCurrentPage(1);
    setCursors({ 1: null });

    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.delete('couponStatus');

    if (!newStatusOptions.includes('ALL')) {
      newStatusOptions.forEach((status) => {
        currentParams.append('couponStatus', status);
      });
    }

    router.replace(`/admin/payments/coupons?${currentParams.toString()}`);
  };

  const handleSortToggle = () => {
    setSort((prev) => (prev === 'latest' ? 'oldest' : 'latest'));
    setCurrentPage(1);
    setCursors({ 1: null });
  };

  const apiStatus = useMemo((): Set<string> => {
    return new Set(selectedStatusOptions);
  }, [selectedStatusOptions]);

  const currentCursor = cursors[currentPage] ?? null;

  const {
    data: couponsData,
    isLoading,
    error,
  } = useGetCoupons({
    status: apiStatus,
    size: itemsPerPage,
    cursor: currentCursor,
    sort: sort === 'latest' ? 'latest' : 'oldest',
    keyword: searchFilters.keyword,
    couponTypes: new Set(searchFilters.couponTypes),
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
          case 'MEMBER_NOT_FOUND_ERROR':
            errorMessage = '사용자를 찾을 수 없습니다.';
            break;
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
          default:
            errorMessage =
              (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
              '오류가 발생했습니다.';
        }

        openAlert('alert', {
          message: errorMessage,
          type: 'alert',
        });
      }
    }
  }, [error, openAlert]);

  const coupons = useMemo(() => couponsData?.data ?? ([] as Coupon[]), [couponsData]);

  useEffect(() => {
    if (couponsData?.nextCursor && !couponsData.last) {
      setCursors((prev) => {
        if (prev[currentPage + 1]) return prev;

        return {
          ...prev,
          [currentPage + 1]: couponsData.nextCursor,
        };
      });
    }
  }, [couponsData, currentPage]);

  const currentPageIds = useMemo(() => coupons.map((c: Coupon) => c.couponId), [coupons]);
  const isAllSelected = currentPageIds.length > 0 && currentPageIds.every((id) => selectedIds.includes(id));

  const handleToggleAll = (checked: boolean) => {
    setSelectedIds(checked ? currentPageIds : []);
  };

  const handleToggleOne = useCallback((id: number, checked: boolean) => {
    setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((v) => v !== id)));
  }, []);

  const totalPages = Math.ceil((couponsData?.totalElements ?? 0) / itemsPerPage);

  const handlePageChange = (uiPageOneBased: number) => {
    setCurrentPage(uiPageOneBased);
    setSelectedIds([]);
  };

  const handleSearchSubmit = () => {
    setCurrentPage(1);
    setCursors({ 1: null });
  };

  const handleCouponCreate = () => {
    router.push('/admin/payments/coupons/create');
  };

  if (isLoading) return <Loading />;

  const filterFields = {
    search: [{ name: 'keyword', placeholder: '주문번호 / 회원정보 검색' }],
    select: [
      {
        name: 'couponType',
        placeholder: '쿠폰유형',
        options: COUPON_TYPE_OPTIONS,
        isMulti: true,
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

  return (
    <S.AdminCouponContainer>
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

      <S.SearchWrapper>
        <S.SearchTitle>쿠폰 검색 필터</S.SearchTitle>
        <SearchFilter
          fields={filterFields}
          action={filterAction}
        />
      </S.SearchWrapper>
      <S.SearchCheckBoxWrapper>
        <S.CheckboxSection>
          <S.CheckboxLabel>쿠폰 상태 |</S.CheckboxLabel>
          <S.SearchItemWrapper>
            {COUPON_STATUS_OPTIONS.map((option) => (
              <S.CheckboxItem key={option.value}>
                <Checkbox
                  size='nm'
                  isChecked={selectedStatusOptions.includes(option.value)}
                  onToggle={(checked) => handleStatusToggle(option.value, checked)}
                  interactionVariant='normal'
                  name={`status_${option.value}`}
                />
                <S.CheckboxItemLabel>{option.label}</S.CheckboxItemLabel>
              </S.CheckboxItem>
            ))}
          </S.SearchItemWrapper>
        </S.CheckboxSection>
        <SortButton
          sort={sort}
          onClick={handleSortToggle}
        />
      </S.SearchCheckBoxWrapper>

      <Table
        checked={isAllSelected}
        onCheckToggle={handleToggleAll}
        headerItems={COUPON_TABLE_HEADER_ITEMS}
        isEmpty={coupons.length === 0}
        emptyState={<EmptyState icon={<ScriptX />} />}
      >
        {coupons.map((coupon: Coupon) => (
          <CouponListRow
            key={coupon.couponId}
            coupon={coupon}
            checked={selectedIds.includes(coupon.couponId)}
            onCheckToggle={(checked) => handleToggleOne(coupon.couponId, checked)}
          />
        ))}
      </Table>

      <S.PaginationWrapper>
        <NumberPagination
          size='nm'
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </S.PaginationWrapper>
    </S.AdminCouponContainer>
  );
}
