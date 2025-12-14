'use client';

import { useState } from 'react';

import ChevronDown from '@/assets/icons/chevrondown-bold.svg';
import ChevronUp from '@/assets/icons/chevronup-bold.svg';
import Checkbox from '@/components/atoms/Checkbox/Checkbox';
import OutlinedButton from '@/components/atoms/OutlinedButton/OutlinedButton';
import { PLAN_ID_TO_NAME } from '@/constants/common';
import { parsePlanDescription } from '@/utils/formatText';

import * as S from './PaymentCard.styled';

export interface PaymentCardProps {
  id: number;
  name: string;
  basePrice: number;
  finalPrice: number;
  monthlyPrice: number;
  description: string;
  selectedId?: number;
  onSelect: (id: number) => void;
  disabled?: boolean;
  isFreeTrial?: boolean;
}

const BASE_DESCRIPTIONS: Record<string, string[]> = {
  MONTH: ['월간 정기구독', '데일리, 커뮤니티 특별 혜택', '추후 포인트 적립 가점'],
  YEAR: [
    '연간 정기구독',
    '모든 월간 구독 혜택 포함',
    '데일리, 커뮤니티 특별 혜택 + 추가혜택',
    '추후 포인트 적립 가점 ++',
  ],
};

export default function PaymentCard({
  id,
  name,
  basePrice,
  finalPrice,
  monthlyPrice,
  description,
  selectedId,
  onSelect,
  disabled = false,
  isFreeTrial = false,
}: PaymentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isChecked = selectedId === id;

  const handleClick = () => {
    if (disabled) return;
    onSelect(id);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  const parsedDescription = [...BASE_DESCRIPTIONS[PLAN_ID_TO_NAME[id]], ...parsePlanDescription(description)];
  const visibleDescriptions = isExpanded ? parsedDescription : BASE_DESCRIPTIONS[PLAN_ID_TO_NAME[id]];

  return (
    <S.PaymentCard $hasFreeBadge={isFreeTrial}>
      {isFreeTrial && <S.FreeBadge>무료 체험으로 시작</S.FreeBadge>}

      <S.CardContainer
        role='button'
        $isChecked={isChecked}
        onClick={handleClick}
      >
        <S.PlanCardHeader>
          <S.PlanName>{name}</S.PlanName>
          <Checkbox
            size='nm'
            isChecked={isChecked}
            interactionVariant='normal'
            round
          />
        </S.PlanCardHeader>

        <S.PlanCardContent>
          <S.PriceInfoWrapper>
            <S.DiscountInfo>
              <span>{basePrice.toLocaleString('ko-KR')}원</span> → {finalPrice.toLocaleString('ko-KR')}원
            </S.DiscountInfo>
            <S.FinalPrice>
              <S.Price>{monthlyPrice.toLocaleString('ko-KR')}원</S.Price>
              <S.Currency>KRW / 월</S.Currency>
            </S.FinalPrice>
          </S.PriceInfoWrapper>

          <S.PlanDescription>
            <S.PlanDescriptionList>
              {visibleDescriptions.map((item, index) => {
                const isPending = item.includes('(준비중)');
                return (
                  <S.ListItem key={index}>
                    <S.Marker />
                    <S.Description
                      className={isPending ? 'pending' : undefined}
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  </S.ListItem>
                );
              })}
            </S.PlanDescriptionList>

            <S.ShowMoreButtonDesktop
              type='button'
              onClick={handleToggle}
            >
              {isExpanded ? '접기' : '자세히 보기'}
              <S.ChevronIcon>{isExpanded ? <ChevronUp /> : <ChevronDown />}</S.ChevronIcon>
            </S.ShowMoreButtonDesktop>

            <S.ShowMoreButtonMobile onClick={handleToggle}>
              <OutlinedButton
                size='sm'
                label='더보기'
                color='primary'
                iconRight={isExpanded ? <ChevronUp /> : <ChevronDown />}
                interactionVariant='normal'
                fillContainer
              />
            </S.ShowMoreButtonMobile>
          </S.PlanDescription>
        </S.PlanCardContent>
      </S.CardContainer>
    </S.PaymentCard>
  );
}
