'use client';

import styled from '@emotion/styled';

export const ApplyCoupon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;

  width: 100%;
`;

export const Title = styled.p`
  ${({ theme }) => theme.typography.title3.bold};
  color: ${({ theme }) => theme.cogroom.black};

  text-align: center;
`;

export const CouponWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 13rem;
  border: 1px solid ${({ theme }) => theme.semantic.primary.normal};
  border-radius: 1rem;
`;

export const Coupon = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  gap: 3.2rem;

  width: 26.7rem;
  height: 10.4rem;
  padding: 1rem 2.1rem 0.9rem 2rem;
`;

export const CouponInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  z-index: 2;
`;

export const CouponPrice = styled.p`
  ${({ theme }) => theme.typography.headline1.semibold};
  color: ${({ theme }) => theme.semantic.static.white};
`;

export const CouponName = styled.p`
  ${({ theme }) => theme.typography.body1Reading.semibold};
  color: ${({ theme }) => theme.semantic.static.white};
`;

export const CouponExpiredDate = styled.p`
  ${({ theme }) => theme.typography.caption2.regular};
  color: ${({ theme }) => theme.semantic.static.white};
`;

export const Description = styled.p`
  ${({ theme }) => theme.typography.body1Reading.semibold};
  color: ${({ theme }) => theme.cogroom.black};

  text-align: center;

  & > span {
    color: ${({ theme }) => theme.semantic.primary.normal};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  width: 100%;
`;
