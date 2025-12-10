'use client';

import { css, SerializedStyles, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export type OutlinedTagColor = 'blue' | 'green' | 'violet' | 'orange' | 'cyan' | 'pink' | 'gray';

export interface OutlinedTagStyleProps {
  color: OutlinedTagColor;
}

const colorStyles: Record<OutlinedTagColor, (theme: Theme) => SerializedStyles> = {
  blue: (theme) => css`
    color: ${theme.semantic.primary.normal};
    border-color: ${theme.semantic.primary.normal};
  `,
  green: (theme) => css`
    color: ${theme.palette.green[40]};
    border-color: ${theme.palette.green[40]};
  `,
  violet: (theme) => css`
    color: ${theme.palette.violet[50]};
    border-color: ${theme.palette.violet[50]};
  `,
  orange: (theme) => css`
    color: ${theme.palette.orange[50]};
    border-color: ${theme.palette.orange[50]};
  `,
  cyan: (theme) => css`
    color: ${theme.palette.cyan[40]};
    border-color: ${theme.palette.cyan[40]};
  `,
  pink: (theme) => css`
    color: ${theme.palette.pink[50]};
    border-color: ${theme.palette.pink[50]};
  `,
  gray: (theme) => css`
    color: ${theme.semantic.label.alternative};
    border-color: ${theme.semantic.label.alternative};
  `,
};

export const OutlinedTag = styled.span<
  OutlinedTagStyleProps & { onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void }
>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  padding: 0.3rem 1.1rem;
  border-radius: 9999px;
  border: 1px solid;

  ${({ theme, color }) => colorStyles[color](theme)};
  ${({ theme }) => theme.typography.label2.regular};
  background-color: ${({ theme }) => theme.semantic.background.normal.normal};

  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `}
`;
