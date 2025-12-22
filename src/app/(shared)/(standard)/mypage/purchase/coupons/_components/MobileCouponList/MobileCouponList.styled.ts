'use client';

import styled from '@emotion/styled';

export const MobileCouponContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CouponItemWrpaper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.2rem;
  gap: 2.4rem;

  border-bottom: 1px solid ${({ theme }) => theme.semantic.line.normal};
`;

export const CouponInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const CouponNameRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CouponName = styled.p`
  ${({ theme }) => theme.typography.label2.regular};
  color: ${({ theme }) => theme.semantic.label.normal};
`;

export const TagContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

export const CouponCode = styled.div`
  ${({ theme }) => theme.typography.label2.regular};
  color: ${({ theme }) => theme.semantic.label.normal};
`;

export const CouponDayAndPriceBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CouponDate = styled.span`
  ${({ theme }) => theme.typography.label2.regular};
  color: ${({ theme }) => theme.palette.neutral[50]};
`;

export const CouponPrice = styled.span`
  ${({ theme }) => theme.typography.body1.semibold};
  color: ${({ theme }) => theme.semantic.primary.normal};
`;
