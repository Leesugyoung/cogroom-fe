import { useQuery } from '@tanstack/react-query';

import { dailyApi } from '@/api/dailyApis';
import { DAILY_QUERY_KEYS } from '@/constants/queryKeys';
import { useAuthStore } from '@/stores/useAuthStore';

export default function useGetDailyQuestionsQuery(questionId?: number, answerDate?: string) {
  const isAuth = useAuthStore((s) => s.isAuth());

  return useQuery({
    queryKey: [...DAILY_QUERY_KEYS.DAILY],
    queryFn: () => dailyApi.getDailyQuestions(undefined, { assignedQuestionId: questionId, answerDate }),
    enabled: isAuth,
  });
}
