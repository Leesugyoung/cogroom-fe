'use client';

import { useState } from 'react';

import MessageCircleX from '@/assets/icons/message-circle-x.svg';
import NumberPagination from '@/components/molecules/NumberPagination/NumberPagination';
import EmptyState from '@/components/organisms/EmptyState/EmptyState';
import Table from '@/components/organisms/Table/Table';
import { MYPAGE_PAYMENT_TABLE_HEADER_ITEMS } from '@/constants/common';
import useGetPaymentHistory from '@/hooks/api/member/useGetPaymentHistory';
import { PaymentHistory, PaymentHistoryItem } from '@/types/payment';

import * as S from './PaymentList.styled';
import PaymentRow from '../PaymentRow/PaymentRow';

export const PaymentList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: paymentData } = useGetPaymentHistory({
    size: itemsPerPage,
    cursor: (currentPage - 1) * itemsPerPage,
  });

  const totalPages = paymentData ? Math.ceil(paymentData.totalElements / itemsPerPage) : 0;
  const isEmpty = !paymentData?.data || paymentData.data.length === 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const convertedPayments: PaymentHistory[] =
    paymentData?.data.map((item: PaymentHistoryItem) => ({
      id: item.paymentHistoryId,
      plan: item.planName,
      isPaid: item.status === '정상',
      amount: item.amount,
      paymentDate: item.paymentDate,
      status: item.status === '정상' ? 'COMPLETED' : item.status === '취소' ? 'CANCELED' : 'FAILED',
    })) || [];

  return (
    <S.Container>
      <Table
        showSelection={false}
        headerItems={MYPAGE_PAYMENT_TABLE_HEADER_ITEMS}
        isEmpty={isEmpty}
        emptyState={
          <EmptyState
            icon={<MessageCircleX />}
            description='결제 내역이 없습니다'
          />
        }
      >
        {convertedPayments.map((payment) => (
          <PaymentRow
            key={payment.id}
            payment={payment}
          />
        ))}
      </Table>

      {!isEmpty && totalPages > 1 && (
        <S.PaginationWrapper>
          <NumberPagination
            size='sm'
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </S.PaginationWrapper>
      )}
    </S.Container>
  );
};
