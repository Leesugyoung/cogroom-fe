'use client';

import styled from '@emotion/styled';

import { mqMax } from '@/styles/foundation';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 0.8rem;

  background: ${({ theme }) => theme.semantic.background.normal};
  border-radius: 1.2rem;

  margin-top: 2.4rem;
`;

export const Title = styled.p`
  ${({ theme }) => theme.typography.heading2.semibold}
  color: ${({ theme }) => theme.cogroom.black};

  br {
    display: none;
  }

  ${mqMax.desktop} {
    br {
      display: block;
    }
  }
`;

export const ContentWrapper = styled.div`
  height: 15.2rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${mqMax.tablet} {
    flex-direction: column;
    justify-content: start;
    gap: 2.4rem;
  }
`;

export const BenefitsList = styled.div<{ isPremium: boolean }>`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: ${({ isPremium }) => (isPremium ? 'end' : 'start')};
  gap: 1.6rem;

  ${mqMax.tablet} {
    gap: 0.6rem;
  }
`;

export const BenefitItem = styled.p`
  ${({ theme }) => theme.typography.body1.medium}
  color: ${({ theme }) => theme.palette.neutral[30]};
`;

export const BenefitItemWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.2rem;
  height: 2.2rem;

  svg {
    path {
      fill: ${({ theme }) => theme.semantic.primary.normal};
    }
  }
`;

export const BenefitText = styled.p`
  ${({ theme }) => theme.typography.body1.medium}
  color: ${({ theme }) => theme.palette.neutral[30]};
  margin: 0;
`;

export const DateLabel = styled.span`
  ${({ theme }) => theme.typography.label1.medium}
  color: ${({ theme }) => theme.semantic.label.alternative};
`;

export const DateValue = styled.span`
  ${({ theme }) => theme.typography.label1.medium}
  color: ${({ theme }) => theme.semantic.primary.normal};

  padding-left: 0.6rem;
`;

export const DetailButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  span {
    ${({ theme }) => theme.typography.body1.medium}
  }
`;

export const PlanStartBox = styled.div<{ isFreePlan?: boolean }>`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  gap: 1.2rem;
  justify-content: end;

  ${mqMax.tablet} {
    align-items: flex-end;
    margin-top: ${({ isFreePlan }) => (isFreePlan ? '0' : '10rem')};
  }
`;

export const ButtonWrapper = styled.div<{ isFreePlan?: boolean }>`
  display: flex;
  flex-direction: row;

  gap: 1.2rem;
  align-items: end;

  ${mqMax.tablet} {
    width: auto;
    justify-content: flex-end;
    margin-left: auto;

    button {
      width: auto;
    }
  }
`;

export const PlanBenefitButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;

  svg {
    color: ${({ theme }) => theme.cogroom.black};
    width: 2.4rem !important;
    height: 2.4rem !important;
  }
`;

export const PlanBenefitButtonText = styled.p`
  ${({ theme }) => theme.typography.label2.medium};
  color: ${({ theme }) => theme.cogroom.black};

  text-decoration: underline;
  text-underline-offset: 0.2rem;
`;

export const PlanChgButtonWrapper = styled.div`
  float: left;
  padding-top: 0.8rem;

  ${mqMax.tablet} {
    display: none;
  }
`;

export const PlanChgButtonWrapperMobile = styled.div`
  display: none;
  width: 100%;
  margin-top: 1.2rem;

  ${mqMax.tablet} {
    display: flex;
    justify-content: flex-end;
  }
`;

export const OverideButton = styled.div`
  button {
    cursor: default !important;
  }
`;
