'use client';

import styled from '@emotion/styled';

export const CouponHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const CouponHistoryTitle = styled.p`
  ${({ theme }) => theme.typography.title3.medium};
  color: ${({ theme }) => theme.semantic.label.normal};
`;

export const FilterHeader = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
`;

export const CheckCouponwrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.4rem;
`;

export const CheckCouponTitle = styled.div`
  ${({ theme }) => theme.typography.body1.semibold};
  color: ${({ theme }) => theme.semantic.label.alternative};
`;

export const CheckCouponValue = styled.div`
  ${({ theme }) => theme.typography.body1.semibold};
  color: ${({ theme }) => theme.cogroom.black};
`;

export const NumberPaginationBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 2.4rem 0;
`;

export const SearchResults = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: end;

  ${({ theme }) => theme.typography.caption1.medium};
  color: ${({ theme }) => theme.semantic.label.alternative};
`;

export const BoldText = styled.span`
  ${({ theme }) => theme.typography.caption1.semibold};
  color: ${({ theme }) => theme.semantic.label.alternative};
`;
