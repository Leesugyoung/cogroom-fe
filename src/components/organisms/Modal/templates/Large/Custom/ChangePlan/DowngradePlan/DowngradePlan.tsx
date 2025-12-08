import React from 'react';

import OutlinedButton from '@/components/atoms/OutlinedButton/OutlinedButton';
import Loading from '@/components/organisms/Loading/Loading';
import { PLAN_MAPPING } from '@/constants/common';
import { useGetPlanInfo } from '@/hooks/api/payment/useGetPlanInfo';
import { usePlanChangeMutation } from '@/hooks/api/payment/usePlanChange';
import { useLargeModalStore } from '@/stores/useModalStore2';
import { ModalOptions } from '@/types/modal2';

import * as S from './DowngradePlan.styled';
import PlanCard from '../_components/PlanCard/PlanCard';

export interface DowngradePlanModalProps extends ModalOptions {
  [key: string]: unknown;
}

export default function DowngradePlan() {
  const { close } = useLargeModalStore();
  const { data: planInfo, isLoading } = useGetPlanInfo(PLAN_MAPPING['MONTH'], false);
  const { planChange } = usePlanChangeMutation();

  if (isLoading) {
    return <Loading />;
  }

  if (!planInfo) {
    return null;
  }

  const handleDowngrade = () => {
    planChange({ paymentHistoryId: planInfo.paymentHistoryId, applyNow: false });
    close();
  };

  return (
    <S.DowngradePlan>
      <S.Title>플랜 변경하기</S.Title>

      <S.PlanInfo>
        <PlanCard
          name={planInfo?.name}
          basePrice={planInfo.basePrice}
          finalPrice={planInfo.finalPrice}
          monthlyPrice={planInfo.monthlyPrice}
        />

        <S.PaymentInfo>
          <S.Description>결제 안내</S.Description>
          <S.ListItem>
            <S.MarkerIcon />
            <S.Description>변경된 플랜은 다음 결제일부터 적용됩니다.</S.Description>
          </S.ListItem>
          <S.ListItem>
            <S.MarkerIcon />
            <S.Description>
              결제와 관련된 세부 내용은 <u>결제 약관 및 방침</u>을 참조해주세요.
            </S.Description>
          </S.ListItem>
        </S.PaymentInfo>
      </S.PlanInfo>

      <OutlinedButton
        size='lg'
        label='변경하기'
        color='primary'
        interactionVariant='normal'
        onClick={handleDowngrade}
        fillContainer
      />
    </S.DowngradePlan>
  );
}
