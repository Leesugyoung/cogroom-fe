'use client';

import styled from '@emotion/styled';

export const CancelSubscription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.2rem;

  width: 100%;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;

  width: 100%;
`;

export const Title = styled.p`
  ${({ theme }) => theme.typography.title3.bold};
  color: ${({ theme }) => theme.semantic.label.normal};

  text-align: center;
`;

export const SubTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;

  width: 100%;
`;

export const Subtitle = styled.p`
  ${({ theme }) => theme.typography.body1.semibold};
  color: ${({ theme }) => theme.semantic.primary.normal};

  text-align: center;
`;

export const Caption = styled.p`
  ${({ theme }) => theme.typography.label2.medium};
  color: ${({ theme }) => theme.semantic.primary.normal};

  text-align: center;
`;

export const BenefitList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;

  width: 100%;
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
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  width: 100%;
`;
