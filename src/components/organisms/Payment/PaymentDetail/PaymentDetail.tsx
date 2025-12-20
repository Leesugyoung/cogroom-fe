import SolidTag from '@/components/atoms/SolidTag/SolidTag';
import { PaymentDetailData } from '@/types/payment';
import { formatDayAsYYYYMMDD, formatTimeAsHHmmss } from '@/utils/date/formatDay';
import { formatOrderNumber } from '@/utils/formatText';

import * as S from './PaymentDetail.styled';
import { PaymentParts } from '../_components/PaymentParts';

interface PaymentDetailProps {
  paymentData: PaymentDetailData;
}

export const PaymentDetail = ({ paymentData }: PaymentDetailProps) => {
  const getPaymentMethod = (method: string) => {
    switch (method) {
      case 'KAKAO_PAY':
        return '카카오페이';
      case 'CARD':
        return '신용/체크카드';
      default:
        return method;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PAID':
        return '결제완료';
      case 'FAILED':
        return '결제실패';
      case 'PENDING':
        return '결제 대기중';
      default:
        return status;
    }
  };

  return (
    <S.PaymentDetailContainer>
      <S.MobileTitleWrapper>
        <S.MobileTitle>결제 상세보기</S.MobileTitle>
        <S.MobileSubTitle>결제 정보와 내역을 확인할 수 있어요</S.MobileSubTitle>
      </S.MobileTitleWrapper>

      <S.MobileDivider />

      <S.MobilePlanTitleWrapper>
        <S.MobilePlanTitleBox>
          <S.PlanTitleLabel>{paymentData.planName}</S.PlanTitleLabel>
          <S.MobilePaymentState $isPaid={paymentData.status === 'PAID'}>
            결제상태 ({getStatusText(paymentData.status)})
          </S.MobilePaymentState>
          <S.MobileSubtitle>데일리, 커뮤니티 특별 혜택 + 추가혜택</S.MobileSubtitle>
          <S.MobilePriceBox>
            <S.MobileTotalPrice>{paymentData.amount.toLocaleString()}원</S.MobileTotalPrice>
            <S.MobileTotalText>KRW/월</S.MobileTotalText>
          </S.MobilePriceBox>
        </S.MobilePlanTitleBox>
      </S.MobilePlanTitleWrapper>

      <S.DesktopPlanTtileWrapper>
        <S.PlanTitleBox>
          <S.PlanTitleLabel>상품명</S.PlanTitleLabel>
          <S.PlanTitleValue>{paymentData.planName}</S.PlanTitleValue>
        </S.PlanTitleBox>
        <S.PlanTitleBox>
          <S.PlanTitleLabel>결제 번호</S.PlanTitleLabel>
          <S.PlanTitleValue>{formatOrderNumber(paymentData.paymentHistoryId)}</S.PlanTitleValue>
        </S.PlanTitleBox>
        <S.PlanTitleBox>
          <S.PlanTitleLabel>결제 상태</S.PlanTitleLabel>
          <S.PaymentStateName $isPaid={paymentData.status === 'PAID'}>
            {getStatusText(paymentData.status)}
          </S.PaymentStateName>
        </S.PlanTitleBox>
      </S.DesktopPlanTtileWrapper>

      <S.Divider />

      <S.PaymentInfoWrapper>
        <S.PartTitle>결제 정보</S.PartTitle>
        <PaymentParts
          label='회원 번호'
          value={paymentData.memberId}
        />
        <PaymentParts
          label='결제 번호'
          value={formatOrderNumber(paymentData.paymentHistoryId)}
        />
        <PaymentParts
          label='결제 일시'
          value={`${formatDayAsYYYYMMDD(paymentData.paidAt)} ${formatTimeAsHHmmss(paymentData.paidAt)}`}
        />
        <S.MethodBox>
          <S.MethodBoxLeft>
            <S.PartLabel>결제 수단 :</S.PartLabel>
          </S.MethodBoxLeft>

          <S.MethodBoxRight>
            <S.PartPaymentsLabel>{getPaymentMethod(paymentData.method)}</S.PartPaymentsLabel>
            <S.PartSubLabel>카카오페이</S.PartSubLabel>
          </S.MethodBoxRight>
        </S.MethodBox>

        <S.NextPaymentDayLabel>다음 결제일 : {formatDayAsYYYYMMDD(paymentData.nextPaymentDate)}</S.NextPaymentDayLabel>
      </S.PaymentInfoWrapper>

      <S.Divider />

      <S.PaymentInfoWrapper>
        <S.PartTitle>결제 금액</S.PartTitle>
        <S.PriceBox>
          <S.MobileDiscountLabel>{paymentData.planName}</S.MobileDiscountLabel>
          <S.PriceLabel>{paymentData.basePrice.toLocaleString()} KRW</S.PriceLabel>
        </S.PriceBox>
        <S.PriceBox>
          <S.DiscountContainer>
            <S.MobileDiscountLabel>적용된 할인 |</S.MobileDiscountLabel>
            <S.MobileTagWrapper>
              <SolidTag
                label={'기본 적용 할인'}
                color='blue'
              />
              <SolidTag
                label={'회원 등급 할인'}
                color='blue'
              />
            </S.MobileTagWrapper>
          </S.DiscountContainer>
          <S.BaseDiscountAmount>-{paymentData.baseDiscountAmount.toLocaleString()} KRW</S.BaseDiscountAmount>
        </S.PriceBox>
        <S.PriceBox>
          <S.DiscountContainer>
            <S.MobileDiscountLabel>적용된 쿠폰 |</S.MobileDiscountLabel>
            <S.MobileTagWrapper>
              {paymentData.couponName && (
                <SolidTag
                  label={paymentData.couponName}
                  color='blue'
                />
              )}
            </S.MobileTagWrapper>
          </S.DiscountContainer>
          <S.BaseDiscountAmount>
            -{paymentData.couponDiscountAmount ? paymentData.couponDiscountAmount.toLocaleString() : '0'} KRW
          </S.BaseDiscountAmount>
        </S.PriceBox>
      </S.PaymentInfoWrapper>

      <S.Divider />

      <S.PriceBox>
        <S.PartTitle>결제 및 총합</S.PartTitle>
        <S.TotalPriceBox>
          <S.TotalPrice>{paymentData.amount.toLocaleString()}원</S.TotalPrice>
          <S.TotalPriceKrw>KRW / 월</S.TotalPriceKrw>
        </S.TotalPriceBox>
      </S.PriceBox>

      <S.Dividerr />

      <S.NotificationBox>
        <S.Notification>• 결제 관련한 자세한 내용은 결제약관 및 정책을 참고해주세요.</S.Notification>
        <S.Notification>• 추가적인 문의사항은 oncognier@gmail.com을 이용해주세요.</S.Notification>
      </S.NotificationBox>
    </S.PaymentDetailContainer>
  );
};
