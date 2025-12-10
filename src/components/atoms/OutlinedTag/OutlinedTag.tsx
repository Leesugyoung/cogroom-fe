'use client';

import * as S from './OutlinedTag.styled';
import type { OutlinedTagStyleProps } from './OutlinedTag.styled';

interface OutlinedTagProps extends OutlinedTagStyleProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  stopPropagation?: boolean;
}

export default function OutlinedTag({ label, color, onClick, stopPropagation = false }: OutlinedTagProps) {
  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!onClick) return;
    if (stopPropagation) e.stopPropagation();
    onClick(e);
  };

  return (
    <S.OutlinedTag
      color={color}
      onClick={onClick ? handleClick : undefined}
    >
      {label}
    </S.OutlinedTag>
  );
}
