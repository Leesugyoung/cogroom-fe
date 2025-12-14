import { ApiResponse } from '@/types/api';

export interface StreakMonthData {
  month: string; // "YYYY-MM" 형식
  dates: string[]; // "YYYY-MM-DD" 형식의 답변한 날짜
}

export interface StreakCalendarResponse extends ApiResponse {
  result: {
    streakByMonth: StreakMonthData[];
    startMonth: string;
  };
}

export interface StreakDaysResponse extends ApiResponse {
  result: {
    dailyStreak: number;
  };
}
