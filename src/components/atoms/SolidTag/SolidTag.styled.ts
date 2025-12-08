'use client';

import { css, SerializedStyles, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export type SolidTagColor = 'blue' | 'green' | 'violet' | 'orange' | 'cyan' | 'pink' | 'gray';

export interface SolidTagStyleProps {
  color: SolidTagColor;
  round?: boolean;
  hasClick?: boolean;
}

const colorStyles: Record<SolidTagColor, (theme: Theme) => SerializedStyles> = {
  blue: (theme) => css`
    background-color: ${theme.semantic.background.elevated.normal};
    color: ${theme.semantic.primary.normal};
  `,
  green: (theme) => css`
    background-color: ${theme.palette.green[95]};
    color: ${theme.palette.green[40]};
  `,
  violet: (theme) => css`
    background-color: ${theme.palette.violet[95]};
    color: ${theme.palette.violet[50]};
  `,
  orange: (theme) => css`
    background-color: ${theme.palette.orange[95]};
    color: ${theme.palette.orange[50]};
  `,
  cyan: (theme) => css`
    background-color: ${theme.palette.cyan[95]};
    color: ${theme.palette.cyan[40]};
  `,
  pink: (theme) => css`
    background-color: ${theme.palette.pink[95]};
    color: ${theme.palette.pink[50]};
  `,
  gray: (theme) => css`
    background-color: ${theme.semantic.fill.strong};
    color: ${theme.semantic.label.alternative};
  `,
};

export const SolidTag = styled.span<SolidTagStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  padding: 0.4rem 1.2rem;
  border-radius: ${({ round }) => (round ? '9999px' : '0.8rem')};
  cursor: ${({ hasClick }) => (hasClick ? 'pointer' : 'default')};

  ${({ theme, color }) => colorStyles[color](theme)};
  ${({ theme }) => theme.typography.label2.regular};
`;
