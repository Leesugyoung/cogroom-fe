import Image from 'next/image';
import Link from 'next/link';

import { DEFAULT_LOGO_SYMBOL_GRAY, DEFAULT_LOGO_KOREAN } from '@/constants/image';

import * as S from './Footer.styled';
import SocialLink from './SocialLink/SocialLink';

export default function Footer() {
  return (
    <S.Footer>
      <S.FooterWrapper>
        <S.LogoWrapper>
          <Image
            src={DEFAULT_LOGO_SYMBOL_GRAY}
            alt='Logo'
            width={24}
            height={24}
          />
          <Image
            src={DEFAULT_LOGO_KOREAN}
            alt='Logo'
            width={48}
            height={16}
          />
        </S.LogoWrapper>

        <S.InfoWrapper>
          <S.Info>
            상호명: (주)온코그니어 <span> | </span> 대표: 김다희 <span> | </span> 사업자등록번호: 638-81-03854
            <span> | </span> 통신판매업 신고 번호: 2025-수원권선-0559
          </S.Info>
          <S.Info>
            주소: 경기도 화성시 효행로 1068, 604동 G149호, 18405, 604동 G149호 <span> | </span> 문의:
            oncognier@gmail.com, 010-3739-3430
          </S.Info>
          <S.Info>Copyright © 2025 온코그니어 All Rights Reserved</S.Info>
        </S.InfoWrapper>

        <S.FooterBottom>
          <S.FooterLinks>
            <Link href={'/terms'}>이용 약관</Link>
            <Link href={'/privacy'}>개인정보 처리방침</Link>
            <Link href={'/marketing'}>마케팅 정보 수신동의</Link>
            <Link href='https://oncognier.notion.site/2963f9bd81c68065aa38c15fb5c6b484'>환불 규정</Link>
          </S.FooterLinks>
          <SocialLink />
        </S.FooterBottom>
      </S.FooterWrapper>
    </S.Footer>
  );
}
