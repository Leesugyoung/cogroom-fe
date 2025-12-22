import { useMemo, useState } from 'react';

import Message from '@/assets/icons/message-circle-x.svg';
import InfiniteScrollSentinel from '@/components/atoms/InfiniteScrollSentinel/InfiniteScrollSentinel';
import OutlinedTag from '@/components/atoms/OutlinedTag/OutlinedTag';
import SolidTag from '@/components/atoms/SolidTag/SolidTag';
import EmptyState from '@/components/organisms/EmptyState/EmptyState';
import Loading from '@/components/organisms/Loading/Loading';
import useGetCouponList from '@/hooks/api/member/useGetCouponList';
import useScroll from '@/hooks/useScroll';
import { useLargeModalStore } from '@/stores/useModalStore2';
import { Coupon } from '@/types/coupon';
import { formatDateTimeAsDotYYYYMMDDHHMM, formatDayAsYYYYMMDD } from '@/utils/date/formatDay';

import * as S from './MobileCouponList.styled';

interface MobileCouponListProps {}

export const MobileCouponList = ({}: MobileCouponListProps) => {
  const [allCoupons, setAllCoupons] = useState<Coupon[]>([]);
  const [currentCursor, setCurrentCursor] = useState<number | undefined>(undefined);
  const pageSize = 10;

  const { open: largeStoreOpen } = useLargeModalStore();

  const { data: couponData, isLoading } = useGetCouponList({
    cursor: currentCursor,
    size: pageSize,
  });

  useMemo(() => {
    if (couponData?.data) {
      if (currentCursor === undefined) {
        setAllCoupons(couponData.data);
      } else {
        setAllCoupons((prev) => [...prev, ...couponData.data]);
      }
    }
  }, [couponData]);

  const hasNextPage = couponData ? !couponData.last : false;

  const fetchNextPage = async () => {
    return new Promise<void>((resolve) => {
      if (couponData?.nextCursor) {
        setCurrentCursor(couponData.nextCursor);
      }
      resolve();
    });
  };

  const { observerRef } = useScroll({
    nextPage: hasNextPage,
    fetchNext: fetchNextPage,
  });

  const handleApplyCoupon = (coupon: Coupon) => {
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

  const renderStatusTag = (status: string) => {
    if (status === 'RESERVED') {
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

  if (isLoading) return <Loading />;

  if (allCoupons.length === 0) {
    return (
      <EmptyState
        icon={<Message />}
        description='사용 가능한 쿠폰이 없어요'
      />
    );
  }

  return (
    <S.MobileCouponContainer>
      {allCoupons.map((coupon) => (
        <S.CouponItemWrpaper
          key={coupon.couponId}
          onClick={() => handleApplyCoupon(coupon)}
        >
          <S.CouponInfoBox>
            <S.CouponNameRow>
              <S.CouponName>{coupon.couponName}</S.CouponName>
              <S.TagContainer>
                {renderStatusTag(coupon.status)}
                <OutlinedTag
                  label='사용가능'
                  color='blue'
                />
              </S.TagContainer>
            </S.CouponNameRow>
            <S.CouponCode>쿠폰코드 : {coupon.couponCode}</S.CouponCode>
          </S.CouponInfoBox>

          <S.CouponDayAndPriceBox>
            <S.CouponDate>{formatDateTimeAsDotYYYYMMDDHHMM(coupon.endDate)} 까지</S.CouponDate>
            <S.CouponPrice>
              {coupon.discountType === 'PERCENT'
                ? `${coupon.discountValue}% 할인`
                : `- ${coupon.discountValue.toLocaleString()}원`}
            </S.CouponPrice>
          </S.CouponDayAndPriceBox>
        </S.CouponItemWrpaper>
      ))}

      <InfiniteScrollSentinel
        observerRef={observerRef}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isLoading}
      />
    </S.MobileCouponContainer>
  );
};
