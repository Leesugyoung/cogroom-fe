import OutlinedTag from '@/components/atoms/OutlinedTag/OutlinedTag';
import SolidTag from '@/components/atoms/SolidTag/SolidTag';
import { useLargeModalStore } from '@/stores/useModalStore2';
import { Coupon } from '@/types/coupon';
import { formatDayAsDotYYYYMMDD, formatDayAsYYYYMMDD, formatTimeAsHHmm } from '@/utils/date/formatDay';

import * as S from './CouponRow.styled';

interface CouponRowProps {
  coupon: Coupon;
}

export default function CouponRow({ coupon }: CouponRowProps) {
  const { open: largeStoreOpen } = useLargeModalStore();

  const handleApplyCoupon = () => {
    const formatDiscountValue = () => {
      if (coupon.discountType === 'PERCENT') {
        return `${coupon.discountValue}% 할인`;
      }
      return `${coupon.discountValue.toLocaleString()}원`;
    };

    largeStoreOpen('applyCoupon', {
      price: formatDiscountValue(),
      name: coupon.couponName,
      expiredDate: `사용기한 : ${formatDayAsYYYYMMDD(coupon.endDate)} 까지`,
      couponHistoryId: coupon.couponHistoryId,
    });
  };

  const renderLeftTag = () => {
    if (coupon.status === 'RESERVED') {
      return (
        <SolidTag
          label={'사용대기'}
          color={'blue'}
          round
        />
      );
    }
    return null;
  };

  return (
    <S.CouponRow>
      <S.CouponCell width='7rem'>{renderLeftTag()}</S.CouponCell>
      <S.CouponCell width='12rem'>{coupon.couponName}</S.CouponCell>
      <S.CouponCell width='12rem'>
        {coupon.discountType === 'PERCENT'
          ? `${coupon.discountValue}% 할인`
          : `-${coupon.discountValue.toLocaleString()}`}
      </S.CouponCell>
      <S.CouponCell width='12rem'>{coupon.couponCode}</S.CouponCell>
      <S.CouponCell width='14rem'>
        {formatDayAsDotYYYYMMDD(coupon.endDate)} {formatTimeAsHHmm(coupon.endDate)}까지
      </S.CouponCell>
      <S.CouponCell width='12rem'>
        <OutlinedTag
          label='사용가능'
          color='blue'
          onClick={() => handleApplyCoupon()}
        />
      </S.CouponCell>
    </S.CouponRow>
  );
}
