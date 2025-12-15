'use client';

import { css, SerializedStyles, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectStyleProps {
  isError?: boolean;
  isOpen?: boolean;
  inputSize?: SelectSize;
  disabled?: boolean;
}

const sizeStyles: Record<SelectSize, (theme: Theme) => SerializedStyles> = {
  sm: (theme) => css`
    ${theme.typography.label2.regular}
  `,
  md: (theme) => css`
    ${theme.typography.label1.regular}
  `,
  lg: (theme) => css`
    ${theme.typography.body1.regular}
  `,
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 100%;
`;

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const InputContainer = styled.div<SelectStyleProps>`
  display: flex;
  align-items: center;

  width: 100%;
  padding: 1.1rem 3.4rem 1.1rem 1.5rem;
  border-radius: 1.2rem;
  border: 1px solid
    ${({ theme, isError, isOpen }) =>
      isError
        ? theme.semantic.status.destructive
        : isOpen
          ? theme.semantic.primary.normal
          : theme.semantic.label.assistive};

  background-color: ${({ theme, disabled }) => (disabled ? theme.semantic.fill.normal : theme.semantic.static.white)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

export const TriggerInput = styled.input<SelectStyleProps>`
  width: 100%;
  border: none;
  background: transparent;

  ${({ theme, inputSize = 'md' }) => sizeStyles[inputSize](theme)};
  color: ${({ theme, disabled }) => (disabled ? theme.semantic.label.assistive : theme.semantic.label.normal)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &::placeholder {
    ${({ theme, inputSize = 'md' }) => sizeStyles[inputSize](theme)};
    color: ${({ theme }) => theme.semantic.label.assistive};
  }

  &:focus {
    outline: none;
  }
`;

export const IconWrapper = styled.div<SelectStyleProps>`
  width: 1.6rem;
  height: 1.6rem;

  position: absolute;
  top: 50%;
  right: 1.6rem;
  transform: translateY(-50%);
  z-index: 1;

  color: ${({ theme, isError, isOpen, disabled }) =>
    disabled
      ? theme.semantic.label.assistive
      : isError
        ? theme.semantic.status.destructive
        : isOpen
          ? theme.semantic.primary.normal
          : theme.semantic.label.alternative};
`;

export const DropdownPanel = styled.div`
  position: absolute;
  z-index: 100;
  top: 100%;
  left: 0;
  right: 0;

  margin-top: 0.7rem;
  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.semantic.static.white};

  ${({ theme }) => theme.shadow.normal};
`;

export const ErrorText = styled.p`
  ${({ theme }) => theme.typography.label2.regular};
  color: ${({ theme }) => theme.semantic.status.destructive};
`;
