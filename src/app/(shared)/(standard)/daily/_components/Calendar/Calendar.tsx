'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

import ArrowRight from '@/assets/icons/arrowright.svg';
import ChevronDown from '@/assets/icons/chevrondown.svg';
import ChevronLeft from '@/assets/icons/chevronleft.svg';
import ChevronRight from '@/assets/icons/chevronright.svg';
import ChevronUp from '@/assets/icons/chevronup.svg';
import SolidButton from '@/components/atoms/SolidButton/SolidButton';
import { WEEK_DAYS } from '@/constants/common';
import { useAuthStore } from '@/stores/useAuthStore';
import { useMediumModalStore } from '@/stores/useModalStore2';
import { StreakMonthData } from '@/types/streak';
import {
  getCalendarMonthDateStrings,
  getCalendarWeekDateStrings,
  getDateKey,
  monthToDate,
} from '@/utils/date/getCalendar';

import * as S from './Calendar.styled';
import DateCell from './DateCell/DataCell';
import FirstAnswerButton from './FirstAnswerButton/FirstAnswerButton';

interface CalendarProps {
  streakData: StreakMonthData[];
  hasAnswered: boolean;
  startMonth: string; // "YYYY-MM" 형식의 시작 월
}

export default function Calendar({ streakData, hasAnswered, startMonth }: CalendarProps) {
  const router = useRouter();
  const { open: mediumStoreOpen, close: mediumStoreClose } = useMediumModalStore();

  const isUnauth = useAuthStore((s) => s.isUnauth());
  const isYearly = useAuthStore((s) => s.isYearly);

  const today = new Date();
  const startMonthDate = useMemo(() => monthToDate(startMonth), [startMonth]);

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1); // 1-based

  const [isMonthly, setIsMonthly] = useState(false);
  const [isFirstAnswer, setIsFirstAnswer] = useState(false);
  const prevHasAnsweredRef = useRef<boolean>(hasAnswered);

  // 답변된 날짜를 빠르게 찾기 위한 Set 생성
  const answeredDatesSet = useMemo(() => {
    const allAnsweredDates = streakData.flatMap((item) => item.dates);
    return new Set(allAnsweredDates);
  }, [streakData]);

  // 현재 표시 월을 기준으로 캘린더에 표시할 날짜 배열 계산
  const dates = useMemo(() => {
    const targetDate = new Date(currentYear, currentMonth - 1);
    if (isMonthly) {
      // 해당 월의 전체 날짜 배열 (패딩 포함)
      return getCalendarMonthDateStrings(targetDate);
    }

    // 현재 월인 경우 오늘이 포함된 주, 다른 월은 해당 월 1일이 포함된 주
    const referenceDate =
      currentYear === today.getFullYear() && currentMonth === today.getMonth() + 1 ? today : targetDate;
    return getCalendarWeekDateStrings(referenceDate);
  }, [currentYear, currentMonth, isMonthly, today]);

  const openSubscriptionAlert = useCallback(() => {
    mediumStoreOpen('alert', {
      title: '연간 구독이 필요해요',
      description: '월별 이동 기능은 연간 구독자에게 제공돼요.',
      buttonColor: 'primary',
      button: {
        label: '구독 플랜 보러가기',
        onClick: () => {
          mediumStoreClose();
          router.push('/subscription');
        },
      },
    });
  }, [open, close, router]);

  const goToNextMonth = useCallback(() => {
    // 연간 구독자가 아니면 모달을 띄우고 종료
    if (!isYearly()) {
      openSubscriptionAlert();
      return;
    }

    setCurrentMonth((prevMonth) => {
      if (prevMonth === 12) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 1;
      }
      return prevMonth + 1;
    });
  }, [isYearly, openSubscriptionAlert]);

  const goToPrevMonth = useCallback(() => {
    // 연간 구독자가 아니면 모달을 띄우고 종료
    if (!isYearly()) {
      openSubscriptionAlert();
      return;
    }

    setCurrentMonth((prevMonth) => {
      if (prevMonth === 1) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 12;
      }
      return prevMonth - 1;
    });
  }, [isYearly, openSubscriptionAlert]);

  // 이전 달 이동 버튼 비활성화 여부 확인
  const isAtStartMonth = useMemo(() => {
    const currentCalendarDate = new Date(currentYear, currentMonth - 1);
    // 현재 표시 월이 시작 월보다 이전일 수 없으므로, 같은지 여부만 확인
    return (
      currentCalendarDate.getFullYear() === startMonthDate.getFullYear() &&
      currentCalendarDate.getMonth() === startMonthDate.getMonth()
    );
  }, [currentYear, currentMonth, startMonthDate]);

  // 다음 달 이동 버튼 비활성화 여부 확인
  const isAtCurrentMonth = useMemo(() => {
    return currentYear === today.getFullYear() && currentMonth === today.getMonth() + 1;
  }, [currentYear, currentMonth, today]);

  const handleGoToReport = () => {
    if (isUnauth) {
      open('login');
      return;
    }
    router.push('/mypage/activity');
  };

  useEffect(() => {
    if (!prevHasAnsweredRef.current && hasAnswered) {
      setIsFirstAnswer(true);
    }
    prevHasAnsweredRef.current = hasAnswered;
  }, [hasAnswered]);

  return (
    <S.CalendarCard>
      <S.CalendarContentWrapper>
        <S.Title>내 물방울 기록</S.Title>
        <S.CalendarWrapper>
          <S.Calendar>
            <S.MonthSelector>
              <S.MonthArrow
                onClick={goToPrevMonth}
                // 무료 사용자라면 이동 제한 로직은 화살표 버튼의 disabled와 별도로 작동합니다.
                disabled={isAtStartMonth}
              >
                <ChevronLeft />
              </S.MonthArrow>

              <S.Month>
                {currentYear}년 {currentMonth}월
                {/* 주/월 토글도 무료 사용자에게 제한을 둘 수 있습니다. (필요하다면 추가) */}
                <S.BreadcrumbChevron onClick={() => setIsMonthly((prev) => !prev)}>
                  {isMonthly ? <ChevronUp /> : <ChevronDown />}
                </S.BreadcrumbChevron>
              </S.Month>

              <S.MonthArrow
                onClick={goToNextMonth}
                disabled={isAtCurrentMonth}
              >
                <ChevronRight />
              </S.MonthArrow>
            </S.MonthSelector>

            <S.Grid>
              {WEEK_DAYS.map((day) => (
                <S.WeekDay key={day}>{day}</S.WeekDay>
              ))}
              {dates.map((date) => (
                <DateCell
                  key={date}
                  date={getDateKey(date)} // DateCell에 일(day)만 표시
                  isAnswered={answeredDatesSet.has(date)} // 답변 여부 확인
                />
              ))}
            </S.Grid>
          </S.Calendar>
        </S.CalendarWrapper>
        {isFirstAnswer ? (
          <FirstAnswerButton onClick={handleGoToReport} />
        ) : (
          <SolidButton
            label='리포트 보러가기'
            size='md'
            interactionVariant='normal'
            onClick={handleGoToReport}
            fillContainer
            iconRight={<ArrowRight />}
          />
        )}
      </S.CalendarContentWrapper>
    </S.CalendarCard>
  );
}
