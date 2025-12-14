'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import SolidButton from '@/components/atoms/SolidButton/SolidButton';
import Thumbnail from '@/components/atoms/Thumbnail/Thumbnail';
import { PLAN_MAPPING } from '@/constants/common';
import {
  DEFAULT_FEATURE_BANNER_1,
  DEFAULT_FEATURE_BANNER_2,
  DEFAULT_FEATURE_BANNER_3,
  DEFAULT_UPGRADE_BANNER,
} from '@/constants/image';
import useGetUserSummary from '@/hooks/api/member/useGetUserSummary';
import { useGetPlans } from '@/hooks/api/payment/useGetPlans';
import { useAuthStore } from '@/stores/useAuthStore';
import { useAppModalStore } from '@/stores/useModalStore';
import { LineBreakTablet } from '@/styles/helpers/lineBreak';

import SubscriptionCard from './_components/SubscriptionCard/SubscriptionCard';
import * as S from './page.styled';

export default function Subscription() {
  const router = useRouter();
  const isAuth = useAuthStore((s) => s.isAuth());
  const { open } = useAppModalStore();

  const { data: userSummary } = useGetUserSummary();
  const { data: plans } = useGetPlans();

  const reorderedPlans = plans ? [plans[plans.length - 1], ...plans.slice(0, plans.length - 1)] : [];

  const handleFreeTrial = () => {
    if (!isAuth) {
      open('login');
      return;
    }

    router.push('/payment?plan=MONTH&trial=true');
  };

  const handleClick = () => {
    if (!isAuth) {
      open('login');
      return;
    }

    if (userSummary?.isTrialUsed) {
      router.push('/payment');
    } else {
      handleFreeTrial();
    }
  };

  const buttonLabel = userSummary?.isTrialUsed ? '지금 시작하기' : '무료체험 하기';

  return (
    <S.Subscription>
      <S.SectionContainer>
        <S.PlanSection>
          <S.SubscriptionText>
            <S.Heading>
              {'‘나’'}를 알아가는 과정이
              <br />
              더욱 의미있도록
            </S.Heading>
            <S.Subtext>코그룸 구독으로 프리미엄 기능을 누려보세요</S.Subtext>
          </S.SubscriptionText>

          <S.SubscriptionCardWrapper>
            {reorderedPlans.map((plan) => (
              <SubscriptionCard
                key={plan.planId}
                id={plan.planId}
                name={plan.name}
                basePrice={plan.basePrice}
                baseDiscountRate={plan.baseDiscountRate}
                finalPrice={plan.finalPrice}
                monthlyPrice={plan.monthlyPrice}
                description={plan.description}
                isBestValue={plan.planId === PLAN_MAPPING['YEAR']}
                isSubscribed={plan.planId === userSummary?.planId}
                isFreeTrial={plan.planId === PLAN_MAPPING['FREE']}
                isPremiumSubscribed={
                  userSummary?.planId === PLAN_MAPPING['YEAR'] || userSummary?.planId === PLAN_MAPPING['MONTH']
                }
              />
            ))}
          </S.SubscriptionCardWrapper>

          <SolidButton
            size='lg'
            label={buttonLabel}
            color='primary'
            interactionVariant='normal'
            onClick={handleClick}
            round
          />
        </S.PlanSection>
      </S.SectionContainer>
      <S.SectionContainer isBlue>
        <S.FeatureSection>
          <S.Feature>
            <S.FeatureText>
              <S.Title>스트릭 부활권</S.Title>
              <S.Description>
                실수해도
                <LineBreakTablet /> 데일리 스트릭을 잃지 않아요!
              </S.Description>
            </S.FeatureText>
            <Thumbnail
              src={DEFAULT_FEATURE_BANNER_1}
              ratio='16_9'
              radius
            />
          </S.Feature>
          <S.Feature>
            <S.FeatureText>
              <S.Title>답변 수 100자 → 500자</S.Title>
              <S.Description>
                길이에 구애받지 않고
                <LineBreakTablet /> 마음껏 생각을 이어가 보세요
              </S.Description>
            </S.FeatureText>
            <Thumbnail
              src={DEFAULT_FEATURE_BANNER_2}
              ratio='16_9'
              radius
            />
          </S.Feature>
          <S.Feature>
            <S.FeatureText>
              <S.Title>무한 수정 & 무한 공유</S.Title>
              <S.Description>
                지난 데일리 사유를 돌아보고
                <LineBreakTablet /> 수정할 수 있어요
              </S.Description>
              <S.Description>
                자유롭게 커뮤니티에 어제, 오늘,
                <LineBreakTablet /> 지난날의 인사이트 공유해요
              </S.Description>
            </S.FeatureText>
            <Thumbnail
              src={DEFAULT_FEATURE_BANNER_3}
              ratio='16_9'
              radius
            />
          </S.Feature>
        </S.FeatureSection>
      </S.SectionContainer>
      <S.SectionContainer
        isWhite
        isLast
      >
        <S.UpgradeSection>
          <S.UpgradeText>
            <S.UpgradeDescription>&apos;나&apos;를 알아가는 여정이 더욱 의미있도록</S.UpgradeDescription>
            <S.UpgradeTitle>
              지금, 책 1/2 권 값으로 <strong>업그레이드</strong> 하기
            </S.UpgradeTitle>
          </S.UpgradeText>
          <S.FreeTrialText>
            또는, 여기서
            <SolidButton
              size='lg'
              color='primary'
              label='무료 체험'
              interactionVariant='normal'
              onClick={handleFreeTrial}
              round
            />
            시작!
          </S.FreeTrialText>
          <S.ImageWrapper>
            <Image
              src={DEFAULT_UPGRADE_BANNER}
              alt='업그레이드 안내 배너'
              fill
            />
          </S.ImageWrapper>
        </S.UpgradeSection>
      </S.SectionContainer>
    </S.Subscription>
  );
}
