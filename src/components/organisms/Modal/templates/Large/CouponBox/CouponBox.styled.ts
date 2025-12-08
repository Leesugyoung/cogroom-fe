'use client';

import styled from '@emotion/styled';

export const CouponBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;

  width: 100%;
`;

export const Title = styled.p`
  ${({ theme }) => theme.typography.title3.bold};
  color: ${({ theme }) => theme.semantic.label.normal};
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 22.4rem;
  overflow-y: auto;
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 0.6rem 1.8rem 0.6rem 6.9rem;
  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.semantic.fill.normal};
`;

export const TableHeaderText = styled.p`
  ${({ theme }) => theme.typography.label1.medium};
  color: ${({ theme }) => theme.semantic.label.alternative};

  text-align: center;
`;

export const Cell1 = styled.div`
  width: 9.7rem;
`;

export const Cell2 = styled.div`
  width: 7.6rem;
`;

export const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 1rem 1.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.semantic.line.normal};
`;

export const TableRowText = styled.p`
  ${({ theme }) => theme.typography.label2.regular};
  color: ${({ theme }) => theme.semantic.label.normal};

  text-align: center;
`;
