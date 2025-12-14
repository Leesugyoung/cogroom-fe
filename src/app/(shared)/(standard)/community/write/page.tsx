'use client';

import { FormProvider } from 'react-hook-form';

import SolidButton from '@/components/atoms/SolidButton/SolidButton';
import Breadcrumb from '@/components/molecules/Breadcrumb/Breadcrumb';
import AuthGuard from '@/components/organisms/AuthGuard/AuthGuard';
import { useCategoryLogic } from '@/hooks/communityWrite/useCategoryLogic';
import { useDailyLogic } from '@/hooks/communityWrite/useDailyLogic';
import { useEditMode } from '@/hooks/communityWrite/useEditMode';
import { usePostSubmission } from '@/hooks/communityWrite/usePostSubmission';
import { useWriteForm } from '@/hooks/communityWrite/useWriteForm';
import { useUrlSearchParams } from '@/hooks/queryParams/useUrlSearchParams';
import { useAuthStore } from '@/stores/useAuthStore';

import CategorySelector from './_components/CategorySelector/CategorySelector';
import DailyQuestionCard from './_components/DailyQuestionCard/DailyQuestionCard';
import PostEditor from './_components/PostEditor/PostEditor';
import TitleInput from './_components/TitleInput/TitleInput';
import WriteSkeleton from './_components/WriteSkeleton/WriteSkeleton';
import * as S from './page.styled';
import CommunityDescription from '../_components/CommunityDescription';

export default function CommunityWrite() {
  const { getSearchParam } = useUrlSearchParams();
  const type = getSearchParam('type') || 'post';
  const isDaily = type === 'daily';
  const dailyQuestionId = getSearchParam('id');
  const answerDate = getSearchParam('answerDate');

  const editMode = useEditMode({
    reset: () => {},
    updateUrlType: () => {},
  });

  const form = useWriteForm({
    defaultValues: editMode.getInitialValues(),
  });

  const watchedCategoryId = form.watch('categoryId');

  const category = useCategoryLogic({
    watchedCategoryId,
    setValue: form.setValue,
    onDailySelected: () => {},
  });

  const daily = useDailyLogic({
    isDaily,
    isEditMode: editMode.isEditMode,
    isDailyCategory: category.isDailyCategory,
    existingPost: editMode.existingPost,
    setValue: form.setValue,
    updateUrlType: category.updateUrlType,
    dailyQuestionId: dailyQuestionId,
    answerDate: answerDate,
  });

  const editModeWithUpdate = useEditMode({
    reset: form.reset,
    updateUrlType: category.updateUrlType,
  });

  const categoryWithDaily = useCategoryLogic({
    watchedCategoryId,
    setValue: form.setValue,
    onDailySelected: daily.handleDailySelected,
  });

  const submission = usePostSubmission({
    isEditMode: editModeWithUpdate.isEditMode,
    editPostId: editModeWithUpdate.editPostId,
    existingPost: editModeWithUpdate.existingPost,
    dailyData: daily.dailyData,
    isDaily,
    isDailyCategory: categoryWithDaily.isDailyCategory,
  });

  const isUnauth = useAuthStore((s) => s.isUnauth());
  const isUnknown = useAuthStore((s) => s.isUnknown());

  if (isUnauth) {
    return <AuthGuard />;
  }

  if (isUnknown || (editModeWithUpdate.isEditMode && editModeWithUpdate.isLoadingPost)) {
    return <WriteSkeleton />;
  }

  return (
    <S.Container>
      <S.MobileGuard>
        <Breadcrumb
          items={[
            { name: '홈', href: '/' },
            { name: '커뮤니티', href: '/community' },
          ]}
        />

        <CommunityDescription />
      </S.MobileGuard>

      <FormProvider {...form.methods}>
        <S.WriteForm onSubmit={form.methods.handleSubmit(submission.onSubmit)}>
          <CategorySelector
            options={categoryWithDaily.categoryOptions}
            error={form.errors.categoryId?.message}
            onChange={(value: number[]) => form.setValue('categoryId', value)}
            onCategoryChange={categoryWithDaily.handleCategoryChange}
            onAnonymousToggle={(checked: boolean) => form.setValue('isAnonymous', checked)}
            control={form.methods.control}
            isAnonymousDisabled={daily.isAnonymousDisabled}
            onSubmit={form.methods.handleSubmit(submission.onSubmit)}
            isSubmitDisabled={submission.isLoading}
            submitLabel={editModeWithUpdate.isEditMode ? '\uc218\uc815\ud558\uae30' : '\uc62c\ub9ac\uae30'}
          />

          <TitleInput
            control={form.methods.control}
            error={form.methods.formState.errors.title?.message}
          />

          {daily.dailyQuestionProps && <DailyQuestionCard {...daily.dailyQuestionProps} />}

          <PostEditor
            height={800}
            control={form.methods.control}
            onContentChange={(value: string) => form.setValue('content', value)}
          />

          <S.ButtonWrapper>
            <SolidButton
              type='submit'
              color='primary'
              size='sm'
              label={editModeWithUpdate.isEditMode ? '수정하기' : '올리기'}
              interactionVariant='normal'
              isDisabled={submission.isLoading}
            />
          </S.ButtonWrapper>
        </S.WriteForm>
      </FormProvider>
    </S.Container>
  );
}
