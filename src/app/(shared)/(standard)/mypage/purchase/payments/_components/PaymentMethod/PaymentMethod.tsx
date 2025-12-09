'use client';

import Kakao from '@/assets/icons/kakao.svg';
import Plus from '@/assets/icons/plus.svg';
import OutlinedButton from '@/components/atoms/OutlinedButton/OutlinedButton';
import SolidTag from '@/components/atoms/SolidTag/SolidTag';
import TextButton from '@/components/atoms/TextButton/TextButton';
import { useChangeDefaultPaymentMethodMutation } from '@/hooks/api/member/useChangeDefaultPaymentMethod';
import { useDeletePaymentMethodMutation } from '@/hooks/api/member/useDeletePaymentMethod';
import useGetPaymentMethod from '@/hooks/api/member/useGetPaymentMethod';
import { useRegisterPaymentMethod } from '@/hooks/api/payment/useRegisterPaymentMethod';
import { useLargeModalStore } from '@/stores/useModalStore2';

import * as S from './PaymentMethod.styled';

export const PaymentMethod = () => {
  const { registerPaymentMethod } = useRegisterPaymentMethod();
  const { data: paymentMethod, refetch } = useGetPaymentMethod();
  const { deletePaymentMethod } = useDeletePaymentMethodMutation();
  const { changeDefaultPaymentMethod } = useChangeDefaultPaymentMethodMutation();
  const { open: largeStoreOpen, close: largeStoreClose } = useLargeModalStore();

  const handleAddCard = () => {
    registerPaymentMethod({
      paymentMethod: 'CARD',
      billingParams: {
        finalPrice: 0,
        planName: '카드 등록',
      },
      isFromMyPage: true,
    });
  };

  const handleAddKakaoPay = () => {
    registerPaymentMethod({
      paymentMethod: 'KAKAO_PAY',
      billingParams: {
        finalPrice: 0,
        planName: '카카오페이 등록',
      },
      isFromMyPage: true,
    });
  };

  const cardPaymentMethods = paymentMethod?.data?.filter((item) => item.type === 'CARD') || [];
  const hasKakaoPayment = paymentMethod?.data?.some((item) => item.type === 'KAKAO_PAY');
  const kakaoPayment = paymentMethod?.data?.find((item) => item.type === 'KAKAO_PAY');

  const handleDeleteConfirm = (paymentMethodId: number) => {
    largeStoreOpen('confirm', {
      title: '결제 수단 삭제',
      description: `결제 수단을 삭제할까요?`,
      primaryButton: {
        label: '삭제하기',
        onClick: () => {
          largeStoreClose();
          handleDeletePaymentMethod(paymentMethodId);
        },
      },
      assistiveButton: {
        label: '취소',
        onClick: largeStoreClose,
      },
    });
  };

  const handleDeletePaymentMethod = (paymentMethodId: number) => {
    deletePaymentMethod(
      { paymentMethodId },
      {
        onSuccess: () => {
          refetch();
        },
      },
    );
  };

  const handleChangeDefaultPaymentMethodConfirm = (paymentMethodId: number) => {
    largeStoreOpen('confirm', {
      title: '대표 수단을 변경할까요?',
      description: '다음 구독부터 대표수단으로 자동 결제돼요',
      primaryButton: {
        label: '확인',
        onClick: () => {
          largeStoreClose();
          handleChangeDefaultPaymentMethod(paymentMethodId);
        },
      },
    });
  };

  const handleChangeDefaultPaymentMethod = (paymentMethodId: number) => {
    changeDefaultPaymentMethod(
      { paymentMethodId },
      {
        onSuccess: () => {
          refetch();
        },
      },
    );
  };

  return (
    <S.MethodContainer>
      <S.PaymentMethodsWrapper>
        <S.ButtonBox>
          <OutlinedButton
            size='sm'
            label={'체크/신용 카드'}
            color='primary'
            interactionVariant='normal'
          />
        </S.ButtonBox>

        {cardPaymentMethods.map((card, index) => (
          <S.DefaultPaymentWrapper key={index}>
            <S.DefaultCardBox>
              <S.CardName>
                {card.cardName} {card.cardNum}
              </S.CardName>
              <SolidTag
                label={card.isPresent ? '대표' : '대표 수단으로 설정'}
                color={card.isPresent ? 'green' : 'blue'}
                onClick={
                  card.isPresent ? undefined : () => handleChangeDefaultPaymentMethodConfirm(card.paymentMethodId)
                }
              />
            </S.DefaultCardBox>

            <OutlinedButton
              color='destructive'
              size='sm'
              label='삭제'
              interactionVariant='normal'
              onClick={() => handleDeleteConfirm(card.paymentMethodId)}
            />
          </S.DefaultPaymentWrapper>
        ))}

        <S.ButtonBox>
          <TextButton
            size='sm'
            color='primary'
            label='추가하기'
            interactionVariant='normal'
            iconLeft={<Plus />}
            onClick={handleAddCard}
          />
        </S.ButtonBox>
      </S.PaymentMethodsWrapper>

      <S.Divider />

      <S.PaymentMethodsWrapper>
        <S.ButtonBox>
          <OutlinedButton
            size='sm'
            label={'카카오페이'}
            color='kakao'
            interactionVariant='normal'
            iconRight={<Kakao className='kakao' />}
          />
        </S.ButtonBox>

        {hasKakaoPayment && (
          <S.DefaultPaymentWrapper>
            <S.DefaultCardBox>
              <S.CardName>연동됨</S.CardName>
              <SolidTag
                label={kakaoPayment?.isPresent ? '대표' : '대표 수단으로 설정'}
                color={kakaoPayment?.isPresent ? 'green' : 'blue'}
                onClick={
                  kakaoPayment?.isPresent
                    ? undefined
                    : () => handleChangeDefaultPaymentMethodConfirm(kakaoPayment!.paymentMethodId)
                }
              />
            </S.DefaultCardBox>

            <OutlinedButton
              color='destructive'
              size='sm'
              label='삭제'
              interactionVariant='normal'
              onClick={() => handleDeleteConfirm(kakaoPayment!.paymentMethodId)}
            />
          </S.DefaultPaymentWrapper>
        )}

        {!hasKakaoPayment && (
          <S.ButtonBox>
            <TextButton
              size='sm'
              color='primary'
              label='추가하기'
              interactionVariant='normal'
              iconLeft={<Plus />}
              onClick={handleAddKakaoPay}
            />
          </S.ButtonBox>
        )}
      </S.PaymentMethodsWrapper>

      <S.Divider />
    </S.MethodContainer>
  );
};
