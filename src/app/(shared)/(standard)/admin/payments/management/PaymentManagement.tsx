'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useMemo, useCallback, useEffect } from 'react';

import SortButton from '@/app/(shared)/(standard)/mypage/_components/SortButton/SortButton';
import Banknote from '@/assets/icons/banknote.svg';
import Bookmark from '@/assets/icons/bookmark.svg';
import Cart from '@/assets/icons/cart.svg';
import ScriptX from '@/assets/icons/script-x.svg';
import Wallet from '@/assets/icons/wallet.svg';
import NumberPagination from '@/components/molecules/NumberPagination/NumberPagination';
import SearchFilter from '@/components/molecules/SearchFilter/SearchFilter';
import EmptyState from '@/components/organisms/EmptyState/EmptyState';
import Loading from '@/components/organisms/Loading/Loading';
import Table from '@/components/organisms/Table/Table';
import { PAYMENT_CATEGORY_OPTIONS, PAYMENT_TABLE_HEADER_ITEMS } from '@/constants/common';
import { useGetPaymentHistory } from '@/hooks/api/admin/useGetPaymentHistory';
import { useUrlSearchParams } from '@/hooks/queryParams/useUrlSearchParams';
import { useAlertModalStore } from '@/stores/useModalStore';
import { SortType } from '@/types/member';

import * as S from './PaymentManagement.styled';
import PaymentListRow from '../_components/PaymentListRow/PaymentListRow';
import { SearchList } from '../_components/SearchList/SearchList';

