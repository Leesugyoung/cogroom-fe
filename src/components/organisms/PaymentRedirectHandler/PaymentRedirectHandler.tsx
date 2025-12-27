'use client';

import { usePathname } from 'next/navigation';

import { usePaymentResume } from '@/hooks/api/payment/usePaymentResume';

export const PaymentRedirectHandler = () => {
  const pathname = usePathname();

  // 현재 URL이 /mypage로 시작하는지 체크하여 isFromMyPage 전달
  const isFromMyPage = pathname.startsWith('/mypage');

  usePaymentResume({ isFromMyPage });

  return null;
};
