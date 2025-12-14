import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { DEFAULT_DAILY_QUESTION } from '@/constants/common';
import useGetDailyQuestionsQuery from '@/hooks/api/daily/useGetDailyQuestions';
import { useAlertModalStore } from '@/stores/useModalStore';
import { DailyQuestionCardProps, CommunityWriteFormData } from '@/types/communityWrite';

interface ExistingPost {
  daily?: {
    question: string;
    answer: string;
  } | null;
  category: {
    categoryId: number;
  };
  author?: {
    isAnonymous?: boolean;
  };
}

interface DailyData {
  answer?: string;
  question?: string;
  assignedQuestionId?: number;
}

export interface UseDailyLogicProps {
  isDaily: boolean;
  isEditMode: boolean;
  isDailyCategory: boolean;
  existingPost?: ExistingPost;
  setValue: UseFormSetValue<CommunityWriteFormData>;
  updateUrlType: (type: 'post' | 'daily') => void;
  dailyQuestionId?: string | null;
  answerDate?: string | null;
}

export interface UseDailyLogicReturn {
  dailyData: DailyData | undefined;
  isDailyLoading: boolean;
  showAnonymous: boolean;
  isAnonymousDisabled: boolean;
  dailyQuestionProps: DailyQuestionCardProps | null;
  showDailyAlert: () => void;
  handleDailySelected: () => void;
}

export const useDailyLogic = ({
  isDaily,
  isEditMode,
  isDailyCategory,
  existingPost,
  setValue,
  updateUrlType,
  dailyQuestionId,
  answerDate,
}: UseDailyLogicProps): UseDailyLogicReturn => {
  const router = useRouter();
  const questionId = dailyQuestionId ? Number(dailyQuestionId) : undefined;
  const { data: dailyData, isLoading: isDailyLoading } = useGetDailyQuestionsQuery(questionId, answerDate ?? undefined);
  const { open: openAlert } = useAlertModalStore();

  const showDailyAlert = () => {
    openAlert('alert', {
      message: '오늘의 데일리에 답해주세요!',
      type: 'confirm',
      confirmText: '답변하러 가기',
      cancelText: '마저 글쓰기',
      onConfirm: () => {
        router.push('/daily');
      },
      onCancel: () => {
        setValue('categoryId', [2]);
        updateUrlType('post');
      },
    });
  };

  const handleDailySelected = () => {
    if (isEditMode && existingPost?.daily) {
      setValue('title', existingPost.daily.question);
    } else {
      if (dailyData && !dailyData.answer) {
        showDailyAlert();
      }

      if (dailyData?.answer) {
        setValue('title', dailyData?.question ?? DEFAULT_DAILY_QUESTION);
      }
    }
  };

  useEffect(() => {
    if (!isDaily || isDailyLoading || !dailyData || isEditMode) return;

    if (!isDailyCategory) return;

    if (!dailyData.answer) {
      const timer = setTimeout(() => {
        setValue('categoryId', [2]);
        setValue('title', '');
        updateUrlType('post');
      }, 100);

      return () => clearTimeout(timer);
    }

    if (dailyData.question && dailyData.answer) {
      setValue('title', dailyData.question);
    }
  }, [isDaily, isDailyLoading, dailyData, isDailyCategory, setValue, updateUrlType, isEditMode]);

  const showAnonymous =
    (isEditMode && existingPost?.daily && isDailyCategory) || (!!dailyData?.answer && isDaily && isDailyCategory);

  const isAnonymousDisabled = isEditMode;

  const dailyQuestionProps = (() => {
    if (isEditMode && existingPost?.daily && isDailyCategory) {
      return {
        question: existingPost.daily.question,
        answer: existingPost.daily.answer,
        assignedQuestionId: 0,
      };
    }

    if (dailyData?.answer && isDaily) {
      return {
        question: dailyData?.question ?? DEFAULT_DAILY_QUESTION,
        answer: dailyData?.answer ?? '',
        assignedQuestionId: dailyData?.assignedQuestionId ?? 0,
      };
    }

    return null;
  })();

  return {
    dailyData,
    isDailyLoading,
    showAnonymous,
    isAnonymousDisabled,
    dailyQuestionProps,
    showDailyAlert,
    handleDailySelected,
  };
};
