import { useRouter } from 'next/navigation';

import TextButton from '@/components/atoms/TextButton/TextButton';
import { PaymentHistory } from '@/types/payment';
import { formatDayAsDotYYYYMMDD, formatTimeAsHHmm } from '@/utils/date/formatDay';

import * as S from './PaymentRow.styled';

interface PaymentRowProps {
  payment: PaymentHistory;
}

export default function PaymentRow({ payment }: PaymentRowProps) {
  const router = useRouter();

  const handleDetailClick = () => {
    router.push(`/mypage/purchase/payments/${payment.id}`);
  };

  const getStatusText = () => {
    if (payment.status === 'COMPLETED') return '정상';
    if (payment.status === 'CANCELED') return '취소';
    if (payment.status === 'PENDING') return '보류';
    return '실패';
  };

  const isError = payment.status === 'CANCELED' || payment.status === 'FAILED' || payment.status === 'PENDING';

  return (
    <S.Row>
      <S.Cell>{payment.plan}</S.Cell>
      <S.Cell>
        <S.StatusText isError={isError}>{getStatusText()}</S.StatusText>
      </S.Cell>
      <S.Cell>{payment.amount?.toLocaleString() ?? '0'} KRW</S.Cell>
      <S.Cell>
        {formatDayAsDotYYYYMMDD(payment.paymentDate)} {formatTimeAsHHmm(payment.paymentDate)}
      </S.Cell>
      <S.Cell>
        <S.Box />
        <TextButton
          size='sm'
          color='assistive'
          label='상세 보기'
          interactionVariant='normal'
          onClick={handleDetailClick}
        />
      </S.Cell>
    </S.Row>
  );
}
