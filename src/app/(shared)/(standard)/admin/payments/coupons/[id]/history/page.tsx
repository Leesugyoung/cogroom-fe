'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import SortButton from '@/app/(shared)/(standard)/mypage/_components/SortButton/SortButton';
import Plus from '@/assets/icons/plus.svg';
import SolidButton from '@/components/atoms/SolidButton/SolidButton';
import NumberPagination from '@/components/molecules/NumberPagination/NumberPagination';
import SearchFilter from '@/components/molecules/SearchFilter/SearchFilter';
import Table from '@/components/organisms/Table/Table';
import { COUPON_TYPE_OPTIONS, COUPON_HISTORY_TABLE_HEADER_ITEMS } from '@/constants/common';
import { SortType } from '@/types/member';

import CouponHistoryRow from './_components/CouponHistoryRow/CouponHistoryRow';
import * as S from './page.styled';
import PaymentTabSelect from '../../../_components/PaymentTabSelect/PaymentTabSelect';
import * as SS from '../../../page.styled';

export default function CouponHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<SortType>('latest');

  const router = useRouter();

  // Mock
  const mockHistoryData = [
    {
      id: 1,
      nickname: '사용자1',
      memberId: 1001,
      userId: 'user1@example.com',
      issuedAt: '2024.12.21 10:30',
      couponType: '체험형',
      isUsed: true,
      usedAt: '2024.12.21 15:45',
    },
    {
      id: 2,
      nickname: '사용자2',
      memberId: 1002,
      userId: 'user2@example.com',
      issuedAt: '2024.12.21 11:20',
      couponType: '제휴형',
      isUsed: false,
      usedAt: '-',
    },
  ];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(mockHistoryData.length / itemsPerPage);

  const handleSearchSubmit = () => {
    setCurrentPage(1);
  };

  const handleCouponCreate = () => {
    router.push('/admin/payments/coupons/create');
  };

  const handleSortToggle = () => {
    setSort((prev) => (prev === 'latest' ? 'oldest' : 'latest'));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filterFields = {
    search: [{ name: 'keyword', placeholder: '회원정보 검색' }],
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
          <S.CheckCouponValue>신규회원 5% 할인</S.CheckCouponValue>
        </S.CheckCouponwrapper>
        <SortButton
          sort={sort}
          onClick={handleSortToggle}
        />
      </S.FilterHeader>

      <Table headerItems={COUPON_HISTORY_TABLE_HEADER_ITEMS}>
        {mockHistoryData.map((item) => (
          <CouponHistoryRow
            key={item.id}
            item={item}
          />
        ))}
      </Table>

      <S.SearchResults>
        <S.BoldText>총 수량</S.BoldText> : 000개 / <S.BoldText> 미사용</S.BoldText> : 00개 /
        <S.BoldText> 사용완료</S.BoldText> : 00개
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
