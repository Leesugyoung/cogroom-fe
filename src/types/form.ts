export interface SignupFormFields {
  email: string;
}

export interface SettingFormFields {
  nickname: string;
  email: string;
  phoneNumber?: string;
  description?: string;
  imageUrl?: string;
}

export interface DailyCreateFormFields {
  level: string;
  categories: number[];
  question1: string;
  question2?: string;
  question3?: string;
}

export interface MemberDailyFormFields {
  keyword: string;
  category: number[];
  level: string[];
  startDate: Date | null;
  endDate: Date | null;
}

export interface WithdrawFormFields {
  reason: string;
}

export interface CouponFormFields {
  couponName: string;
  couponCode: string;
  couponType: string;
  discountValue: string;
  discountType: string;
  applicablePlan: (string | number)[];
  couponTargets: (string | number)[];
  maxIssuedCount: string;
  startDate: Date | null;
  endDate: Date | null;
}
