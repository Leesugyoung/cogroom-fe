import styled from '@emotion/styled';

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  padding: 2.4rem 3.2rem;

  border-bottom: 1px solid ${({ theme }) => theme.semantic.line.normal};

  &:last-child {
    border-bottom: none;
  }
`;

export const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

  text-align: center;
  padding: 0 0.5rem;

  ${({ theme }) => theme.typography.label2.regular};
  color: ${({ theme }) => theme.semantic.label.normal};
`;

export const CellText = styled.span`
  ${({ theme }) => theme.typography.label2.regular};
  color: ${({ theme }) => theme.semantic.label.normal};
`;
