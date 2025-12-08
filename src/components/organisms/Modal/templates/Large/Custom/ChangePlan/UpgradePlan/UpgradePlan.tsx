import React, { useState } from 'react';

import Checkbox from '@/components/atoms/Checkbox/Checkbox';
import OutlinedButton from '@/components/atoms/OutlinedButton/OutlinedButton';
import Loading from '@/components/organisms/Loading/Loading';
import { PLAN_MAPPING } from '@/constants/common';
import { useGetPlanInfo } from '@/hooks/api/payment/useGetPlanInfo';
import { usePlanChangeMutation } from '@/hooks/api/payment/usePlanChange';
import { useLargeModalStore } from '@/stores/useModalStore2';
import { ModalOptions } from '@/types/modal2';

import * as S from './UpgradePlan.styled';
import PlanCard from '../_components/PlanCard/PlanCard';

export interface UpgradePlanModalProps extends ModalOptions {
  [key: string]: unknown;
}

export default function UpgradePlan() {
  const { close } = useLargeModalStore();
  const { data: planInfo, isLoading } = useGetPlanInfo(PLAN_MAPPING['YEAR'], false);
  const { planChange } = usePlanChangeMutation();

  const [applyNow, setApplyNow] = useState(true);

  if (isLoading) {
    return <Loading />;
  }

  if (!planInfo) {
    return null;
  }

  const handleUpgrade = () => {
    planChange({ paymentHistoryId: planInfo.paymentHistoryId, applyNow });
    close();
  };

  return (
    <S.UpgradePlan>
      <S.Title>플랜 변경하기</S.Title>

      <S.PlanInfo>
        <PlanCard
          name={planInfo?.name}
          basePrice={planInfo.basePrice}
          finalPrice={planInfo.finalPrice}
          monthlyPrice={planInfo.monthlyPrice}
          isUpgrade
        />

        <S.Apply onClick={() => setApplyNow(!applyNow)}>
          <Checkbox
            size='sm'
            interactionVariant='normal'
            isChecked={applyNow}
            onToggle={setApplyNow}
          />
          <S.ApplyText>즉시 적용하기</S.ApplyText>
        </S.Apply>

        <S.PaymentInfo>
          <S.Description>결제 안내</S.Description>

          <S.ListItem>
            <S.MarkerIcon />
            <S.Description>
              플랜 업그레이드는 즉시 적용되어 혜택을 이용하실 수 있습니다.
              <br />
              다음 결제일부터 새 플랜을 시작하시려면 <u>체크박스를 해제</u>해주세요.
            </S.Description>
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
        onClick={handleUpgrade}
        fillContainer
      />
    </S.UpgradePlan>
  );
}
