import Link from 'next/link';

import Skeleton from '@/components/skeleton/Skeleton/Skeleton';
import { useAuthStore } from '@/stores/useAuthStore';

import * as S from './NavItem.styled';
import type { NavItemStyleProps } from './NavItem.styled';

interface NavItemProps extends NavItemStyleProps {
  label: string;
  href: string;
}

export default function NavItem({ label, href, color, isActive }: NavItemProps) {
  const isUnknown = useAuthStore((s) => s.isUnknown());

  if (isUnknown) {
    return (
      <Skeleton
        width='4rem'
        height='2.3rem'
        borderRadius='0.6rem'
      />
    );
  }

  return (
    <S.NavItem
      color={color}
      isActive={isActive}
    >
      <Link href={href}>{label}</Link>
    </S.NavItem>
  );
}
