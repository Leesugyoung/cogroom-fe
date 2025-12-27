import { PaymentMethod } from '@/types/payment';

// Session Storage에 결제 상태를 저장할 때 사용하는 키
export const PAYMENT_STATE_STORAGE_KEY = 'portone_payment_state';

// Session Storage에 저장될 데이터 구조
export interface StoredPaymentState {
  paymentHistoryId?: number;
  paymentMethod: PaymentMethod;
  planId?: number;
}

/**
 * 결제 플로우 재개를 위해 현재 상태를 Session Storage에 저장합니다.
 */
export const savePaymentState = (state: StoredPaymentState) => {
  try {
    sessionStorage.setItem(PAYMENT_STATE_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    alert('Error saving payment state to session storage:');
  }
};

/**
 * Session Storage에서 저장된 결제 상태를 로드합니다.
 */
export const loadPaymentState = (): StoredPaymentState | null => {
  try {
    const storedStateString = sessionStorage.getItem(PAYMENT_STATE_STORAGE_KEY);
    if (storedStateString) {
      return JSON.parse(storedStateString) as StoredPaymentState;
    }
    return null;
  } catch (error) {
    alert('Error loading payment state from session storage:');
    return null;
  }
};

/**
 * Session Storage에 저장된 결제 상태를 삭제합니다.
 */
export const clearPaymentState = () => {
  try {
    sessionStorage.removeItem(PAYMENT_STATE_STORAGE_KEY);
  } catch (error) {
    alert('Error clearing payment state from session storage:');
  }
};
