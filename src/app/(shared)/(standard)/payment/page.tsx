'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import ArrowTurnDownRight from '@/assets/icons/arrowturndownright.svg';
import KakaoPay from '@/assets/icons/kakaopay.svg';
import Checkbox from '@/components/atoms/Checkbox/Checkbox';
import OutlinedButton from '@/components/atoms/OutlinedButton/OutlinedButton';
import SolidButton from '@/components/atoms/SolidButton/SolidButton';
import AuthGuard from '@/components/organisms/AuthGuard/AuthGuard';
import { PLAN_MAPPING } from '@/constants/common';
import useGetUserSummary from '@/hooks/api/member/useGetUserSummary';
import { useGetBillingKey } from '@/hooks/api/payment/useGetBillingKey';
import { useGetPlanInfo } from '@/hooks/api/payment/useGetPlanInfo';
import { useGetPlans } from '@/hooks/api/payment/useGetPlans';
import { usePaymentProcessor } from '@/hooks/api/payment/usePaymentProcessor';
import { usePaymentResume } from '@/hooks/api/payment/usePaymentResume';
import { loadPaymentState } from '@/stores/paymentStorage';
import { useAuthStore } from '@/stores/useAuthStore';
import { useLargeModalStore } from '@/stores/useModalStore2';
import { PaymentMethod, ApplyCouponResponse } from '@/types/payment';
import { checkPaymentMethods } from '@/utils/portone';

import PaymentCard from './_components/PaymentCard/PaymentCard';
import * as S from './page.styled';

interface CouponResult {
  isApplied: boolean;
  couponName: string;
  couponDiscount: number;
  finalPrice: number | null;
}

const INITIAL_COUPON_RESULT: CouponResult = {
  isApplied: false,
  couponName: '미사용',
  couponDiscount: 0,
  finalPrice: null,
};

const INITIAL_SELECTED_COUPON_ID: number | null = null;

const isFreeTrialAvailable = (trialParam: boolean, isTrialUsed: boolean, planId: number) => {
  const monthlyPlanId = PLAN_MAPPING['MONTH'];
  return trialParam && !isTrialUsed && planId === monthlyPlanId;
};

// URL 파라미터나 기본값으로 초기 상태를 결정하는 함수
const getInitialSelectedId = (searchParams: ReturnType<typeof useSearchParams>) => {
  const planParam = searchParams.get('plan') ?? 'MONTH';
  return PLAN_MAPPING[planParam] || PLAN_MAPPING.MONTH;
};

