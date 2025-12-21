'use client';

import * as S from './CouponHistoryRow.styled';

interface CouponHistoryItem {
  id: number;
  nickname: string;
  memberId: number;
  userId: string;
  issuedAt: string;
  couponType: string;
  isUsed: boolean;
  usedAt: string;
}

interface CouponHistoryRowProps {
  item: CouponHistoryItem;
}

export default function CouponHistoryRow({ item }: CouponHistoryRowProps) {
  return (
    <S.Row>
      <S.Cell>
        <S.CellText>
          {item.nickname}({item.memberId})
        </S.CellText>
      </S.Cell>

      <S.Cell>
        <S.CellText>{item.userId}</S.CellText>
      </S.Cell>

      <S.Cell>
        <S.CellText>{item.issuedAt}</S.CellText>
      </S.Cell>

      <S.Cell>
        <S.CellText>{item.couponType}</S.CellText>
      </S.Cell>

      <S.Cell>
        <S.CellText>{item.isUsed ? '사용완료' : '미사용'}</S.CellText>
      </S.Cell>

      <S.Cell>
        <S.CellText>{item.usedAt}</S.CellText>
      </S.Cell>
    </S.Row>
  );
}
