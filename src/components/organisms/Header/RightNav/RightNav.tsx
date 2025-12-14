'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Bell from '@/assets/icons/bell.svg';
import Search from '@/assets/icons/search.svg';
import AvatarPerson from '@/components/atoms/AvatarPerson/AvatarPerson';
import IconButton from '@/components/atoms/IconButton/IconButton';
import OutlinedButton from '@/components/atoms/OutlinedButton/OutlinedButton';
import Skeleton from '@/components/skeleton/Skeleton/Skeleton';
import { ROLE_LABELS } from '@/constants/common';
import useGetUserSummary from '@/hooks/api/member/useGetUserSummary';
import { useAuthStore } from '@/stores/useAuthStore';
import { useAppModalStore } from '@/stores/useModalStore';

import * as S from './RightNav.styled';

export default function RightNav() {
  const router = useRouter();
  const { open } = useAppModalStore();

  const { isSuccess, isError, data } = useGetUserSummary();

  const isUnauth = useAuthStore((s) => s.isUnauth());
  const isUnknown = useAuthStore((s) => s.isUnknown());
  const role = useAuthStore((s) => s.role);
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const setUnauthenticated = useAuthStore((s) => s.setUnauthenticated);

  useEffect(() => {
    if (isSuccess && data?.memberRole && data?.planId !== undefined && data?.planId !== null) {
      setAuthenticated(data.memberRole, data.planId);
    } else if (isError) {
      setUnauthenticated();
    }
  }, [isSuccess, isError, data?.memberRole, data?.planId, role, setAuthenticated, setUnauthenticated]);

  const roleLabel = role !== null ? ROLE_LABELS[role] : undefined;

  if (isUnknown) {
    return (
      <S.SkeletonContainer>
        <Skeleton
          width='4rem'
          height='4rem'
          borderRadius='0.6rem'
        />
        <Skeleton
          width='4rem'
          height='4rem'
          borderRadius='0.6rem'
        />
        <Skeleton
          width='4rem'
          height='4rem'
          borderRadius='0.6rem'
        />
      </S.SkeletonContainer>
    );
  }

  if (isUnauth) {
    return (
      <S.RightNav>
        <IconButton
          size='4rem'
          variant='normal'
          interactionVariant='normal'
        >
          <Search />
        </IconButton>
        <OutlinedButton
          label='코그룸 시작하기'
          size='sm'
          color='primary'
          interactionVariant='normal'
          onClick={() => open('login')}
        />
      </S.RightNav>
    );
  }

  return (
    <S.RightNav>
      <IconButton
        size='4rem'
        variant='normal'
        interactionVariant='normal'
      >
        <Search />
      </IconButton>

      <S.NavLogin>
        <IconButton
          size='4rem'
          variant='normal'
          interactionVariant='normal'
        >
          <Bell />
        </IconButton>

        {role !== 'USER' && roleLabel ? (
          <S.UserWrapper
            memberRole={role || undefined}
            onClick={() => router.push('/mypage')}
          >
            <S.UserIconWrapper>
              <AvatarPerson
                type='icon'
                size='fillContainer'
                src={data?.imageUrl}
              />
            </S.UserIconWrapper>
            {roleLabel}
          </S.UserWrapper>
        ) : (
          <AvatarPerson
            type='icon'
            size='fillContainer'
            src={data?.imageUrl}
            onClick={() => router.push('/mypage')}
          />
        )}
      </S.NavLogin>
    </S.RightNav>
  );
}
