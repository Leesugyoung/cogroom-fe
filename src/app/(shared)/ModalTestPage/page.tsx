'use client';

import styled from '@emotion/styled';
import React, { useState } from 'react';

import { DEFAULT_FEATURE_BANNER_1 } from '@/constants/image';
import { useCancelSubscriptionFlow } from '@/hooks/flow/useCancelSubscriptionFlow';
import { useLargeModalStore, useMediumModalStore, useSmallModalStore } from '@/stores/useModalStore2';

const Container = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #eee;
  border-radius: 8px;
`;

const Section = styled.section`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin-right: 10px;
  cursor: pointer;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  &:hover {
    background-color: #005bb5;
  }
`;

export default function ModalTestPage() {
  const { open: largeStoreOpen, close: largeStoreClose } = useLargeModalStore();
  const { open: mediumStoreOpen, close: mediumStoreClose } = useMediumModalStore();
  const { open: smallStoreOpen, close: smallStoreClose } = useSmallModalStore();

  const { openCancelFlow } = useCancelSubscriptionFlow();

  const [formInputValue, setFormInputValue] = useState('');
  const MAX_LENGTH = 100;

  const openInfoModal = () => {
    largeStoreOpen('info', {
      title: '정보 모달 테스트',
      description: '작업을 성공적으로 완료했습니다! 상세 내용을 확인하세요.',
      imageSrc: DEFAULT_FEATURE_BANNER_1,

      primaryButton: {
        label: '확인',
        onClick: largeStoreClose,
      },
      assistiveButton: {
        label: '상세 보기',
        onClick: () => {
          alert('상세 정보를 보여줍니다!');
          largeStoreClose();
        },
      },
    });
  };

  const openConfirmModal = () => {
    largeStoreOpen('confirm', {
      title: '삭제 확인',
      description: '정말로 이 항목을 영구적으로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
      closable: false,

      primaryButton: {
        label: '삭제',
        onClick: () => {
          largeStoreClose();
        },
      },
      assistiveButton: {
        label: '취소',
        onClick: largeStoreClose,
      },
    });
  };

  const openFormModal = () => {
    largeStoreOpen('form', {
      title: '의견 작성',
      description: '개선 사항을 100자 이내로 자유롭게 작성해주세요.',

      value: formInputValue,
      maxLength: MAX_LENGTH,
      placeholder: '여기에 내용을 입력하세요...',
      onValueChange: setFormInputValue,

      primaryButton: {
        label: '제출',
        onClick: () => {
          alert(`제출했습니다.`);
          largeStoreClose();
        },
      },
      assistiveButton: {
        label: '취소',
        onClick: largeStoreClose,
      },
    });
  };

  const openMediumAlertModal = () => {
    mediumStoreOpen('alert', {
      title: '업데이트 필요',
      description: '최신 버전으로 업데이트 해주세요.',
      buttonColor: 'primary',

      button: {
        label: '업데이트',
        onClick: mediumStoreClose,
      },
    });
  };

  const openMediumConfirmModal = () => {
    mediumStoreOpen('confirm', {
      title: '로그아웃 확인',
      description: '로그아웃 하시겠습니까?',

      primaryButton: {
        label: '로그아웃',
        onClick: mediumStoreClose,
      },
      assistiveButton: {
        label: '취소',
        onClick: mediumStoreClose,
      },
    });
  };

  const openSmallAlertModal = () => {
    smallStoreOpen('alert', {
      title: '토스트 알림',
      description: '잠시 후 자동으로 닫힙니다.',
      autoCloseDuration: 3000,

      button: { label: '확인', onClick: smallStoreClose }, // Small Alert는 버튼을 렌더링하지 않으므로 무시됨
      buttonColor: 'primary',
    });
  };

  const openUpgradePlanModal = () => {
    largeStoreOpen('upgradePlan', {});
  };

  const openDowngradePlanModal = () => {
    largeStoreOpen('downgradePlan', {});
  };

  const openCancelSubscriptionFlow = () => {
    openCancelFlow();
  };

  const openApplyCouponModal = () => {
    largeStoreOpen('applyCoupon', {
      price: '5,000원',
      name: '친구 초대 쿠폰',
      expiredDate: '2025년 12월 31일',
      couponHistoryId: 12345,
    });
  };

  return (
    <Container>
      <h1>Modal Component Test</h1>
      <p>
        현재 Form 입력 값: <strong>{formInputValue}</strong>
      </p>

      <hr />

      <h2>1. Large Modals (useLargeModalStore)</h2>
      <Section>
        <Button onClick={openInfoModal}>Info 모달 띄우기 (2버튼)</Button>
        <Button onClick={openConfirmModal}>Confirm 모달 띄우기</Button>
        <Button onClick={openFormModal}>Form 모달 띄우기</Button>

        <Button onClick={openUpgradePlanModal}>UpgradePlan 모달 띄우기</Button>
        <Button onClick={openDowngradePlanModal}>DowngradePlan 모달 띄우기</Button>

        <Button onClick={openCancelSubscriptionFlow}>구독 취소 플로우 시작</Button>
        <Button onClick={openApplyCouponModal}>ApplyCoupon 모달 띄우기</Button>
      </Section>

      <hr />

      <h2>2. Medium Modals (useMediumModalStore)</h2>
      <Section>
        <Button onClick={openMediumAlertModal}>Alert 모달 띄우기 (Primary)</Button>
        <Button onClick={openMediumConfirmModal}>Confirm 모달 띄우기</Button>
      </Section>

      <hr />

      <h2>3. Small Modals (useSmallModalStore)</h2>
      <Section>
        <Button onClick={openSmallAlertModal}>Small Alert (Toast) 띄우기</Button>
      </Section>
    </Container>
  );
}
