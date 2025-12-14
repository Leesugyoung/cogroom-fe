'use client';

import styled from '@emotion/styled';

import { mqMax } from '@/styles/foundation';

export const Subscription = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionContainer = styled.div<{
  isLast?: boolean;
  isBlue?: boolean;
  isWhite?: boolean;
}>`
  padding: 12rem 0;
  padding-bottom: ${({ isLast }) => isLast && '23.2rem'};

  background-color: ${({ theme, isBlue, isWhite }) =>
    isBlue ? theme.palette.blue[70] : isWhite ? theme.cogroom.white : 'transparent'};
`;

export const PlanSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6rem;

  max-width: 111.7rem;
  margin: 0 auto;
`;

export const SubscriptionText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;

export const Heading = styled.p`
  ${({ theme }) => theme.typography.display1.bold};
  color: ${({ theme }) => theme.semantic.label.normal};

  text-align: center;

  ${mqMax.desktop} {
    ${({ theme }) => theme.typography.display2.medium};
  }

  ${mqMax.tablet} {
    ${({ theme }) => theme.typography.title2.bold};
  }
`;

export const Subtext = styled.p`
  ${({ theme }) => theme.typography.headline1.regular};
  color: ${({ theme }) => theme.semantic.label.normal};

  text-align: center;

  ${mqMax.tablet} {
    ${({ theme }) => theme.typography.body1.medium};
  }
`;

export const SubscriptionCardWrapper = styled.div`
  display: flex;
  gap: 3.2rem;

  width: 100%;

  ${mqMax.desktop} {
    flex-direction: column;
    gap: 2.4rem;

    max-width: 55.4rem;
    padding: 0 1.2rem;
  }
`;

export const FeatureSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12rem;

  max-width: 83.6rem;
  margin: 0 auto;

  ${mqMax.desktop} {
    padding: 0 1.6rem;
  }
`;

export const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;

  width: 100%;
`;

export const FeatureText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;

  width: 100%;
`;

export const Title = styled.p`
  padding: 1.8rem 3.2rem;
  ${({ theme }) => theme.typography.heading2.semibold};
  color: ${({ theme }) => theme.semantic.primary.normal};
  background-color: ${({ theme }) => theme.semantic.background.elevated.normal};
  border-radius: 999px;

  ${mqMax.desktop} {
    ${({ theme }) => theme.typography.body1Reading.semibold};
    padding: 0.8rem 1.6rem;
  }
`;

export const Description = styled.p`
  ${({ theme }) => theme.typography.title2.bold};
  color: ${({ theme }) => theme.cogroom.white};

  text-align: center;

  ${mqMax.desktop} {
    ${({ theme }) => theme.typography.title3.bold};
  }
`;

export const UpgradeSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6rem;

  max-width: 86.8rem;
  margin: 0 auto;
`;

export const UpgradeText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;

  width: 100%;
`;

export const FreeTrialText = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.8rem;

  ${({ theme }) => theme.typography.title1.bold};
  color: ${({ theme }) => theme.semantic.label.normal};

  ${mqMax.desktop} {
    ${({ theme }) => theme.typography.title3.bold};
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 86.8rem;
  height: 94.4rem;

  ${mqMax.desktop} {
    width: 31.1rem;
    height: 33.9rem;
  }
`;

export const UpgradeTitle = styled.p`
  ${({ theme }) => theme.typography.display1.medium};
  color: ${({ theme }) => theme.semantic.label.normal};

  strong {
    ${({ theme }) => theme.typography.display1.bold};
  }

  ${mqMax.desktop} {
    ${({ theme }) => theme.typography.title3.bold};

    strong {
      ${({ theme }) => theme.typography.title3.bold};
    }
  }
`;

export const UpgradeDescription = styled.p`
  ${({ theme }) => theme.typography.title3.regular};
  color: ${({ theme }) => theme.semantic.label.normal};

  text-align: center;

  ${mqMax.desktop} {
    ${({ theme }) => theme.typography.heading2.medium};
  }
`;