export default function PaymentManagement() {
  const searchParams = useSearchParams();
  const { open: openAlert } = useAlertModalStore();
  const { clearAllSearchParams } = useUrlSearchParams();

  const [sort, setSort] = useState<SortType>('latest');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cursors, setCursors] = useState<{ [page: number]: number | null }>({ 1: null });
  const [searchFilters, setSearchFilters] = useState({
    keyword: '',
    category: [] as string[],
    startDate: '',
    endDate: '',
    searchField: 'nickname' as 'nickname' | 'orderOrMember',
  });
  const itemsPerPage = 5;

  useEffect(() => {
    setSearchFilters((prev) => ({
      ...prev,
      keyword: searchParams.get('keyword') || '',
      category: searchParams.getAll('category') || [],
      startDate: searchParams.get('startDate') || '',
      endDate: searchParams.get('endDate') || '',
    }));
  }, [searchParams]);

  const handleSortToggle = () => {
    setSort((prev) => (prev === 'latest' ? 'highest' : prev === 'highest' ? 'lowest' : 'latest'));
    setCurrentPage(1);
    setCursors({ 1: null });
  };

  const currentCursor = cursors[currentPage] ?? null;
  // cursor 정규화: 0이면 null로 변환
  const normalizedCursor = currentCursor === 0 ? null : currentCursor;

  const {
    data: paymentsData,
    isLoading,
    error,
  } = useGetPaymentHistory({
    size: itemsPerPage,
    cursor: normalizedCursor,
    sort,
    keyword: searchFilters.keyword,
    category: searchFilters.category,
    startDate: searchFilters.startDate || undefined,
    endDate: searchFilters.endDate || undefined,
  });

  useEffect(() => {
    if (!error) return;
    const errorCode = (error as { response?: { data?: { errorCode?: string; message?: string } } })?.response?.data
      ?.errorCode;
    const excluded = [
      'TOKEN_INVALID_ERROR',
      'TOKEN_EXPIRED_ERROR',
      'ACCESS_TOKEN_EMPTY_ERROR',
      'INTERNAL_SERVER_ERROR',
    ];
    if (errorCode && !excluded.includes(errorCode)) {
      const messages: Record<string, string> = {
        MEMBER_NOT_FOUND_ERROR: '사용자를 찾을 수 없습니다.',
        PAGE_OUT_OF_RANGE_ERROR: '요청한 페이지가 범위를 초과했습니다.',
        DATE_FORMAT_INVALID_ERROR: '유효한 날짜 형식이 아닙니다.',
        INVALID_CATEGORY_ERROR: '유효하지 않은 카테고리입니다.',
      };
      const msg =
        messages[errorCode] ||
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        '오류가 발생했습니다.';
      openAlert('alert', { message: msg, type: 'alert' });
    }
  }, [error, openAlert]);

  const payments = useMemo(() => paymentsData?.data ?? [], [paymentsData]);

  useEffect(() => {
    if (paymentsData?.nextCursor && !paymentsData.last) {
      setCursors((prev) => {
        // 이미 존재하면 업데이트하지 않음
        if (prev[currentPage + 1]) return prev;

        return {
          ...prev,
          [currentPage + 1]: paymentsData.nextCursor,
        };
      });
    }
  }, [paymentsData, currentPage]);

  const currentPageIds = useMemo(() => payments.map((p) => p.paymentHistoryId), [payments]);
  const isAllSelected = currentPageIds.every((id) => selectedIds.includes(id));

  const handleToggleAll = (checked: boolean) => setSelectedIds(checked ? currentPageIds : []);
  const handleToggleOne = useCallback((id: string, checked: boolean) => {
    setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((v) => v !== id)));
  }, []);

  const totalPages = Math.ceil((paymentsData?.totalElements ?? 0) / itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedIds([]);
  };

  // 검색 정책
  const handleSearchSubmit = () => {
    const keyword = searchFilters.keyword.trim();

    const isNumeric = /^\d+$/.test(keyword.replace(/[\s-]/g, ''));
    let processedKeyword = keyword;
    let searchField: 'orderOrMember' | 'nickname' = 'nickname';

    if (isNumeric) {
      processedKeyword = keyword.replace(/[\s-]/g, '');
      searchField = 'orderOrMember';
    } else {
      processedKeyword = keyword.toLowerCase();
      searchField = 'nickname';
    }

    setSearchFilters((prev) => ({
      ...prev,
      keyword: processedKeyword,
      searchField,
    }));

    setCurrentPage(1);
    setCursors({ 1: null });
    setSelectedIds([]);
  };

  const handleRemoveFilter = (key: string, value?: string) => {
    setSearchFilters((prev) => {
      const updated = { ...prev };
      if (key === 'keyword') updated.keyword = '';
      else if (key === 'category' && value) updated.category = prev.category.filter((cat) => cat !== value);
      else if (key === 'dateRange') {
        updated.startDate = '';
        updated.endDate = '';
      }
      return updated;
    });
    setCurrentPage(1);
    setCursors({ 1: null });
    setSelectedIds([]);
  };

  const handleResetFilters = () => {
    setSearchFilters({ keyword: '', category: [], startDate: '', endDate: '', searchField: 'nickname' });
    setCurrentPage(1);
    setCursors({ 1: null });
    setSelectedIds([]);
    clearAllSearchParams();
  };

  const hasData = paymentsData?.data && paymentsData.data.length > 0;

  const average =
    hasData && paymentsData?.totalPrice && paymentsData?.totalCount
      ? Math.round(paymentsData.totalPrice / paymentsData.totalCount)
      : 0;

  if (isLoading) return <Loading />;

  const statCards = [
    { icon: <Cart />, label: '총 결제 건', value: hasData ? paymentsData.totalCount : '-', unit: '건' },
    {
      icon: <Banknote />,
      label: '총 결제금액',
      value: hasData ? paymentsData.totalPrice.toLocaleString() : '-',
      unit: '원',
    },
    { icon: <Bookmark />, label: '총 회원수', value: hasData ? paymentsData.totalMember : '-', unit: '명' },
    { icon: <Wallet />, label: '평균 결제 금액', value: hasData ? average.toLocaleString() : '-', unit: '원' },
  ];

  const filterFields = {
    search: [{ name: 'keyword', placeholder: '주문번호 / 회원정보 검색' }],
    select: [{ name: 'category', placeholder: '상품/카테고리 선택', options: PAYMENT_CATEGORY_OPTIONS, isMulti: true }],
    dateRange: { startDateName: 'startDate', endDateName: 'endDate' },
  };

  const isSearchActive =
    searchFilters.keyword || searchFilters.category.length > 0 || searchFilters.startDate || searchFilters.endDate;

  return (
    <S.PaymentManagementContainer>
      <S.SearchWrapper>
        <S.SearchTitle>전체 결제 ({paymentsData?.totalElements ?? 0}건)</S.SearchTitle>
        <S.SearchFilterWrapper>
          <SearchFilter
            fields={filterFields}
            action={{ label: '검색하기', variant: 'outlined', onClick: handleSearchSubmit }}
          />
          <SortButton
            sort={sort}
            onClick={handleSortToggle}
          />
        </S.SearchFilterWrapper>
      </S.SearchWrapper>

      {isSearchActive && (
        <SearchList
          filters={searchFilters}
          options={PAYMENT_CATEGORY_OPTIONS}
          onRemoveFilter={handleRemoveFilter}
          onResetFilters={handleResetFilters}
        />
      )}

      <S.PaymentTotalValueWrapper>
        {statCards.map(({ icon, label, value, unit }) => (
          <S.StatCard key={label}>
            <S.StatIconWrapper>{icon}</S.StatIconWrapper>
            <S.StatInfo>
              <S.StatLabel>{label}</S.StatLabel>
              <S.StatValue>
                {value}
                {value !== '-' && <S.StatUnit>{unit}</S.StatUnit>}
              </S.StatValue>
            </S.StatInfo>
          </S.StatCard>
        ))}
      </S.PaymentTotalValueWrapper>

      <Table
        checked={isAllSelected}
        onCheckToggle={handleToggleAll}
        headerItems={PAYMENT_TABLE_HEADER_ITEMS}
        isEmpty={payments.length === 0}
        emptyState={
          <EmptyState
            icon={<ScriptX />}
            description='검색 결과가 없어요'
          />
        }
      >
        {payments.map((payment) => (
          <PaymentListRow
            key={payment.paymentHistoryId}
            payment={payment}
            checked={selectedIds.includes(payment.paymentHistoryId)}
            onCheckToggle={(checked) => handleToggleOne(payment.paymentHistoryId, checked)}
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
    </S.PaymentManagementContainer>
  );
}
