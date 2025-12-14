'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

import ChevronDown from '@/assets/icons/chevrondown.svg';
import ChevronUp from '@/assets/icons/chevronup.svg';
import OutlinedButton from '@/components/atoms/OutlinedButton/OutlinedButton';
import Textarea from '@/components/molecules/Textarea/Textarea';
import { useEditDailyAnswerMutation } from '@/hooks/api/daily/useEditDailyAnswer';
import { useAuthStore } from '@/stores/useAuthStore';
import { formatDayAsSlashMMDD, formatWeekday } from '@/utils/date/formatDay';

import * as S from './DailyQuestionCard.styled';

interface DailyQuestionCardProps {
  questionId: number;
  question: string;
  answer: string;
  answerDate: string;
  initialOpen?: boolean;
  updatable?: boolean;
}

export default function DailyQuestionCard({
  questionId,
  question,
  answer,
  answerDate,
  initialOpen = false,
  updatable,
}: DailyQuestionCardProps) {
  const router = useRouter();
  const isFree = useAuthStore((s) => s.isFree);

  const [isOpen, setIsOpen] = useState(initialOpen);
  const [editedAnswer, setEditedAnswer] = useState(answer);

  const { editDailyAnswer } = useEditDailyAnswerMutation();

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleEditAnswer = useCallback(() => {
    if (!updatable) return;

    editDailyAnswer({ assignedQuestionId: questionId, answer: editedAnswer });
  }, [updatable, editDailyAnswer, questionId, editedAnswer]);

  const handleShare = useCallback(() => {
    const shareUrl = `/community/write?type=daily&id=${questionId}&answerDate=${answerDate}`;
    router.push(shareUrl);
  }, [router, questionId, answerDate]);

  const formattedDate = formatDayAsSlashMMDD(answerDate);
  const weekday = formatWeekday(answerDate);

  const canShare = !isFree();

  return (
    <S.DailyQuestionCard>
      <S.DateWrapper>
        <S.DateText>{formattedDate}</S.DateText>
        <S.WeekdayText>{weekday}</S.WeekdayText>
      </S.DateWrapper>

      <S.QuestionAnswerGroup>
        <S.StyledOutlinedButton $isOpen={isOpen}>
          <OutlinedButton
            size='md'
            color='assistive'
            label={question}
            iconRight={isOpen ? <ChevronUp /> : <ChevronDown />}
            interactionVariant='normal'
            fillContainer
            align='space-between'
            onClick={toggleOpen}
          />
        </S.StyledOutlinedButton>
        {isOpen && (
          <S.EditWrapper>
            <Textarea
              textareaSize='md'
              value={updatable ? editedAnswer : ''}
              onChange={(e) => setEditedAnswer(e.target.value)}
              placeholder={answer}
              minHeight='15.5rem'
              disabled={!updatable}
              autoResize
              style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            />
            {(updatable || canShare) && (
              <S.ButtonWrapper>
                {updatable && (
                  <OutlinedButton
                    size='sm'
                    color='primary'
                    label='수정하기'
                    interactionVariant='normal'
                    onClick={handleEditAnswer}
                    fillContainer
                  />
                )}
                {canShare && (
                  <OutlinedButton
                    size='sm'
                    color='assistive'
                    label='공유하기'
                    interactionVariant='normal'
                    onClick={handleShare}
                    fillContainer
                  />
                )}
              </S.ButtonWrapper>
            )}
          </S.EditWrapper>
        )}
      </S.QuestionAnswerGroup>
    </S.DailyQuestionCard>
  );
}
