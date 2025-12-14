'use client';

import styled from '@emotion/styled';

import { mqMax } from '@/styles/foundation';

export const PaymentCard = styled.div<{ $hasFreeBadge?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.24rem;

  width: 100%;
  padding-top: ${({ $hasFreeBadge }) => ($hasFreeBadge ? '0.9rem' : '0')};
  margin-top: ${({ $hasFreeBadge }) => ($hasFreeBadge ? '0' : '3.7rem')};
  height: fit-content;
  border-radius: ${({ $hasFreeBadge }) => ($hasFreeBadge ? '2.4rem 2.4rem 2.5rem 2.5rem' : '2.5rem')};
  background-color: ${({ theme }) => theme.cogroom.black};

  ${mqMax.desktop} {
    border-radius: ${({ $hasFreeBadge }) => ($hasFreeBadge ? '1.18rem 1.18rem 1.28rem 1.28rem' : '1.28rem')};
    gap: 0.8rem;

    margin-top: 0;
  }
`;

export const FreeBadge = styled.p`
  ${({ theme }) => theme.typography.body1Reading.medium};
  color: ${({ theme }) => theme.cogroom.white};

  ${mqMax.desktop} {
    ${({ theme }) => theme.typography.body1.semibold};
  }
`;

export const CardContainer = styled.div<{ $isChecked?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4.4rem;

  width: 100%;
  padding: 2.4rem 2.4rem 3.6rem 2.4rem;
  border: ${({ $isChecked, theme }) =>
    $isChecked ? `2px solid ${theme.semantic.primary.normal}` : '1px solid rgba(117, 154, 217, 0.6)'};
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.semantic.background.normal.normal};

  cursor: pointer;

  ${mqMax.desktop} {
    gap: 0.8rem;

    padding: 1.18rem 1.18rem 1.77rem 1.18rem;
    border-radius: 1.18rem;
  }
`;

export const PlanCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

export const PlanName = styled.p`
  ${({ theme }) => theme.typography.title2.medium};
  color: ${({ theme }) => theme.semantic.primary.strong};

  ${mqMax.desktop} {
    ${({ theme }) => theme.typography.body1.semibold};
  }
`;

export const PlanCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  width: 100%;

  ${mqMax.desktop} {
    gap: 0.8rem;
  }
`;

export const PriceInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${mqMax.desktop} {
    align-items: flex-end;
    gap: 0.5rem;
  }
`;

export const DiscountInfo = styled.p`
  ${({ theme }) => theme.typography.body1Reading.regular};
  color: ${({ theme }) => theme.palette.neutral[50]};

  span {
    text-decoration: line-through;
  }

  ${mqMax.desktop} {
    ${({ theme }) => theme.typography.label1.regular};
  }
`;

export const FinalPrice = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1.2rem;

  ${mqMax.desktop} {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const Price = styled.p`
  ${({ theme }) => theme.typography.display1.medium};
  color: ${({ theme }) => theme.cogroom.black};

  ${mqMax.desktop} {
    ${({ theme }) => theme.typography.title3.bold};
  }
`;

export const Currency = styled.p`
  ${({ theme }) => theme.typography.headline1.regular};
  color: ${({ theme }) => theme.palette.neutral[50]};

  margin-bottom: 0.6rem;

  ${mqMax.desktop} {
    ${({ theme }) => theme.typography.mini1.regular};
  }
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

  ${mqMax.desktop} {
    gap: 0.2rem;
  }
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
`;

export const Marker = styled.div`
  width: 0.6rem;
  height: 0.6rem;
  margin: 0.9rem;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.semantic.primary.normal};

  ${mqMax.desktop} {
    width: 0.3rem;
    height: 0.3rem;
    margin: 0.45rem;
  }
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

  ${mqMax.desktop} {
    ${({ theme }) => theme.typography.caption1.regular};
  }
`;

export const ShowMoreButtonDesktop = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  width: fit-content;
  ${({ theme }) => theme.typography.body1Reading.semibold};
  color: ${({ theme }) => theme.cogroom.black};

  ${mqMax.desktop} {
    display: none;
  }
`;

export const ShowMoreButtonMobile = styled.div`
  display: none;

  ${mqMax.desktop} {
    display: block;
  }
`;

export const ChevronIcon = styled.div`
  width: 2.4rem;
  height: 2.4rem;

  color: ${({ theme }) => theme.cogroom.black};
`;
