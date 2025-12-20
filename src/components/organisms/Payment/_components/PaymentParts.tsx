'use client';

import * as S from './PaymentParts.styled';

export const PaymentParts = ({ label, value }: { label: string; value: string | number }) => {
  return (
    <S.Partscontainer>
      <S.PartLabel>{label} : </S.PartLabel>
      <S.PartValue>{value}</S.PartValue>
    </S.Partscontainer>
  );
};
