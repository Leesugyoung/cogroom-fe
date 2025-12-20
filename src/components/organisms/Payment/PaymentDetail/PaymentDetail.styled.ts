'use client';

import styled from '@emotion/styled';

import { mqMax } from '@/styles/foundation';

export const PaymentDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;

  ${mqMax.tablet} {
    padding: 0 2rem;
  }
`;

export const DesktopPlanTtileWrapper = styled.div`
  display: flex;
  gap: 1.2rem;

  ${mqMax.tablet} {
    display: none;
  }
`;

export const PlanTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

export const PlanTitleValue = styled.div`
  width: 20.4rem;
  height: 3.5rem;
  border: 1px solid ${({ theme }) => theme.semantic.label.assistive};
  background-color: ${({ theme }) => theme.semantic.static.white};
  border-radius: 1.2rem;
  padding: 1.3rem 1.6rem;

  ${({ theme }) => theme.typography.label1.regular}
  color: ${({ theme }) => theme.semantic.label.normal};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PaymentStateBox = styled(PlanTitleValue)`
  width: fit-content;
`;

export const PlanTitleLabel = styled.span`
  ${({ theme }) => theme.typography.label1.semibold}
  color: ${({ theme }) => theme.semantic.label.normal};

  ${mqMax.tablet} {
    ${({ theme }) => theme.typography.label1.semibold}
  }
`;

export const PaymentStateName = styled(PlanTitleValue)<{ $isPaid?: boolean }>`
  ${({ theme }) => theme.typography.body2.semibold}
  color: ${({ theme, $isPaid }) => ($isPaid ? theme.palette.blue[60] : theme.palette.red[60])};
  width: fit-content;
`;

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.semantic.line.normal};
  margin: 0.8rem 0;

  ${mqMax.tablet} {
    height: 1px;
  }
`;

export const PaymentInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${mqMax.tablet} {
    gap: 0.4rem;
  }
`;

export const PartTitle = styled.p`
  ${({ theme }) => theme.typography.heading1.semibold}
  color: ${({ theme }) => theme.semantic.label.normal};
  padding-bottom: 0.9rem;

  ${mqMax.tablet} {
    ${({ theme }) => theme.typography.label1.semibold}
    color: ${({ theme }) => theme.cogroom.black};
  }
`;

export const PartLabel = styled.span`
  ${({ theme }) => theme.typography.label1.semibold}
  color: ${({ theme }) => theme.semantic.label.normal};

  ${mqMax.tablet} {
    ${({ theme }) => theme.typography.caption1.regular}
    color: ${({ theme }) => theme.semantic.label.alternative};
  }
`;

export const PriceLabel = styled(PartLabel)`
  ${mqMax.tablet} {
    ${({ theme }) => theme.typography.caption1.semibold}
    color: ${({ theme }) => theme.cogroom.black};
  }
`;

export const PartPaymentsLabel = styled(PartLabel)`
  ${mqMax.tablet} {
    ${({ theme }) => theme.typography.caption1.regular}
    color: ${({ theme }) => theme.cogroom.black};
  }
`;

export const PartSubLabel = styled.span`
  ${({ theme }) => theme.typography.caption1.semibold};
  color: ${({ theme }) => theme.semantic.label.neutral};
  border-left: 2px solid ${({ theme }) => theme.semantic.label.alternative};
  padding-left: 0.5rem;

  ${mqMax.tablet} {
    ${({ theme }) => theme.typography.caption1.regular}
    color: ${({ theme }) => theme.cogroom.black};
  }
`;

export const MethodBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
`;

export const MethodBoxLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

export const MethodBoxRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const NextPaymentDayLabel = styled.span`
  ${({ theme }) => theme.typography.body2.semibold};
  color: ${({ theme }) => theme.palette.blue[60]};
  padding-top: 0.2rem;

  ${mqMax.tablet} {
    ${({ theme }) => theme.typography.caption1.semibold}
  }
