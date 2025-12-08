import Image from 'next/image';
import React from 'react';

import OutlinedButton from '@/components/atoms/OutlinedButton/OutlinedButton';
import { ModalOptions } from '@/types/modal2';

import * as S from './Info.styled';
import { ButtonProps } from '../../../modalConfig2';

export interface InfoModalProps extends ModalOptions {
  [key: string]: unknown;

  title: string;
  description: string;
  imageSrc: string;
  primaryButton: ButtonProps;
  assistiveButton?: ButtonProps;
}

export default function Info({ title, description, imageSrc, primaryButton, assistiveButton }: InfoModalProps) {
  return (
    <S.Info>
      <S.Title>{title}</S.Title>
      <Image
        src={imageSrc}
        alt='모달 이미지'
        width={287}
        height={189}
        style={{ objectFit: 'none', objectPosition: 'center' }}
      />
      <S.Description>{description}</S.Description>
      <S.ButtonWrapper>
        {assistiveButton && (
          <OutlinedButton
            size='lg'
            label={assistiveButton.label}
            color='assistive'
            interactionVariant='normal'
            fillContainer
            onClick={assistiveButton.onClick}
          />
        )}

        <OutlinedButton
          size='lg'
          label={primaryButton.label}
          color='primary'
          interactionVariant='normal'
          fillContainer
          onClick={primaryButton.onClick}
        />
      </S.ButtonWrapper>
    </S.Info>
  );
}
