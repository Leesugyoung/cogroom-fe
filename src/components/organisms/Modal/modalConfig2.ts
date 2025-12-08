import type { ModalMap2 } from '@/types/modal2';

import ConfirmLarge, { ConfirmLargeModalProps } from './templates/Large/Confirm/Confirm';
import CouponBox, { CouponBoxModalProps } from './templates/Large/CouponBox/CouponBox';
import ApplyCoupon, { ApplyCouponModalProps } from './templates/Large/Custom/ApplyCoupon/ApplyCoupon';
import CancelSubscription, {
  CancelSubscriptionModalProps,
} from './templates/Large/Custom/CancelSubscription/CancelSubscription';
import DowngradePlan, {
  DowngradePlanModalProps,
} from './templates/Large/Custom/ChangePlan/DowngradePlan/DowngradePlan';
import UpgradePlan, { UpgradePlanModalProps } from './templates/Large/Custom/ChangePlan/UpgradePlan/UpgradePlan';
import Form, { FormModalProps } from './templates/Large/Form/Form';
import Info, { InfoModalProps } from './templates/Large/Info/Info';
import AlertMedium, { AlertMediumModalProps } from './templates/Medium/Alert/Alert';
import ConfirmMedium, { ConfirmMediumModalProps } from './templates/Medium/Confirm/Confirm';
import AlertSmall, { AlertSmallModalProps } from './templates/Small/Alert/Alert';

export type ButtonProps = {
  label: string;
  onClick: (value?: string) => void;
};

export type LargeModalProps = {
  info: InfoModalProps;
  confirm: ConfirmLargeModalProps;
  form: FormModalProps;

  upgradePlan: UpgradePlanModalProps;
  downgradePlan: DowngradePlanModalProps;
  cancelSubscription: CancelSubscriptionModalProps;
  couponBox: CouponBoxModalProps;
  applyCoupon: ApplyCouponModalProps;
};

export const LargeModalRegistry = {
  info: { Component: Info },
  confirm: { Component: ConfirmLarge },
  form: { Component: Form },

  upgradePlan: { Component: UpgradePlan },
  downgradePlan: { Component: DowngradePlan },
  cancelSubscription: { Component: CancelSubscription },
  couponBox: { Component: CouponBox },
  applyCoupon: { Component: ApplyCoupon },
} satisfies ModalMap2<LargeModalProps>;

export type MediumModalProps = {
  confirm: ConfirmMediumModalProps;
  alert: AlertMediumModalProps;
};

export const MediumModalRegistry = {
  confirm: { Component: ConfirmMedium },
  alert: { Component: AlertMedium },
} satisfies ModalMap2<MediumModalProps>;

export type SmallModalProps = {
  alert: AlertSmallModalProps;
};

export const SmallModalRegistry = {
  alert: { Component: AlertSmall },
} satisfies ModalMap2<SmallModalProps>;
