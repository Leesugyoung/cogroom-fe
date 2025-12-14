'use client';

import styled from '@emotion/styled';

export const CalendarCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;

  padding: 3rem 1.5rem 5rem 1.5rem;

  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.semantic.background.elevated.normal};
`;

export const CalendarContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 55rem;
  width: 100%;
  margin: 0 auto;

  gap: 1.6rem;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typography.headline1.semibold}
  color: ${({ theme }) => theme.semantic.label.normal};
`;

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;

  max-width: 55rem;
  width: 100%;
  margin: 0 auto;
  padding: 3rem;

  background-color: ${({ theme }) => theme.semantic.static.white};
  border-radius: 1.2rem;
`;

export const MonthSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  ${({ theme }) => theme.typography.body1.semibold}
  color: ${({ theme }) => theme.semantic.label.normal};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.8rem;
`;

export const WeekDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.typography.label1.medium}
  color: ${({ theme }) => theme.semantic.label.assistive};
`;

export const BreadcrumbChevron = styled.div`
  display: flex;
  align-items: center;

  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const MonthArrow = styled.button<{ disabled: boolean }>`
  display: flex;
  align-items: center;

  width: 16px;
  height: 16px;
  cursor: pointer;
`;
