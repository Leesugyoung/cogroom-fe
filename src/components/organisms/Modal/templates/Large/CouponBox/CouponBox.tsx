import React, { useState } from 'react';

import ScriptX from '@/assets/icons/script-x.svg';
import Checkbox from '@/components/atoms/Checkbox/Checkbox';
import InfiniteScrollSentinel from '@/components/atoms/InfiniteScrollSentinel/InfiniteScrollSentinel';
import OutlinedButton from '@/components/atoms/OutlinedButton/OutlinedButton';
import EmptyState from '@/components/organisms/EmptyState/EmptyState';
import { useApplyCouponMutation } from '@/hooks/api/payment/useApplyCoupon';
import { useCancelCouponMutation } from '@/hooks/api/payment/useCancelCoupon';
import { useGetAppliedCoupon } from '@/hooks/api/payment/useGetAppliedCoupon';
import useGetCoupons from '@/hooks/api/payment/useGetCoupons';
import useScroll from '@/hooks/useScroll';
import { useLargeModalStore } from '@/stores/useModalStore2';
import { ModalOptions } from '@/types/modal2';

import * as S from './CouponBox.styled';

export interface CouponBoxModalProps extends ModalOptions {
  [key: string]: unknown;

  paymentHistoryId: number;
}

const formatDiscountText = (discountType: string, discountValue: number) => {
  if (discountType === 'PERCENT') {
    return `-${discountValue}%`;
  }
  return `-${discountValue.toLocaleString('ko-KR')}`;
};

export default function CouponBox({ paymentHistoryId }: CouponBoxModalProps) {
  const { data: couponsData, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetCoupons();
  const { applyCoupon } = useApplyCouponMutation();
  const { cancelCoupon } = useCancelCouponMutation();
  const { close } = useLargeModalStore();

  const { data: appliedCouponData } = useGetAppliedCoupon({ paymentHistoryId });

  const [selectedCouponId, setSelectedCouponId] = useState<number | null>(appliedCouponData?.couponHistoryId || null);

  const { observerRef } = useScroll({
    nextPage: hasNextPage,
    fetchNext: fetchNextPage,
  });

  const coupons = (couponsData?.pages ? couponsData.pages.flatMap((page) => page.data || []) : []).filter(
    (coupon) => coupon.status === 'ACTIVE',
  );

  const handleCouponToggle = (couponHistoryId: number) => {
    if (selectedCouponId === couponHistoryId) {
      setSelectedCouponId(null);
    } else {
      setSelectedCouponId(couponHistoryId);
    }
  };

  const handleApplyClick = () => {
    close();

    if (appliedCouponData && selectedCouponId === null) {
      cancelCoupon({ paymentHistoryId: String(paymentHistoryId), couponHistoryId: appliedCouponData.couponHistoryId });
      return;
    }

    applyCoupon({ paymentHistoryId: String(paymentHistoryId), couponHistoryId: selectedCouponId });
  };

  return (
    <S.CouponBox>
      <S.Title>내 쿠폰 보관함</S.Title>

      {coupons.length > 0 ? (
        <>
          <S.Table>
            <S.TableHeader>
              <S.Cell1>
                <S.TableHeaderText>쿠폰명</S.TableHeaderText>
              </S.Cell1>

              <S.Cell2>
                <S.TableHeaderText>혜택</S.TableHeaderText>
              </S.Cell2>
            </S.TableHeader>

            {appliedCouponData && (
              <S.TableRow
                key={appliedCouponData.couponHistoryId}
                onClick={() => handleCouponToggle(appliedCouponData.couponHistoryId)}
              >
                <Checkbox
                  isChecked={selectedCouponId === appliedCouponData.couponHistoryId}
                  onToggle={() => handleCouponToggle(appliedCouponData.couponHistoryId)}
                  size='nm'
                  interactionVariant='normal'
                />
                <S.Cell1>
                  <S.TableRowText>{appliedCouponData.couponName}</S.TableRowText>
                </S.Cell1>
                <S.Cell2>
                  <S.TableRowText>
                    {formatDiscountText(appliedCouponData.discountType, appliedCouponData.discountValue)}
                  </S.TableRowText>
                </S.Cell2>
              </S.TableRow>
            )}

            {coupons.map((coupon) => {
              const isChecked = selectedCouponId === coupon.couponHistoryId;

              return (
                <S.TableRow
                  key={coupon.couponHistoryId}
                  onClick={() => handleCouponToggle(coupon.couponHistoryId)}
                >
                  <Checkbox
                    isChecked={isChecked}
                    onToggle={() => handleCouponToggle(coupon.couponHistoryId)}
                    size='nm'
                    interactionVariant='normal'
                  />
                  <S.Cell1>
                    <S.TableRowText>{coupon.couponName}</S.TableRowText>
                  </S.Cell1>
                  <S.Cell2>
                    <S.TableRowText>{formatDiscountText(coupon.discountType, coupon.discountValue)}</S.TableRowText>
                  </S.Cell2>
                </S.TableRow>
              );
            })}

            <InfiniteScrollSentinel
              observerRef={observerRef}
              hasNextPage={hasNextPage ?? false}
              isFetchingNextPage={isFetchingNextPage}
            />
          </S.Table>

          <OutlinedButton
            size='lg'
            label='적용하기'
            color='primary'
            interactionVariant='normal'
            onClick={handleApplyClick}
            fillContainer
          />
        </>
      ) : (
        <EmptyState
          icon={<ScriptX />}
          description='사용 가능한 쿠폰이 없어요'
        />
      )}
    </S.CouponBox>
  );
}
