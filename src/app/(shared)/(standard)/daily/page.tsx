'use client';

import { useEffect } from 'react';

import Upload from '@/assets/icons/upload.svg';
import OutlinedButton from '@/components/atoms/OutlinedButton/OutlinedButton';
import Loading from '@/components/organisms/Loading/Loading';
import Question from '@/components/organisms/Question/Question';
import { DAILY_FEEDBACK_FORM_URL, DEFAULT_DAILY_QUESTION } from '@/constants/common';
import { DEFAULT_DAILY_BANNER, STREAK_REVIVED_IMAGE } from '@/constants/image';
import useGetDailyHasAnsweredQuery from '@/hooks/api/daily/useGetDailyHasAnswered';
import useGetDailyQuestionsQuery from '@/hooks/api/daily/useGetDailyQuestions';
import useGetUserSummary from '@/hooks/api/member/useGetUserSummary';
import useGetStreakCalendarQuery from '@/hooks/api/streak/useGetStreakCalendar';
import useGetStreakDaysQuery from '@/hooks/api/streak/useGetStreakDays';
import { useAuthStore } from '@/stores/useAuthStore';
import { useAppModalStore } from '@/stores/useModalStore';
import { useLargeModalStore } from '@/stores/useModalStore2';
import { getCookie, getMidnightExpiration, setCookie } from '@/utils/cookie';

import Calendar from './_components/Calendar/Calendar';
import Streak from './_components/Streak/Streak';
import * as S from './page.styled';

export default function Daily() {
  const { open } = useAppModalStore();
  const isUnauth = useAuthStore((s) => s.isUnauth());
  const isUnknown = useAuthStore((s) => s.isUnknown());
  const { open: largeStoreOpen, close: largeStoreClose } = useLargeModalStore();

  const { data: dailyData, isLoading: isDailyLoading } = useGetDailyQuestionsQuery();
  const { data: streakCalendarData, isLoading: isCalendarLoading } = useGetStreakCalendarQuery();
  const { data: streakDaysData, isLoading: isDaysLoading } = useGetStreakDaysQuery();
  const { data: hasAnsweredData, isLoading: isAnsweredLoading } = useGetDailyHasAnsweredQuery();
  const { data: userSummary } = useGetUserSummary();

  useEffect(() => {
    // 로그인 상태 확인 및 isRevived 체크
    if (isUnauth || !userSummary?.isRevived) return;

    // 쿠키 확인 (오늘 이미 봤는지)
    const hasSeenModal = getCookie('revived_modal_seen');

    if (!hasSeenModal) {
      largeStoreOpen('info', {
        title: '스트릭 부활권이 적용됐어요!',
        description: `${streakDaysData?.result.dailyStreak}일째 기록이 이어지는 중이에요`,
        imageSrc: STREAK_REVIVED_IMAGE,
        primaryButton: {
          label: '확인',
          onClick: () => {
            // 확인 시 쿠키 저장하여 오늘 다시 뜨지 않게 함
            setCookie('revived_modal_seen', 'true', getMidnightExpiration());
            largeStoreClose();
          },
        },
        onBeforeClose: () => {
          // 모달을 닫기 전 쿠키 저장하여 오늘 다시 뜨지 않게 함
          setCookie('revived_modal_seen', 'true', getMidnightExpiration());
        },
      });
    }
  }, [isUnauth, userSummary]);

  const isLoading = isDailyLoading || isCalendarLoading || isDaysLoading || isAnsweredLoading;

  if (isUnknown || isLoading) return <Loading />;

  const handleShare = () => {
    if (isUnauth) {
      open('login');
      return;
    }
    open('dailyShare', { dailyStreak: streakDaysData?.result.dailyStreak ?? 0 });
  };

  return (
    <>
      <S.DailyContainer>
        <Streak dailyStreak={streakDaysData?.result.dailyStreak ?? 0} />
        <Question
          assignedQuestionId={dailyData?.assignedQuestionId ?? 0}
          question={dailyData?.question ?? DEFAULT_DAILY_QUESTION}
          answer={dailyData?.answer ?? ''}
          hasAnswered={hasAnsweredData?.hasAnswered ?? false}
        />
        <Calendar
          streakData={streakCalendarData?.streakByMonth ?? []}
          hasAnswered={hasAnsweredData?.hasAnswered ?? false}
          startMonth='2025-11'
        />
      </S.DailyContainer>
      <OutlinedButton
        label='공유하기'
        size='sm'
        color='secondary'
        iconRight={<Upload />}
        interactionVariant='normal'
        onClick={handleShare}
      />

      <S.BannerWrapper>
        <a
          href={DAILY_FEEDBACK_FORM_URL}
          target='_blank'
          rel='noopener noreferrer'
        >
          <S.BannerImage
            src={DEFAULT_DAILY_BANNER}
            alt='코그룸 피드백 참여하기 배너'
            width={798}
            height={244}
            priority
          />
        </a>
      </S.BannerWrapper>
    </>
  );
}
