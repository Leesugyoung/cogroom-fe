'use client';

import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const PaymentItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.2rem;

  align-items: start;
  border-bottom: 1px solid ${({ theme }) => theme.semantic.line.normal};

  padding: 1.2rem 1.2rem;
`;

export const PaymentInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  justify-content: space-between;
`;

export const PlanName = styled.div`
  ${({ theme }) => theme.typography.label2.regular}
  color: ${({ theme }) => theme.semantic.label.normal};
`;

export const PaymentDate = styled.div`
  ${({ theme }) => theme.typography.label2.regular}
  color: ${({ theme }) => theme.palette.neutral[50]};
`;

export const PaymentAmount = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  justify-content: space-between;
`;

export const Amount = styled.div`
  ${({ theme }) => theme.typography.label2.regular};
  color: ${({ theme }) => theme.semantic.label.normal};
`;

export const Status = styled.div<{ status: string }>`
  ${({ theme }) => theme.typography.label2.regular};
  color: ${({ theme, status }) => {
    if (status === '정상') return theme.semantic.label.normal;
    if (status === '취소') return theme.palette.red[60];
    return theme.palette.red[60];
  }};
`;

export const DetailButtonWrapper = styled.div`
  display: flex;
  width: 100%;
`;
