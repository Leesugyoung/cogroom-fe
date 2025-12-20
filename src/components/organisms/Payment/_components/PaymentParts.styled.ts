'use client';

import styled from '@emotion/styled';

import { mqMax } from '@/styles/foundation';

export const Partscontainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

export const PartLabel = styled.span`
  ${({ theme }) => theme.typography.label1.semibold}
  color: ${({ theme }) => theme.semantic.label.normal};

  ${mqMax.tablet} {
    ${({ theme }) => theme.typography.caption1.regular}
    color: ${({ theme }) => theme.semantic.label.alternative};
  }
`;

export const PartValue = styled.div`
  ${({ theme }) => theme.typography.label1.semibold}
  color: ${({ theme }) => theme.semantic.label.normal};

  ${mqMax.tablet} {
    ${({ theme }) => theme.typography.caption1.regular}
    color: ${({ theme }) => theme.cogroom.black};
  }
`;
