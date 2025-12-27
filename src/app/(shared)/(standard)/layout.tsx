import { PaymentRedirectHandler } from '@/components/organisms/PaymentRedirectHandler/PaymentRedirectHandler';

import * as S from './layout.styled';

export default function StandardLayout({ children }: { children: React.ReactNode }) {
  return (
    <S.StandardLayout>
      <PaymentRedirectHandler />
      {children}
    </S.StandardLayout>
  );
}