`;

export const PriceBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  ${mqMax.tablet} {
    align-items: center;
  }
`;

export const BaseDiscountAmount = styled(PartLabel)`
  color: ${({ theme }) => theme.palette.red[60]};

  ${mqMax.tablet} {
    ${({ theme }) => theme.typography.caption1.semibold}
    color: ${({ theme }) => theme.palette.red[60]};
  }
`;

export const TotalPrice = styled(PartTitle)`
  color: ${({ theme }) => theme.palette.blue[60]};

  ${mqMax.tablet} {
    color: ${({ theme }) => theme.palette.blue[60]};
  }
`;

export const TotalPriceKrw = styled(PartLabel)`
  ${({ theme }) => theme.typography.body1.medium};
  color: ${({ theme }) => theme.palette.neutral[50]};

  ${mqMax.tablet} {
    padding-top: 0.2rem;
    ${({ theme }) => theme.typography.caption1.regular};
  }
`;

export const TotalPriceBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
`;

export const NotificationBox = styled.div`
  padding-top: 1rem;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const Notification = styled.span`
  ${({ theme }) => theme.typography.caption2.medium};
  color: ${({ theme }) => theme.semantic.label.alternative};
`;

export const Dividerr = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.semantic.line.normal};

  ${mqMax.tablet} {
    height: 1.2px;
  }
`;

export const MobilePlanTitleWrapper = styled.div`
  display: none;

  ${mqMax.tablet} {
    display: block;

    border: 1px solid ${({ theme }) => theme.semantic.primary.normal};
    border-radius: 1rem;
    padding: 1rem 1rem;

    margin-top: 0.2rem;
  }
`;

export const MobilePlanTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const MobilePaymentState = styled.div<{ $isPaid?: boolean }>`
  ${({ theme }) => theme.typography.caption1.semibold};
  color: ${({ theme, $isPaid }) => ($isPaid ? theme.palette.blue[60] : theme.palette.red[60])};
`;

export const MobileSubtitle = styled.p`
  ${({ theme }) => theme.typography.caption2.medium};
  color: ${({ theme }) => theme.semantic.label.alternative};
`;

export const MobilePriceBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: end;
  align-items: center;
  width: 100%;
`;

export const MobileTotalPrice = styled.p`
  ${({ theme }) => theme.typography.body1.semibold};
  color: ${({ theme }) => theme.cogroom.black};
`;

export const MobileTotalText = styled.p`
  ${({ theme }) => theme.typography.caption1.medium};
  color: ${({ theme }) => theme.semantic.label.alternative};
`;

export const MobileDivider = styled.div`
  display: none;

  ${mqMax.tablet} {
    display: block;
    width: 100%;
    height: 0.15rem;
    background-color: ${({ theme }) => theme.semantic.line.normal};
  }
`;

export const MobileTitle = styled.p`
  ${({ theme }) => theme.typography.headline1.semibold}
  color: ${({ theme }) => theme.semantic.label.normal};
`;

export const MobileSubTitle = styled.div`
  ${({ theme }) => theme.typography.caption1.semibold}
  color: ${({ theme }) => theme.semantic.label.alternative};
`;

export const MobileTitleWrapper = styled.div`
  display: none;

  ${mqMax.tablet} {
    display: block;
    display: flex;
    flex-direction: column;
    margin-bottom: 0.2rem;
  }
`;

export const MobilePartLabel = styled.div`
  ${({ theme }) => theme.typography.caption1.regular}
  color: ${({ theme }) => theme.cogroom.black};
`;

export const MobileTagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

export const DiscountContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  ${mqMax.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const MobileDiscountLabel = styled.span`
  ${({ theme }) => theme.typography.label1.semibold}
  color: ${({ theme }) => theme.semantic.label.normal};

  ${mqMax.tablet} {
    ${({ theme }) => theme.typography.caption1.regular}
    color: ${({ theme }) => theme.cogroom.black};
  }
`;
