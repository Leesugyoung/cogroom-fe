'use client';

import { useRouter } from 'next/navigation';

import Checkbox from '@/components/atoms/Checkbox/Checkbox';
import OutlinedButton from '@/components/atoms/OutlinedButton/OutlinedButton';
import { Coupon } from '@/types/admin';
import { formatDayAsDotYYYYMMDD, formatDateTimeAsDotYYYYMMDDHHMM } from '@/utils/date/formatDay';

import * as S from './CouponListRow.styled';

interface CouponListRowProps {
  coupon: Coupon;
  checked: boolean;
  onCheckToggle: (checked: boolean) => void;
}

export default function CouponListRow({ coupon, checked, onCheckToggle }: CouponListRowProps) {
  const router = useRouter();
  const getPlanLabel = (planId: number) => {
    switch (planId) {
      case 1:
        return '월/프리미엄';
      case 2:
        return '연/프리미엄';
      default:
        return `플랜 ${planId}`;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ING':
        return '발급중';
      case 'DONE':
        return '발급종료';
      case 'PAUSE':
        return '일시정지';
      default:
        return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'TRIAL':
        return '체험형';
      case 'PARTNER':
        return '제휴형';
      default:
        return type;
    }
  };

  const handleEditClick = () => {
    const editData = {
      ...coupon,
      maxIssuedCount: coupon.issuedCount,
      startDate: coupon.createdAt,
      endDate: coupon.endedDate,
    };

    const searchParams = new URLSearchParams();
    Object.entries(editData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        searchParams.append(key, String(value));
      }
    });

    router.push(`/admin/payments/coupons/create?${searchParams.toString()}`);
  };

  const handleManageClick = () => {
    router.push(`/admin/payments/coupons/${coupon.couponId}/history`);
  };

  return (
    <S.Row>
      <S.CheckboxCell>
        <Checkbox
          size='nm'
          isChecked={checked}
          onToggle={onCheckToggle}
          interactionVariant='normal'
        />
      </S.CheckboxCell>

      <S.Cell>
        <S.CellText>{coupon.couponName}</S.CellText>
      </S.Cell>

      <S.Cell>
        <S.CellText>{formatDayAsDotYYYYMMDD(coupon.createdAt)}</S.CellText>
      </S.Cell>

      <S.Cell>
        <S.CellText>{coupon.createdBy}</S.CellText>
      </S.Cell>

      <S.Cell>
        <S.CellText>{getTypeLabel(coupon.couponType)}</S.CellText>
      </S.Cell>

      <S.Cell>
        <S.CellText>{getPlanLabel(coupon.applicablePlan)}</S.CellText>
      </S.Cell>

      <S.Cell>
        <S.CellText>{formatDateTimeAsDotYYYYMMDDHHMM(coupon.endedDate)} 까지</S.CellText>
      </S.Cell>

      <S.Cell>
        <S.CellText>{coupon.issuedCount.toLocaleString()}</S.CellText>
      </S.Cell>

      <S.Cell>{getStatusLabel(coupon.status)}</S.Cell>

      <S.Cell>
        <OutlinedButton
          size='sm'
          label={'관리'}
          color='assistive'
          interactionVariant='normal'
          onClick={handleManageClick}
        />
      </S.Cell>

      <S.Cell>
        <OutlinedButton
          size='sm'
          label={'수정'}
          color='assistive'
          interactionVariant='normal'
          onClick={handleEditClick}
        />
      </S.Cell>
    </S.Row>
  );
}
