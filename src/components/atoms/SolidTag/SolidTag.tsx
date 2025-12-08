'use client';

import * as S from './SolidTag.styled';
import type { SolidTagStyleProps } from './SolidTag.styled';

interface SolidTagProps extends SolidTagStyleProps {
  label: string;
  onClick?: () => void;
  stopPropagation?: boolean;
}

export default function SolidTag({ label, color, round, onClick, stopPropagation = false }: SolidTagProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (stopPropagation) e.stopPropagation();
    onClick();
  };

  return (
    <S.SolidTag
      color={color}
      round={round}
      hasClick={!!onClick}
      onClick={onClick ? handleClick : undefined}
    >
      {label}
    </S.SolidTag>
  );
}
