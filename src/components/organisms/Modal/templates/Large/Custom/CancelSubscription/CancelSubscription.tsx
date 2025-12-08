import React from 'react';

import CheckCircle from '@/assets/icons/checkcircle.svg';
import OutlinedButton from '@/components/atoms/OutlinedButton/OutlinedButton';
import SolidButton from '@/components/atoms/SolidButton/SolidButton';
import { useLargeModalStore } from '@/stores/useModalStore2';
import { ModalOptions } from '@/types/modal2';

import * as S from './CancelSubscription.styled';

export interface CancelSubscriptionModalProps extends ModalOptions {
  [key: string]: unknown;

  onNext: () => void;
}

export default function CancelSubscription({ onNext }: CancelSubscriptionModalProps) {
  const { close } = useLargeModalStore();

  return (
    <S.CancelSubscription>
      <S.TextWrapper>
        <S.Title>
          ‘나’를 알아가는
          <br />
          과정이 더욱 의미있도록
        </S.Title>
        <S.SubTextWrapper>
          <S.Subtitle>지금 취소하면 아래의 혜택을 모두 잃어요</S.Subtitle>
          <S.Caption>2025.09.25까지 유지됩니다.</S.Caption>
        </S.SubTextWrapper>
      </S.TextWrapper>

      <S.BenefitList>
        <S.ListItem>
          <S.MarkerIcon>
            <CheckCircle />
          </S.MarkerIcon>
          <S.Description>스트릭 부활권</S.Description>
        </S.ListItem>

        <S.ListItem>
          <S.MarkerIcon>
            <CheckCircle />
          </S.MarkerIcon>
          <S.Description>데일리 답변 글자수 UP</S.Description>
        </S.ListItem>

        <S.ListItem>
          <S.MarkerIcon>
            <CheckCircle />
          </S.MarkerIcon>
          <S.Description>물방울 달력 무한 조회</S.Description>
        </S.ListItem>

        <S.ListItem>
          <S.MarkerIcon>
            <CheckCircle />
          </S.MarkerIcon>
          <S.Description>데일리 답변 무한 수정, 무한 공유</S.Description>
        </S.ListItem>
      </S.BenefitList>

      <S.ButtonWrapper>
        <OutlinedButton
          size='lg'
          label='플랜 취소하기'
          color='primary'
          interactionVariant='normal'
          fillContainer
          onClick={onNext}
        />

        <SolidButton
          size='lg'
          label='계속 성장하기'
          color='primary'
          interactionVariant='normal'
          fillContainer
          onClick={() => close()}
        />
      </S.ButtonWrapper>
    </S.CancelSubscription>
  );
}
