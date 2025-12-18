import { useRouter } from 'next/navigation';

import AlertCircle from '@/assets/icons/alertcircle.svg';
import CheckCircle from '@/assets/icons/checkcircle.svg';
import OutlinedButton from '@/components/atoms/OutlinedButton/OutlinedButton';
import SolidButton from '@/components/atoms/SolidButton/SolidButton';
import TextButton from '@/components/atoms/TextButton/TextButton';
import { PLAN_TYPES, PREMIUM_BENEFITS } from '@/constants/common';
import { useCancelSubscriptionFlow } from '@/hooks/flow/useCancelSubscriptionFlow';
import { useLargeModalStore } from '@/stores/useModalStore2';
import { UserSubscription } from '@/types/member';
import { formatDayAsDotYYYYMMDD, calculateDaysBetween } from '@/utils/date/formatDay';

import * as S from './PlanDescription.styled';

interface PlanDescriptionProps {
  subscription: UserSubscription | null;
}

export const PlanDescription = ({ subscription }: PlanDescriptionProps) => {
  const { open: largeModalOpen, close: largeModalClose } = useLargeModalStore();
  const { openCancelFlow } = useCancelSubscriptionFlow();
  const router = useRouter();

  const planId = subscription?.planId;
  const isMonthly = planId === PLAN_TYPES.MONTHLY;
  const isYearly = planId === PLAN_TYPES.YEARLY;
  const isFreePlan = planId === PLAN_TYPES.FREE;

  const isPremium = !isFreePlan && subscription;
  const premiumDays =
    isPremium && subscription?.startedAt && subscription?.nextPaymentDate
      ? calculateDaysBetween(subscription.startedAt, subscription.nextPaymentDate)
      : 0;

  const getButtonLabel = () => {
    if (isYearly) return '최대 혜택 누리는 중';
    if (isMonthly) return '업그레이드 하기';
    return subscription?.isPaidBefore ? '플랜 다시 시작하기' : '플랜 시작하기';
  };

  const getTitleMessage = () => {
    return isPremium ? (
      <>
        {premiumDays.toLocaleString()}일 동안
        <br /> 프리미엄을 유지하고 있어요
      </>
    ) : (
      <>
        코그룸과 함께
        <br /> 더욱, 깊이 성장해봐요
      </>
    );
  };

  const handlePlanBenefitClick = () => {
    router.push('/subscription');
  };

  const handleButtonClick = () => {
    router.push('/subscription');
  };

  const handlePlanChange = () => {
    largeModalOpen('confirm', {
      title: '플랜 변경하기',
      description: '',

      primaryButton: {
        label: '플랜 변경하기',
        onClick: () => {
          largeModalClose();
          if (isMonthly) {
            largeModalOpen('upgradePlan', {});
          } else if (isYearly) {
            largeModalOpen('downgradePlan', {});
          }
        },
      },
      assistiveButton: {
        label: '구독 취소하기',
        onClick: () => {
          largeModalClose();
          openCancelFlow();
        },
      },
    });
  };

  return (
    <S.Container>
      <S.Title>{getTitleMessage()}</S.Title>
      <S.ContentWrapper>
        <S.BenefitsList isPremium={!!isPremium}>
          {isPremium ? (
            <>
              <S.DateLabel>
                다음 결제일
                <S.DateValue>
                  {subscription?.nextPaymentDate ? formatDayAsDotYYYYMMDD(subscription.nextPaymentDate) : ''}
                </S.DateValue>
              </S.DateLabel>
              <S.DateLabel>
                시작 결제일
                <S.DateValue>
                  {subscription?.startedAt ? formatDayAsDotYYYYMMDD(subscription.startedAt) : ''}
                </S.DateValue>
              </S.DateLabel>
            </>
          ) : (
            <>
              {PREMIUM_BENEFITS.map((benefit) => (
                <S.BenefitItemWithIcon key={benefit}>
                  <S.IconWrapper>
                    <CheckCircle />
                  </S.IconWrapper>
                  <S.BenefitText>{benefit}</S.BenefitText>
                </S.BenefitItemWithIcon>
              ))}
            </>
          )}
        </S.BenefitsList>

        <S.PlanStartBox isFreePlan={isFreePlan}>
          <S.DetailButton onClick={handlePlanBenefitClick}>
            <S.PlanBenefitButton>
              <AlertCircle />
              <S.PlanBenefitButtonText>구독 혜택 자세히 볼래요.</S.PlanBenefitButtonText>
            </S.PlanBenefitButton>
          </S.DetailButton>

          <S.ButtonWrapper isFreePlan={isFreePlan}>
            {isYearly ? (
              <S.OverideButton>
                <OutlinedButton
                  size='lg'
                  label={getButtonLabel()}
                  color={'primary'}
                  interactionVariant='normal'
                />
              </S.OverideButton>
            ) : (
              <SolidButton
                size='lg'
                label={getButtonLabel()}
                color={'primary'}
                interactionVariant='normal'
                onClick={handleButtonClick}
              />
            )}
          </S.ButtonWrapper>

          {!isFreePlan && (
            <S.PlanChgButtonWrapperMobile>
              <TextButton
                size='sm'
                color='primary'
                label='플랜 변경하기'
                interactionVariant='normal'
                onClick={handlePlanChange}
              />
            </S.PlanChgButtonWrapperMobile>
          )}
        </S.PlanStartBox>
      </S.ContentWrapper>
      {!isFreePlan && (
        <S.PlanChgButtonWrapper>
          <TextButton
            size='sm'
            color='primary'
            label='플랜 변경하기'
            interactionVariant='normal'
            onClick={handlePlanChange}
          />
        </S.PlanChgButtonWrapper>
      )}
    </S.Container>
  );
};
