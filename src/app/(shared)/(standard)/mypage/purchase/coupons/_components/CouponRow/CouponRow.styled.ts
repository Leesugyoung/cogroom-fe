'use client';

import styled from '@emotion/styled';

export const CouponRow = styled.div`
  display: flex;
  align-items: center;
  height: 4.8rem;
  justify-content: space-around;
  border-bottom: 1px solid ${({ theme }) => theme.semantic.line.normal};

  padding: 0 3rem;
  &:last-child {
    border-bottom: none;
  }

  &:not(:first-child) {
    margin-top: 1.2rem;
  }
`;

export const CouponCell = styled.div<{
  width?: string;
}>`
  ${({ theme }) => theme.typography.label2.regular};
  color: ${({ theme }) => theme.semantic.label.normal};

  display: flex;
  ${({ width }) => (width ? `width: ${width};` : '100%')}
  align-items: center;
  justify-content: center;
  text-align: center;

  &:not(:last-child) {
    margin-right: 0.8rem;
  }

  & > * {
    margin: 0 auto;
  }
`;
