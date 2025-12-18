'use client';

import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';

import MessageCircleX from '@/assets/icons/message-circle-x.svg';
import InfiniteScrollSentinel from '@/components/atoms/InfiniteScrollSentinel/InfiniteScrollSentinel';
import TextButton from '@/components/atoms/TextButton/TextButton';
import EmptyState from '@/components/organisms/EmptyState/EmptyState';
import useGetPaymentHistory from '@/hooks/api/member/useGetPaymentHistory';
import useScroll from '@/hooks/useScroll';
import { PaymentHistoryItem } from '@/types/payment';
import { formatDateTimeAsDotYYYYMMDDHHMM } from '@/utils/date/formatDay';

import * as S from './PaymentListMobile.styled';

export const PaymentListMobile = () => {
  const router = useRouter();
  const [cursor, setCursor] = useState(0);
  const [allPayments, setAllPayments] = useState<PaymentHistoryItem[]>([]);
  const itemsPerPage = 10;

  const { data: paymentData, isLoading } = useGetPaymentHistory({
    size: itemsPerPage,
    cursor,
  });

  const hasNextPage = paymentData && paymentData.data.length === itemsPerPage;
  const isEmpty = allPayments.length === 0 && !isLoading;

  const fetchNextPage = async () => {
    return new Promise<void>((resolve) => {
      if (paymentData?.data && paymentData.data.length > 0) {
        setCursor((prev) => prev + itemsPerPage);
        setAllPayments((prev) => [...prev, ...paymentData.data]);
      }
      resolve();
    });
  };

  const { observerRef } = useScroll({
    nextPage: !!hasNextPage,
    fetchNext: fetchNextPage,
  });

  useMemo(() => {
    if (paymentData?.data && cursor === 0) {
      setAllPayments(paymentData.data);
    }
  }, [paymentData, cursor]);

  if (isEmpty) {
    return (
      <S.Container>
        <EmptyState
          icon={<MessageCircleX />}
          description='결제 내역이 없습니다'
        />
      </S.Container>
    );
  }

  const getStatusText = (status: string) => {
    if (status === '정상') return '정상';
    if (status === '취소') return '취소';
    return '실패';
  };

  const handleDetailClick = (paymentId: number) => {
    router.push(`/mypage/purchase/payments/${paymentId}`);
  };

  return (
    <S.Container>
      {allPayments.map((payment) => (
        <S.PaymentItem key={payment.paymentHistoryId}>
          <S.PaymentInfo>
            <S.PaymentDate>{formatDateTimeAsDotYYYYMMDDHHMM(payment.paymentDate)}</S.PaymentDate>
            <S.Status status={getStatusText(payment.status)}>{getStatusText(payment.status)}</S.Status>
          </S.PaymentInfo>
          <S.PaymentAmount>
            <S.PlanName>{payment.planName}</S.PlanName>
            <S.Amount>{payment.amount.toLocaleString()} KRW</S.Amount>
          </S.PaymentAmount>
          <S.DetailButtonWrapper>
            <TextButton
              size='sm'
              color='assistive'
              label='상세 보기'
              interactionVariant='normal'
              onClick={() => handleDetailClick(payment.paymentHistoryId)}
            />
          </S.DetailButtonWrapper>
        </S.PaymentItem>
      ))}

      <InfiniteScrollSentinel
        observerRef={observerRef}
        hasNextPage={!!hasNextPage}
        isFetchingNextPage={isLoading}
      />
    </S.Container>
  );
};