export default function Payment() {
  const searchParams = useSearchParams();
  const isTrialParam = searchParams.get('trial') === 'true';
  const identityVerificationId = searchParams.get('identityVerificationId'); // 재개 여부 판단
  const isUnauth = useAuthStore((s) => s.isUnauth());
  const { open: largeStoreOpen } = useLargeModalStore();

  const [selectedId, setSelectedId] = useState<number>(() => getInitialSelectedId(searchParams));
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [showAgreementError, setShowAgreementError] = useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('CARD');
  const [isFlowProcessing, setIsFlowProcessing] = useState<boolean>(false); // 버튼 클릭으로 시작된 처리 상태

  const [couponApplyResult, setCouponApplyResult] = useState<CouponResult>(INITIAL_COUPON_RESULT);
  const [lastSelectedCouponId, setLastSelectedCouponId] = useState<number | null>(INITIAL_SELECTED_COUPON_ID);

  const { data: userSummary } = useGetUserSummary();
  const { data: billingKey } = useGetBillingKey();
  const { data: plans } = useGetPlans();
  const { data: planInfo } = useGetPlanInfo(
    selectedId,
    isFreeTrialAvailable(isTrialParam, userSummary?.isTrialUsed ?? false, selectedId),
  );

  const { startPaymentFlow } = usePaymentProcessor();
  const { isResuming } = usePaymentResume();

  useEffect(() => {
    setCouponApplyResult(INITIAL_COUPON_RESULT);
    setLastSelectedCouponId(INITIAL_SELECTED_COUPON_ID);
  }, [planInfo?.paymentHistoryId]);

  useEffect(() => {
    // 1. URL에 identityVerificationId 파라미터가 있고,
    // 2. 현재 상태가 처리 중이 아닌 경우 (isResuming은 usePaymentResume 내부에서 처리)
    if (identityVerificationId) {
      const storedState = loadPaymentState();

      if (storedState) {
        // 세션에 저장된 planId와 paymentMethod로 상태를 복원
        setSelectedId(storedState.planId);
        setSelectedPaymentMethod(storedState.paymentMethod);
      }
    }
  }, [identityVerificationId]);

  // 전체 처리 상태: 버튼 클릭으로 시작했거나, 리다이렉트 후 재개 중일 때 true
  const isProcessing = isFlowProcessing || isResuming;

  const isSubscribed = () => {
    const currentPlanId = userSummary?.planId;
    return currentPlanId === PLAN_MAPPING.MONTH || currentPlanId === PLAN_MAPPING.YEAR;
  };

  const getFinalDisplayedPrice = () => {
    if (couponApplyResult.finalPrice !== null) {
      return couponApplyResult.finalPrice.toLocaleString('ko-KR');
    }
    return planInfo?.monthlyPrice?.toLocaleString('ko-KR') ?? '-';
  };

  /**
   * 현재 구독 상태와 선택된 플랜을 기반으로 버튼의 '액션 타입'을 결정합니다.
   */
  const getPlanActionType = () => {
    const currentPlanId = userSummary?.planId;
    const selectedPlanId = selectedId;
    const { MONTH, YEAR } = PLAN_MAPPING;

    if (isSubscribed()) {
      if (currentPlanId === MONTH) {
        if (selectedPlanId === MONTH) return 'NONE';
        if (selectedPlanId === YEAR) return 'UPGRADE';
      }

      if (currentPlanId === YEAR) {
        if (selectedPlanId === YEAR) return 'NONE';
        if (selectedPlanId === MONTH) return 'DOWNGRADE';
      }
    }

    // 구독 중이 아닌 경우 (신규 결제 또는 빌링키 재사용)
    return 'PAYMENT';
  };

  /**
   * 버튼 레이블을 결정합니다. (getButtonLabel)
   */
  const getButtonLabel = () => {
    const action = getPlanActionType();

    if (isResuming) return '결제 재개 및 인증 중...';
    if (isFlowProcessing) return '결제 요청 중...';

    switch (action) {
      case 'NONE':
        return '해당 플랜 이용 중';
      case 'UPGRADE':
      case 'DOWNGRADE':
        return '플랜 변경하기';
      case 'PAYMENT':
      default:
        return '코그룸 프리미엄 시작하기';
    }
  };

  /**
   * 버튼의 비활성화 상태를 결정합니다. (getButtonDisabledStatus)
   */
  const getButtonDisabledStatus = () => {
    const action = getPlanActionType();

    // 'NONE' 액션 (동일 플랜 선택) 일 때는 무조건 비활성화
    if (action === 'NONE') {
      return true;
    }

    // 처리 중일 때 (결제 재개 또는 흐름 시작) 비활성화
    if (isProcessing) {
      return true;
    }

    // 나머지 경우 (업그레이드, 다운그레이드, PAYMENT)는 활성화
    return false;
  };

  const openCouponBoxModal = () => {
    if (!planInfo) {
      alert('결제 정보를 불러오는 중입니다.');
      return;
    }

    largeStoreOpen('couponBox', {
      paymentHistoryId: planInfo.paymentHistoryId,
      initialSelectedCouponId: lastSelectedCouponId,
      onApplySuccess: (result: ApplyCouponResponse['result']) => {
        if (result.couponHistoryId === null) {
          setCouponApplyResult(INITIAL_COUPON_RESULT);
          setLastSelectedCouponId(INITIAL_SELECTED_COUPON_ID); // null로 설정
        } else if (result.isPossible) {
          // 쿠폰 적용 성공
          setCouponApplyResult({
            isApplied: true,
            couponName: result.couponName,
            couponDiscount: result.couponDiscount,
            finalPrice: result.finalPrice,
          });
          setLastSelectedCouponId(result.couponHistoryId);
        } else {
          // 적용할 수 없는 경우 (서버에서 reject)
          alert('쿠폰을 적용할 수 없습니다.');
          setCouponApplyResult(INITIAL_COUPON_RESULT);
          setLastSelectedCouponId(INITIAL_SELECTED_COUPON_ID);
        }
      },
    });
  };

  const handleClick = async () => {
    const action = getPlanActionType();

    // 1. 비활성화 상태이거나 처리 중인 경우 클릭 무시
    if (getButtonDisabledStatus()) return;

    if (!planInfo || !billingKey) {
      alert('결제 정보를 불러오는 데 실패했습니다.');
      return;
    }

    // 3. 플랜 변경 (모달 오픈)
    if (action === 'UPGRADE') {
      largeStoreOpen('upgradePlan', {});
      return;
    }

    if (action === 'DOWNGRADE') {
      largeStoreOpen('downgradePlan', {});
      return;
    }

    // 2. 약관 동의 확인 (플로우 시작 전)
    if (!isAgreed) {
      setShowAgreementError(true);
      return;
    }
    setShowAgreementError(false);

    // 4. 신규/재사용 결제 플로우 시작 (action === 'PAYMENT')
    if (action === 'PAYMENT') {
      setIsFlowProcessing(true);

      const registeredStatus = checkPaymentMethods(billingKey.paymentMethods);
      let billingKeyExistsForSelectedMethod = false;

      if (selectedPaymentMethod === 'CARD') {
        billingKeyExistsForSelectedMethod = registeredStatus.hasCARD;
      } else if (selectedPaymentMethod === 'KAKAO_PAY') {
        billingKeyExistsForSelectedMethod = registeredStatus.hasKAKAOPAY;
      }

      await startPaymentFlow(
        planInfo.paymentHistoryId,
        billingKeyExistsForSelectedMethod,
        selectedPaymentMethod,
        isSubscribed(),
        selectedId,
      );

      setIsFlowProcessing(false);
    }
  };

  if (isUnauth) {
    return <AuthGuard />;
  }

  return (
    <S.Payment>
      <S.PaymentCardWrapper>
        {plans?.slice(0, -1).map((plan) => (
          <PaymentCard
            key={plan.planId}
            id={plan.planId}
            name={plan.name}
            basePrice={plan.basePrice}
            finalPrice={plan.finalPrice}
            monthlyPrice={plan.monthlyPrice}
            description={plan.description}
            selectedId={selectedId}
            onSelect={setSelectedId}
            isFreeTrial={isFreeTrialAvailable(isTrialParam, userSummary?.isTrialUsed ?? false, plan.planId)}
          />
        ))}
      </S.PaymentCardWrapper>

      <S.PaymentInfo>
        <S.CheckPaymentText>결제 정보 확인</S.CheckPaymentText>
        {getPlanActionType() === 'PAYMENT' && (
          <S.PaymentSummary>
            <S.PaymentDetail>
              <S.InfoWrapper>
                <S.InfoText>코그룸 프리미엄 구독</S.InfoText>
                <S.PlanPrice>{planInfo?.basePrice?.toLocaleString('ko-KR') ?? '-'} KRW</S.PlanPrice>
              </S.InfoWrapper>

              <S.DiscountInfo>
                <S.InfoText>할인 적용</S.InfoText>
                <S.InfoWrapper>
                  <S.TagWrapper>
                    <S.ArrowIcon>
                      <ArrowTurnDownRight />
                    </S.ArrowIcon>
                    <S.InfoTag>기본 적용 할인</S.InfoTag>
                  </S.TagWrapper>

                  <S.DiscountPrice>-{planInfo?.baseDiscountAmount?.toLocaleString('ko-KR') ?? 0} KRW</S.DiscountPrice>
                </S.InfoWrapper>
              </S.DiscountInfo>

              <S.CouponInfo>
                <S.InfoWrapper>
                  <S.InfoText>쿠폰 사용</S.InfoText>
                  <OutlinedButton
                    size='sm'
                    color='primary'
                    label='선택하기'
                    interactionVariant='normal'
                    onClick={openCouponBoxModal}
                    isDisabled={isProcessing}
                  />
                </S.InfoWrapper>
                {couponApplyResult.isApplied && (
                  <S.InfoWrapper>
                    <S.TagWrapper>
                      <S.ArrowIcon>
                        <ArrowTurnDownRight />
                      </S.ArrowIcon>
                      <S.InfoTag>{couponApplyResult.couponName}</S.InfoTag>
                    </S.TagWrapper>

                    <S.DiscountPrice>
                      {`-${couponApplyResult.couponDiscount.toLocaleString('ko-KR')} KRW`}
                    </S.DiscountPrice>
                  </S.InfoWrapper>
                )}
              </S.CouponInfo>

              <S.PaymentMethod>
                <S.PaymentMethodTitle>결제 수단</S.PaymentMethodTitle>

                <S.PaymentMethodRow onClick={() => setSelectedPaymentMethod('CARD')}>
                  <Checkbox
                    size='nm'
                    isChecked={selectedPaymentMethod === 'CARD'}
                    onToggle={() => setSelectedPaymentMethod('CARD')}
                    interactionVariant='normal'
                    round
                  />
                  <S.PaymentMethodLabel>신용카드</S.PaymentMethodLabel>
                </S.PaymentMethodRow>

                <S.PaymentMethodRow onClick={() => setSelectedPaymentMethod('KAKAO_PAY')}>
                  <Checkbox
                    size='nm'
                    isChecked={selectedPaymentMethod === 'KAKAO_PAY'}
                    onToggle={() => setSelectedPaymentMethod('KAKAO_PAY')}
                    interactionVariant='normal'
                    round
                  />
                  <S.KakaoPayIcon>
                    <KakaoPay />
                  </S.KakaoPayIcon>
                  <S.PaymentMethodLabel>카카오페이</S.PaymentMethodLabel>
                </S.PaymentMethodRow>
              </S.PaymentMethod>
            </S.PaymentDetail>

            <S.Divider />

            <S.PaymentResult>
              <S.InfoWrapper>
                <S.ResultText>결제 및 총합</S.ResultText>
                <S.ResultText>{getFinalDisplayedPrice()} KRW</S.ResultText>
              </S.InfoWrapper>

              <S.AgreementSection>
                <S.AgreementRow>
                  <Checkbox
                    size='nm'
                    isChecked={isAgreed}
                    onToggle={(checked) => {
                      setIsAgreed(checked);
                      if (checked) setShowAgreementError(false);
                    }}
                    interactionVariant='normal'
                  />
                  <S.AgreementLabel>
                    (필수){' '}
                    <S.AgreementLink href='https://oncognier.notion.site/2963f9bd81c68065aa38c15fb5c6b484'>
                      결제 약관 및 방침
                    </S.AgreementLink>
                    에 동의합니다
                  </S.AgreementLabel>
                </S.AgreementRow>

                {showAgreementError && <S.AgreementError>결제 약관 및 방침에 동의해주세요</S.AgreementError>}
              </S.AgreementSection>
            </S.PaymentResult>
          </S.PaymentSummary>
        )}

        <SolidButton
          size='lg'
          label={getButtonLabel()}
          color='primary'
          interactionVariant='normal'
          onClick={handleClick}
          isDisabled={getButtonDisabledStatus()}
          fillContainer
        />
      </S.PaymentInfo>
    </S.Payment>
  );
}
