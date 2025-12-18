import { PaymentList } from './_components/PaymentList/PaymentList';
import { PaymentListMobile } from './_components/PaymentListMobile/PaymentListMobile';
import { PaymentMethod } from './_components/PaymentMethod/PaymentMethod';
import * as S from './page.styled';
import SettingGroup from '../../notification/_components/SettingGroup/SettingGroup';

export default function Payments() {
  return (
    <>
      <SettingGroup title='결제 수단'>
        <PaymentMethod />
      </SettingGroup>

      <S.DesktopOnly>
        <PaymentList />
      </S.DesktopOnly>

      <S.MobileOnly>
        <SettingGroup title='결제 내역'>
          <PaymentListMobile />
        </SettingGroup>
      </S.MobileOnly>
    </>
  );
}
