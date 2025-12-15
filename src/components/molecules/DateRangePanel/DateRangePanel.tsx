'use client';

import { useState } from 'react';

import OutlinedButton from '@/components/atoms/OutlinedButton/OutlinedButton';
import SolidButton from '@/components/atoms/SolidButton/SolidButton';
import SingleDatePicker from '@/components/molecules/SingleDatePicker/SingleDatePicker';
import { QUICK_DATE_SELECT } from '@/constants/common';

import DateInputField from './DateInputField/DateInputField';
import * as S from './DateRangePanel.styled';

interface DateRangePanelProps {
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onApply: () => void;
}

export default function DateRangePanel({
  selectedStartDate,
  selectedEndDate,
  onStartDateChange,
  onEndDateChange,
  onApply,
}: DateRangePanelProps) {
  const today = new Date();
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

  const handleQuickSelect = (days: number) => {
    const start = new Date();

    start.setDate(today.getDate() - days);

    onStartDateChange(start);
    onEndDateChange(today);
  };

  const handleStartCancel = () => {
    setIsStartOpen(false);
    onStartDateChange(null);
  };

  const handleEndCancel = () => {
    setIsEndOpen(false);
    onEndDateChange(null);
  };

  const handleStartApply = () => {
    setIsStartOpen(false);
    onStartDateChange(selectedStartDate);
  };

  const handleEndApply = () => {
    setIsEndOpen(false);
    onEndDateChange(selectedEndDate);
  };

  return (
    <S.DateRangePanel>
      <S.Wrapper>
        {/* 날짜 선택 */}
        <S.DateSelectorWrapper>
          <DateInputField
            label='시작일'
            selectedDate={selectedStartDate}
            onClick={() => {
              if (isEndOpen) setIsEndOpen(false);
              setIsStartOpen((prev) => !prev);
            }}
          />
          <DateInputField
            label='종료일'
            selectedDate={selectedEndDate}
            onClick={() => {
              if (isStartOpen) setIsStartOpen(false);
              setIsEndOpen((prev) => !prev);
            }}
          />
        </S.DateSelectorWrapper>

        <S.Line />

        {/* 빠른 선택 */}
        <S.QuickDateSelect>
          <S.QuickDateSelectLabel>빠른 선택</S.QuickDateSelectLabel>
          {QUICK_DATE_SELECT.map((item) => (
            <S.QuickDateSelectItem
              type='button'
              key={item.value}
              onClick={() => handleQuickSelect(item.value)}
            >
              {item.label}
            </S.QuickDateSelectItem>
          ))}
        </S.QuickDateSelect>

        <SolidButton
          label='적용'
          size='sm'
          color='primary'
          interactionVariant='normal'
          fillContainer
          onClick={onApply}
        />
      </S.Wrapper>

      {/* 날짜 선택 팝업 */}
      <S.PopupWrapper>
        {isStartOpen && (
          <S.Popup>
            <SingleDatePicker
              selectedDate={selectedStartDate}
              onSelect={onStartDateChange}
            />
            <S.ButtonWrapper>
              <OutlinedButton
                label='취소'
                color='assistive'
                size='sm'
                interactionVariant='normal'
                fillContainer
                onClick={handleStartCancel}
              />
              <SolidButton
                label='적용'
                size='sm'
                color='primary'
                interactionVariant='normal'
                fillContainer
                onClick={handleStartApply}
              />
            </S.ButtonWrapper>
          </S.Popup>
        )}
        {isEndOpen && (
          <S.Popup>
            <SingleDatePicker
              selectedDate={selectedEndDate}
              onSelect={onEndDateChange}
            />
            <S.ButtonWrapper>
              <OutlinedButton
                label='취소'
                color='assistive'
                size='sm'
                interactionVariant='normal'
                fillContainer
                onClick={handleEndCancel}
              />
              <SolidButton
                label='적용'
                size='sm'
                color='primary'
                interactionVariant='normal'
                fillContainer
                onClick={handleEndApply}
              />
            </S.ButtonWrapper>
          </S.Popup>
        )}
      </S.PopupWrapper>
    </S.DateRangePanel>
  );
}
