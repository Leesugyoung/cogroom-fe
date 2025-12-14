import Image from 'next/image';

import { DEFAULT_WATERDROP } from '@/constants/image';

import * as S from './DataCell.styled';

interface DateCellProps {
  date: string;
  isAnswered: boolean;
}

export default function DateCell({ date, isAnswered }: DateCellProps) {
  return (
    <S.DateCell isAnswered={isAnswered}>
      {isAnswered ? (
        <Image
          src={DEFAULT_WATERDROP}
          alt='waterdrop'
          width={13}
          height={16}
        />
      ) : (
        date
      )}
    </S.DateCell>
  );
}
