'use client';

import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

import { Theme } from '@/styles/theme';

export type NavItemColor = 'blue' | 'black';

export interface NavItemStyleProps {
  isActive: boolean;
  color?: NavItemColor;
}

const colorStyles: Record<NavItemColor, (theme: Theme) => SerializedStyles> = {
  blue: (theme) => css`
    color: ${theme.semantic.primary.normal};
  `,
  black: (theme) => css`
    color: ${theme.semantic.label.normal};
  `,
};

export const NavItem = styled.li<NavItemStyleProps>`
  a {
    ${({ theme }) => theme.typography.body2.regular};

    ${({ theme, color = 'black' }) => colorStyles[color](theme)}

    ${({ theme, isActive }) =>
      isActive &&
      css`
        ${theme.typography.body2.semibold};
      `}
  }
`;
