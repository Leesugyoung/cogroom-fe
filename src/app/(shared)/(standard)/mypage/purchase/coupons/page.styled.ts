'use client';

import styled from '@emotion/styled';

import { mqMax } from '@/styles/foundation';

export const CouponForm = styled.form`
  display: flex;
  flex-direction: row;
  gap: 2.4rem;

  width: 100%;

  & > div:first-of-type {
    flex: 1;
  }
`;

export const PaginationWrapper = styled.div`
  margin: 0 auto;
  padding: 2.4rem 0;
`;

export const ResponsiveWrpaper = styled.div`
  ${mqMax.tablet} {
    display: none;
  }
`;

export const MobileCouponListWrapper = styled.div`
  display: none;

  ${mqMax.tablet} {
    display: block;
  }
`;
