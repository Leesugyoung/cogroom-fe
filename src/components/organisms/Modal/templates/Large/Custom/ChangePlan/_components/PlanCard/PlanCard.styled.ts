'use client';

import styled from '@emotion/styled';

export const PlanCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.8rem;

  width: 100%;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.semantic.primary.normal};
  border-radius: 1rem;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  width: 100%;
`;

export const PlanName = styled.p`
  ${({ theme }) => theme.typography.body1.semibold};
  color: ${({ theme }) => theme.semantic.primary.normal};
`;

export const PriceWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.8rem;

  width: 100%;
`;

export const DiscountInfo = styled.p`
  ${({ theme }) => theme.typography.caption1.regular};
  color: ${({ theme }) => theme.palette.neutral[50]};

  span {
    text-decoration: line-through;
  }
`;

export const FinalPrice = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.2rem;
`;

export const Price = styled.p`
  ${({ theme }) => theme.typography.body1.semibold};
  color: ${({ theme }) => theme.semantic.primary.normal};
`;

export const Currency = styled.p`
  ${({ theme }) => theme.typography.mini1.regular};
  color: ${({ theme }) => theme.palette.neutral[50]};
`;
