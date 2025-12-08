'use client';

import React, { ChangeEvent, useState, useEffect } from 'react';

import OutlinedButton from '@/components/atoms/OutlinedButton/OutlinedButton';
import Textarea from '@/components/molecules/Textarea/Textarea';
import InputCount from '@/components/organisms/Question/_components/InputCount';
import { ModalOptions } from '@/types/modal2';

import * as S from './Form.styled';
import { ButtonProps } from '../../../modalConfig2';

export interface FormModalProps extends ModalOptions {
  [key: string]: unknown;

  title: string;
  description: string;
  primaryButton: ButtonProps;
  assistiveButton?: ButtonProps;
  value: string;
  maxLength: number;
  placeholder: string;
  onValueChange: (value: string) => void;
}

export default function Form({
  title,
  description,
  primaryButton,
  assistiveButton,
  value,
  maxLength,
  placeholder,
  onValueChange,
}: FormModalProps) {
  const [localValue, setLocalValue] = useState<string>(value);

  useEffect(() => {
    setLocalValue(value ?? '');
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLocalValue(e.target.value);
  };

  const handleLimitedValueChange = (limitedValue: string) => {
    setLocalValue(limitedValue);
  };

  const handlePrimaryClick = () => {
    onValueChange?.(localValue);
    primaryButton.onClick?.(localValue);
  };

  const handleAssistiveClick = () => {
    onValueChange?.(localValue);
    assistiveButton?.onClick?.(localValue);
  };

  return (
    <S.Form>
      <S.TextWrapper>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.TextWrapper>

      <S.InputForm>
        <Textarea
          textareaSize='lg'
          minHeight='20.6rem'
          placeholder={placeholder}
          value={localValue}
          onChange={handleChange}
        />
        <S.InputCountWrapper>
          <InputCount
            maxLength={maxLength}
            value={localValue}
            onChange={handleLimitedValueChange}
          />
        </S.InputCountWrapper>
      </S.InputForm>

      <S.ButtonWrapper>
        {assistiveButton && (
          <OutlinedButton
            size='lg'
            label={assistiveButton.label}
            color='assistive'
            interactionVariant='normal'
            fillContainer
            onClick={handleAssistiveClick}
          />
        )}
        <OutlinedButton
          size='lg'
          label={primaryButton.label}
          color='primary'
          interactionVariant='normal'
          fillContainer
          onClick={handlePrimaryClick}
        />
      </S.ButtonWrapper>
    </S.Form>
  );
}
