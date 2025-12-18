'use client';

import styled from '@emotion/styled';

import { mqMax } from '@/styles/foundation';

export const DesktopOnly = styled.div`
  display: block;
  ${mqMax.tablet} {
    display: none;
  }
`;

export const MobileOnly = styled.div`
  display: none;
  ${mqMax.tablet} {
    display: block;
  }
`;
