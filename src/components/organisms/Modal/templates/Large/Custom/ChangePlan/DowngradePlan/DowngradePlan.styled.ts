'use client';

import styled from '@emotion/styled';

export const DowngradePlan = styled.div`
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

  text-align: center;
`;

export const PlanInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.8rem;

  width: 100%;
`;

export const Apply = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.8rem;

  width: 100%;

  cursor: pointer;
`;

export const ApplyText = styled.p`
  ${({ theme }) => theme.typography.caption1.regular};
  color: ${({ theme }) => theme.palette.neutral[50]};
`;

export const PaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  width: 100%;
`;

export const Description = styled.p`
  ${({ theme }) => theme.typography.mini1.regular};
  color: ${({ theme }) => theme.palette.neutral[50]};
`;

export const ListItem = styled.li`
  display: flex;
`;

export const MarkerIcon = styled.div`
  width: 0.2rem;
  height: 0.2rem;
  margin: 0.6rem;
  background-color: ${({ theme }) => theme.palette.neutral[50]};
  border-radius: 999px;
`;
