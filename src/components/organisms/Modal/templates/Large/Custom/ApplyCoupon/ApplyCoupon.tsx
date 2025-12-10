import Image from 'next/image';
import React from 'react';

import OutlinedButton from '@/components/atoms/OutlinedButton/OutlinedButton';
import { DEFAULT_COUPON_TICKET, DEFAULT_LOGO_SYMBOL_WHITE } from '@/constants/image';
import { useApplyCoupon } from '@/hooks/api/member/useApplyCoupon';
import { useLargeModalStore } from '@/stores/useModalStore2';
import { ModalOptions } from '@/types/modal2';

import * as S from './ApplyCoupon.styled';

export interface ApplyCouponModalProps extends ModalOptions {
  [key: string]: unknown;

  price: string;
  name: string;
  expiredDate: string;
  couponHistoryId: number;
}

export default function ApplyCoupon({ price, name, expiredDate, couponHistoryId }: ApplyCouponModalProps) {
  const { close } = useLargeModalStore();
  const { applyCouponToSubscription } = useApplyCoupon();

  const handleApply = () => {
    applyCouponToSubscription(
      { couponHistoryId },
      {
        onSuccess: () => {
          close();
        },
      },
    );
  };

  return (
    <S.ApplyCoupon>
      <S.Title>쿠폰 사용</S.Title>

      <S.CouponWrapper>
        <S.Coupon>
          <Image
            src={DEFAULT_LOGO_SYMBOL_WHITE}
            alt='로고'
            width={32}
            height={32}
            style={{ objectFit: 'contain', zIndex: 2 }}
          />
          <S.CouponInfo>
            <div>
              <S.CouponPrice>{price}</S.CouponPrice>
              <S.CouponName>{name}</S.CouponName>
            </div>
            <S.CouponExpiredDate>{expiredDate}</S.CouponExpiredDate>
          </S.CouponInfo>
          <Image
            src={DEFAULT_COUPON_TICKET}
            alt='쿠폰 티켓'
            fill
            style={{ objectFit: 'contain', zIndex: 1 }}
          />
        </S.Coupon>
      </S.CouponWrapper>

      <S.Description>
        보유중인 쿠폰은
        <br />
        <span>다음 결제부터 사용 가능</span>합니다.
      </S.Description>

      <S.ButtonWrapper>
        <OutlinedButton
          size='lg'
          label='닫기'
          color='assistive'
          interactionVariant='normal'
          fillContainer
          onClick={() => close()}
        />

        <OutlinedButton
          size='lg'
          label='다음 결제 시 사용'
          color='primary'
          interactionVariant='normal'
          fillContainer
          onClick={handleApply}
        />
      </S.ButtonWrapper>
    </S.ApplyCoupon>
  );
}
