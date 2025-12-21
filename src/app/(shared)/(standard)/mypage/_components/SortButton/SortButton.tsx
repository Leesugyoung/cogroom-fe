'use client';

import ChangeIcon from '@/assets/icons/change.svg';
import { SortType } from '@/types/member';

import * as S from './SortButton.styled';

interface SortButtonProps {
  sort: SortType;
  onClick: () => void;
}

export default function SortButton({ sort, onClick }: SortButtonProps) {
  const getSortLabel = () => {
    switch (sort) {
      case 'latest':
        return '최신순';
      case 'oldest':
        return '오래된순';
      case 'highest':
        return '높은 금액순';
      case 'lowest':
        return '낮은 금액순';
      default:
        return '최신순';
    }
  };

  return (
    <S.SortButton onClick={onClick}>
      {getSortLabel()}
      <S.Icon>
        <ChangeIcon />
      </S.Icon>
    </S.SortButton>
  );
}
