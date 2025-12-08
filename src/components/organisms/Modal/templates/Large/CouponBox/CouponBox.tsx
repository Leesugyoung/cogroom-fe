import React, { useState } from 'react';

import ScriptX from '@/assets/icons/script-x.svg';
import Checkbox from '@/components/atoms/Checkbox/Checkbox';
import InfiniteScrollSentinel from '@/components/atoms/InfiniteScrollSentinel/InfiniteScrollSentinel';
import OutlinedButton from '@/components/atoms/OutlinedButton/OutlinedButton';
import EmptyState from '@/components/organisms/EmptyState/EmptyState';
import { useApplyCouponMutation } from '@/hooks/api/payment/useApplyCoupon';
import useGetCoupons from '@/hooks/api/payment/useGetCoupons';
import useScroll from '@/hooks/useScroll';
import { useLargeModalStore } from '@/stores/useModalStore2';
import { ModalOptions } from '@/types/modal2';
import { ApplyCouponResponse } from '@/types/payment';

import * as S from './CouponBox.styled';

export interface CouponBoxModalProps extends ModalOptions {
  [key: string]: unknown;

  onApplySuccess: (result: ApplyCouponResponse['result']) => void;
  paymentHistoryId: number;
  initialSelectedCouponId?: number | null;
}

const formatDiscountText = (discountType: string, discountValue: number) => {
  if (discountType === 'PERCENT') {
    return `-${discountValue}%`;
  }
  return `-${discountValue.toLocaleString('ko-KR')}`;
};

export default function CouponBox({ onApplySuccess, paymentHistoryId, initialSelectedCouponId }: CouponBoxModalProps) {
  const { data: couponsData, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetCoupons();
  const { applyCoupon } = useApplyCouponMutation();
  const { close } = useLargeModalStore();

  const [selectedCouponId, setSelectedCouponId] = useState<number | null>(initialSelectedCouponId ?? null);

  const { observerRef } = useScroll({
    nextPage: hasNextPage,
    fetchNext: fetchNextPage,
  });

  const coupons = couponsData?.pages ? couponsData.pages.flatMap((page) => page.data || []) : [];

  const handleCouponToggle = (couponHistoryId: number) => {
    if (selectedCouponId === couponHistoryId) {
      setSelectedCouponId(null);
    } else {
      setSelectedCouponId(couponHistoryId);
    }
  };

  const handleApplyClick = () => {
    applyCoupon(
      { paymentHistoryId: String(paymentHistoryId), couponHistoryId: selectedCouponId },
      {
        onSuccess: (result) => {
          onApplySuccess(result);
          close();
        },
      },
    );
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
