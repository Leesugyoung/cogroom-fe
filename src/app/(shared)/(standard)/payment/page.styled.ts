'use client';

import styled from '@emotion/styled';

export const Payment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8rem;
`;

export const PaymentCardWrapper = styled.div`
  display: flex;
  gap: 3.2rem;
`;

export const PaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

export const PaymentSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const PaymentDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

export const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 4.2rem;
`;

export const CheckPaymentText = styled.p`
  ${({ theme }) => theme.typography.display2.medium};
  color: ${({ theme }) => theme.cogroom.black};
`;

export const InfoText = styled.p`
  ${({ theme }) => theme.typography.heading2.medium};
  color: ${({ theme }) => theme.palette.neutral[30]};
`;

export const PlanPrice = styled.p`
  ${({ theme }) => theme.typography.heading2.medium};
  color: ${({ theme }) => theme.cogroom.black};
`;

export const DiscountPrice = styled.p`
  ${({ theme }) => theme.typography.heading2.medium};
  color: ${({ theme }) => theme.semantic.status.destructive};
`;

export const DiscountInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const ArrowIcon = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  color: ${({ theme }) => theme.semantic.label.alternative};
`;

export const InfoTag = styled.div`
  padding: 0.8rem 0.9rem;
  border-radius: 1.2rem;
  ${({ theme }) => theme.typography.label1.semibold};
  background-color: ${({ theme }) => theme.semantic.background.elevated.normal};
  color: ${({ theme }) => theme.semantic.primary.normal};
`;

export const CouponInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const PaymentMethod = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const PaymentMethodTitle = styled.p`
  ${({ theme }) => theme.typography.heading2.medium};
  color: ${({ theme }) => theme.palette.neutral[30]};
`;

export const PaymentMethodRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const KakaoPayIcon = styled.div`
  width: 4.1rem;
  height: 2rem;
  padding: 0.618rem 0.81rem;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.brandColors.kakao};
`;

export const PaymentMethodLabel = styled.p`
  ${({ theme }) => theme.typography.headline1.medium};
  color: ${({ theme }) => theme.semantic.label.normal};
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(117, 154, 217, 0.6);
  border-radius: 999px;
`;

export const PaymentResult = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const ResultText = styled.p`
  ${({ theme }) => theme.typography.title2.medium};
  color: ${({ theme }) => theme.cogroom.black};
`;

export const AgreementSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const AgreementRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

export const AgreementLabel = styled.p`
  ${({ theme }) => theme.typography.body2.medium};
  color: ${({ theme }) => theme.palette.neutral[50]};
`;

export const AgreementLink = styled.a`
  ${({ theme }) => theme.typography.body2.semibold};
  color: ${({ theme }) => theme.palette.neutral[50]};

  text-decoration: underline;
`;

export const AgreementError = styled.p`
  ${({ theme }) => theme.typography.body2.medium};
  color: ${({ theme }) => theme.semantic.status.destructive};
`;
