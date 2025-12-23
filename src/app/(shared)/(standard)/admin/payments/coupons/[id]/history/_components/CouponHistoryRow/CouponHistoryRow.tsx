'use client';

import { formatDateTimeAsDotYYYYMMDDHHMM } from '@/utils/date/formatDay';

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
  couponHistoryStatus: string;
}

interface CouponHistoryRowProps {
  item: CouponHistoryItem;
}

const splitDateTime = (dateTimeString: string) => {
  if (dateTimeString === '-') return { date: '-', time: '' };

  const formatted = formatDateTimeAsDotYYYYMMDDHHMM(dateTimeString);
  if (!formatted) return { date: '-', time: '' };

  const parts = formatted.split(' ');
  return {
    date: parts[0] || '',
    time: parts[1] || '',
  };
};

const getCouponTypeLabel = (couponType: string) => {
  switch (couponType) {
    case 'TRIAL':
      return '체험형';
    case 'PARTNER':
      return '제휴형';
    default:
      return couponType;
  }
};

export default function CouponHistoryRow({ item }: CouponHistoryRowProps) {
  const issuedDateTime = splitDateTime(item.issuedAt);
  const usedDateTime = splitDateTime(item.usedAt);
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
        <S.CellText>
          <div>{issuedDateTime.date}</div>
          <div>{issuedDateTime.time}</div>
        </S.CellText>
      </S.Cell>

      <S.Cell>
        <S.CellText>{getCouponTypeLabel(item.couponType)}</S.CellText>
      </S.Cell>

      <S.Cell>
        <S.CellText>
          {item.isUsed ? '사용완료' : item.couponHistoryStatus === 'RESERVED' ? '사용대기' : '미사용'}
        </S.CellText>
      </S.Cell>

      <S.Cell>
        <S.CellText>
          <div>{usedDateTime.date}</div>
          {usedDateTime.time && <div>{usedDateTime.time}</div>}
        </S.CellText>
      </S.Cell>
    </S.Row>
  );
}
