'use client';

import styled from '@emotion/styled';

import { mqMax } from '@/styles/foundation';

export const SubscriptionCard = styled.div<{ $hasBestBadge?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.24rem;

  width: 100%;
  padding-top: ${({ $hasBestBadge }) => ($hasBestBadge ? '0.9rem' : '0')};
  margin-top: ${({ $hasBestBadge }) => ($hasBestBadge ? '0' : '3.7rem')};
  height: fit-content;
  border-radius: ${({ $hasBestBadge }) => ($hasBestBadge ? '2.4rem 2.4rem 2.5rem 2.5rem' : '2.5rem')};
  background-color: ${({ theme }) => theme.cogroom.black};
`;

export const BestBadge = styled.p`
  ${({ theme }) => theme.typography.body1Reading.medium};
  color: ${({ theme }) => theme.cogroom.white};
`;

export const CardContainer = styled.div<{ $isChecked?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4.4rem;

  width: 100%;
  min-height: 65.6rem;
  padding: 2.4rem 2.4rem 3.6rem 2.4rem;
  border: 1px solid rgba(117, 154, 217, 0.6);
  border-radius: 2.4rem;
  background-color: #fbfdff;

  ${mqMax.desktop} {
    gap: 2rem;
  }
`;

export const PlanCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  width: 100%;
`;

export const PlanName = styled.p`
  ${({ theme }) => theme.typography.title2.bold};
  color: ${({ theme }) => theme.semantic.primary.strong};
`;

export const PlanCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  width: 100%;
`;

export const PriceInfoWrapper = styled.div<{ $hasDiscount?: boolean }>`
  display: flex;
  flex-direction: column;

  padding-top: ${({ $hasDiscount }) => ($hasDiscount ? '0' : '2.6rem')};

  ${mqMax.desktop} {
    align-items: flex-end;
  }
`;

export const DiscountInfo = styled.p`
  ${({ theme }) => theme.typography.body1Reading.regular};
  color: ${({ theme }) => theme.palette.neutral[50]};

  span {
    text-decoration: line-through;
  }
`;

export const FinalPrice = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1.2rem;

  ${mqMax.desktop} {
    flex-direction: column;
    gap: 0;
  }
`;

export const Price = styled.p`
  ${({ theme }) => theme.typography.display1.medium};
  color: ${({ theme }) => theme.cogroom.black};

  ${mqMax.desktop} {
    ${({ theme }) => theme.typography.title1.medium};
  }
`;

export const Currency = styled.p`
  ${({ theme }) => theme.typography.headline1.regular};
  color: ${({ theme }) => theme.palette.neutral[50]};

  margin-bottom: 0.6rem;
`;

export const PlanDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const PlanDescriptionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const MarkerIcon = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  color: ${({ theme }) => theme.semantic.primary.normal};
`;

export const Description = styled.div`
  ${({ theme }) => theme.typography.body1Reading.medium};
  color: ${({ theme }) => theme.palette.neutral[30]};

  &.pending {
    color: ${({ theme }) => theme.palette.neutral[80]};
  }

  u {
    text-decoration: none;
    box-shadow: inset 0 -1px 0 ${({ theme }) => theme.palette.neutral[30]};
  }
`;

export const ShowMoreButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  width: fit-content;
  ${({ theme }) => theme.typography.body1Reading.semibold};
  color: ${({ theme }) => theme.cogroom.black};
`;

export const ChevronIcon = styled.div`
  width: 2.4rem;
  height: 2.4rem;

  color: ${({ theme }) => theme.cogroom.black};
`;
