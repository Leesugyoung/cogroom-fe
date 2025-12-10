'use client';

import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Message from '@/assets/icons/message-circle-x.svg';
import OutlinedButton from '@/components/atoms/OutlinedButton/OutlinedButton';
import Input from '@/components/molecules/Input/Input';
import NumberPagination from '@/components/molecules/NumberPagination/NumberPagination';
import EmptyState from '@/components/organisms/EmptyState/EmptyState';
import Loading from '@/components/organisms/Loading/Loading';
import Table from '@/components/organisms/Table/Table';
import { MYPAGE_COUPON_TABLE_HEADER_ITEM } from '@/constants/common';
import useGetCouponList from '@/hooks/api/member/useGetCouponList';
import useRegisterCoupon from '@/hooks/api/member/useRegisterCoupon';
import { Coupon } from '@/types/coupon';

import CouponRow from './_components/CouponRow/CouponRow';
import * as S from './page.styled';

export default function Coupons() {
  const [currentPage, setCurrentPage] = useState(0);
  const [cursorHistory, setCursorHistory] = useState<(number | undefined)[]>([undefined]);
  const pageSize = 5;

  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: { coupon: '' },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const { registerCoupon, isLoading, isSuccess } = useRegisterCoupon();
  const { data: couponData, isLoading: isCouponLoading } = useGetCouponList({
    cursor: cursorHistory[currentPage],
    size: pageSize,
  });

  const nonDataHeaderItems = [{ label: '쿠폰 목록', align: 'center' as const, mode: 'fix' as const }];

  const totalPages = Math.max(1, Math.ceil((couponData?.totalElements || 0) / pageSize));

  const handlePageChange = (uiPageOneBased: number) => {
    const newPage = uiPageOneBased - 1;

    if (newPage > currentPage) {
      if (couponData?.nextCursor && !cursorHistory[newPage]) {
        setCursorHistory((prev) => {
          const newHistory = [...prev];
          newHistory[newPage] = couponData.nextCursor ?? undefined;
          return newHistory;
        });
      }
    }

    setCurrentPage(newPage);
  };

  const onSubmit = (data: { coupon: string }) => {
    registerCoupon(data.coupon);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  if (isCouponLoading) return <Loading />;

  return (
    <>
      <FormProvider {...methods}>
        <S.CouponForm onSubmit={handleSubmit(onSubmit)}>
          <Input
            label=''
            inputSize='md'
            placeholder='쿠폰 코드 입력'
            error={errors.coupon?.message}
            {...register('coupon')}
          />

          <OutlinedButton
            size='sm'
            color='primary'
            label={isLoading ? '등록 중...' : '등록'}
            interactionVariant='normal'
            type='submit'
          />
        </S.CouponForm>
      </FormProvider>

      <Table
        headerItems={
          !couponData?.data || couponData.data.length === 0 ? nonDataHeaderItems : MYPAGE_COUPON_TABLE_HEADER_ITEM
        }
        showSelection={false}
        isEmpty={!couponData?.data || couponData.data.length === 0}
        emptyState={
          <EmptyState
            icon={<Message />}
            description='사용 가능한 쿠폰이 없어요'
          />
        }
      >
        {couponData?.data?.map((coupon: Coupon) => (
          <CouponRow
            key={coupon.couponId}
            coupon={coupon}
          />
        ))}
      </Table>

      <S.PaginationWrapper>
        <NumberPagination
          size='sm'
          currentPage={currentPage + 1}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </S.PaginationWrapper>
    </>
  );
}
