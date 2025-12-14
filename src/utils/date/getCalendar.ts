/**
 * 'YYYY-MM' 형식의 문자열을 해당 월 1일의 Date 객체로 변환합니다.
 * @param monthStr "YYYY-MM" 형식의 문자열
 * @returns Date 객체
 */
export const monthToDate = (monthStr: string): Date => {
  const [year, month] = monthStr.split('-').map(Number);
  // 월은 0-based이므로 -1
  return new Date(year, month - 1);
};

/**
 * 'YYYY-MM-DD' 형식의 날짜 문자열에서 'DD' (일) 부분만 추출하여 앞의 0을 제거합니다.
 * @param dateString "YYYY-MM-DD" 형식의 날짜
 * @returns 일(day) 문자열 (예: "1", "10")
 */
export const getDateKey = (dateString: string): string => {
  return dateString.split('-')[2].replace(/^0+/, '');
};

/**
 * 주어진 날짜(기준 날짜)가 포함된 주의 날짜들을 'YYYY-MM-DD' 형식으로 반환합니다.
 * @param referenceDate 기준이 되는 Date 객체
 * @returns 7일의 날짜 문자열 배열
 */
export const getCalendarWeekDateStrings = (referenceDate: Date): string[] => {
  const dates: string[] = [];
  const startOfWeek = new Date(referenceDate);

  // 주의 시작일 (일요일)로 이동
  startOfWeek.setDate(referenceDate.getDate() - referenceDate.getDay());

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    dates.push(`${year}-${month}-${day}`);
  }

  return dates;
};

/**
 * 주어진 날짜가 포함된 월의 전체 날짜들을 'YYYY-MM-DD' 형식으로 반환합니다. (패딩 포함)
 * @param referenceDate 기준이 되는 Date 객체 (해당 월)
 * @returns 캘린더 그리드에 표시될 날짜 문자열 배열 (42개 또는 35개)
 */
export const getCalendarMonthDateStrings = (referenceDate: Date): string[] => {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();

  // 해당 월의 1일
  const firstDayOfMonth = new Date(year, month, 1);
  // 해당 월의 마지막 날
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const dates: string[] = [];

  // 1. 이전 달 패딩 (해당 월 1일의 요일만큼)
  const paddingDaysBefore = firstDayOfMonth.getDay(); // 0(일)~6(토)
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(firstDayOfMonth.getDate() - paddingDaysBefore);

  // 표시할 총 일수 (최대 6주 * 7일 = 42일)
  const totalDaysToShow = 42;

  for (let i = 0; i < totalDaysToShow; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const dateYear = currentDate.getFullYear();
    const dateMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dateDay = String(currentDate.getDate()).padStart(2, '0');

    // 해당 월의 날짜를 초과하면 루프 종료 (35일 또는 42일로 맞추기 위해 42번 반복을 유지)
    dates.push(`${dateYear}-${dateMonth}-${dateDay}`);

    // 마지막 날짜를 초과했고, 그 날이 토요일(6)이며 총 42칸을 채우는 시점이 아니라면
    // 캘린더 그리드 레이아웃 유지를 위해 42개까지 채우도록 설계했습니다.
  }

  return dates;
};
