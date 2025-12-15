'use client';

import styled from '@emotion/styled';

export const CouponCreateContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 3.2rem;
  align-items: center;
  padding-top: 3rem;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
`;

export const PageTitle = styled.p`
  ${({ theme }) => theme.typography.heading1.semibold}
  color:  ${({ theme }) => theme.semantic.label.normal}
`;

export const PageSubTitle = styled.p`
  ${({ theme }) => theme.typography.label1.regular}
  color:  ${({ theme }) => theme.semantic.label.alternative}
`;

export const CreateOptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  width: 58.3rem;
  flex: 1;
`;

export const OptionBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;

  & > * {
    flex: 1;
    min-width: 0;
    width: calc(50% - 0.8rem);
  }
`;

export const SeletDayBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  & > div:last-child {
    width: 100% !important;
  }

  & * {
    max-width: none !important;
  }
`;

export const SubmitButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 38.6rem;
  gap: 1.4rem;

  align-items: center;
`;

export const DiscountInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

export const DiscountInputGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  align-items: flex-end;

  & > div:first-child {
    flex: 2;
  }

  & > div:last-child {
    flex: 1;
  }

  /* 숫자 입력 필드의 스핀 버튼 제거 */
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`;
