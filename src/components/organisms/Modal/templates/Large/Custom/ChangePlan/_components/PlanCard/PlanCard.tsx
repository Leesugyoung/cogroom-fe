'use client';

import SolidTag from '@/components/atoms/SolidTag/SolidTag';

import * as S from './PlanCard.styled';

export interface PlanCardProps {
  name: string;
  basePrice: number;
  finalPrice: number;
  monthlyPrice: number;
  isUpgrade?: boolean;
}

export default function PlanCard({ name, basePrice, finalPrice, monthlyPrice, isUpgrade }: PlanCardProps) {
  const showFinalPriceInDiscount = finalPrice !== monthlyPrice;

  return (
    <S.PlanCard>
      <S.TitleWrapper>
        <S.PlanName>{name}</S.PlanName>
        {isUpgrade && (
          <SolidTag
            label='UP'
            color='blue'
            round
          />
        )}
      </S.TitleWrapper>

      <S.PriceWrapper>
        <S.DiscountInfo>
          <span>{basePrice.toLocaleString('ko-KR')}원</span>
          {showFinalPriceInDiscount && <> → {finalPrice.toLocaleString('ko-KR')}원</>}
        </S.DiscountInfo>
        <S.FinalPrice>
          <S.Price>{monthlyPrice.toLocaleString('ko-KR')}원</S.Price>
          <S.Currency>KRW / 월</S.Currency>
        </S.FinalPrice>
      </S.PriceWrapper>
    </S.PlanCard>
  );
}
