'use client';

import styled from '@emotion/styled';

import { mqMax } from '@/styles/foundation';

export const MethodContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const PaymentMethodsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  gap: 1.2rem;
  padding-top: 1.2rem;

  /* 카카오페이 아이콘 */
  svg.kakao path {
    fill: ${({ theme }) => theme.brandColors.kakao} !important;
  }

  /* 네이버페이 아이콘 */
  svg.naver path {
    fill: ${({ theme }) => theme.brandColors.naver} !important;
  }
`;

export const ButtonBox = styled.div`
  width: fit-content;

  ${mqMax.tablet} {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.2rem;
    width: fit-content;
  }
`;

export const MobileAddButtonWrapper = styled.div`
  display: none;

  ${mqMax.tablet} {
    display: block;
  }
`;

export const DesktopAddButtonWrapper = styled.div`
  display: block;

  ${mqMax.tablet} {
    display: none;
  }
`;

export const Divider = styled.div`
  border: 1px solid ${({ theme }) => theme.semantic.line.normal};
`;

export const CheckboxWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  gap: 0.4rem;
  align-items: center;

  margin: 1.2rem 0;
`;

export const CheckboxLabel = styled.p`
  ${({ theme }) => theme.typography.label2.regular};
  color: ${({ theme }) => theme.semantic.label.normal};
`;

export const DefaultPaymentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  height: 6rem;
  width: 100%;

  padding: 0 0.8rem;
`;

export const DefaultCardBox = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

export const CardName = styled.div`
  ${({ theme }) => theme.typography.body2.medium};
  color: ${({ theme }) => theme.palette.neutral[40]};
`;

export const MobileBox = styled.div`
  ${mqMax.tablet} {
    display: none;
  }
`;
