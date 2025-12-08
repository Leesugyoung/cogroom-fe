import { DeployEnv } from '@/types/common';

export const DEFAULT_OG_THUMBNAIL: string = 'https://cdn.cogroom.com/default_image/OG_Thumbnail.png';

// Avatar
export const DEFAULT_AVATAR_IMAGE: string = 'https://cdn.cogroom.com/default_image/Profile.png';
export const DEFAULT_THUMBNAIL: string = 'https://cdn.cogroom.com/default_image/Thumbnail.png';
export const REPORT_IMAGE: string = 'https://cdn.cogroom.com/default_image/Report.png';

// Logo
export const DEFAULT_LOGO_SYMBOL_NORMAL: string = 'https://cdn.cogroom.com/default_image/Logo/Logo_Symbol_normal.svg';
export const DEFAULT_LOGO_SYMBOL_GRAY: string = 'https://cdn.cogroom.com/default_image/Logo/Logo_Symbol_gray.svg';
export const DEFAULT_LOGO_SYMBOL_WHITE: string = 'https://cdn.cogroom.com/default_image/Logo/Logo_Symbol_white.png';
export const DEFAULT_LOGO_TYPE_NORMAL: string = 'https://cdn.cogroom.com/default_image/Logo/Logo_Type_normal.svg';
export const DEFAULT_LOGO_HORIZONTAL_NORMAL: string =
  'https://cdn.cogroom.com/default_image/Logo/Logo_Horizontal_normal.svg';
export const DEFAULT_LOGO_HORIZONTAL_WHITE: string =
  'https://cdn.cogroom.com/default_image/Logo/Logo_Horizontal_white.svg';
export const DEFAULT_LOGO_HORIZONTAL_BLACK: string =
  'https://cdn.cogroom.com/default_image/Logo/Logo_Horizontal_black.svg';
export const DEFAULT_LOGO_VERTICAL_NORMAL: string =
  'https://cdn.cogroom.com/default_image/Logo/Logo_Vertical_normal.svg';
export const DEFAULT_LOGO_VERTICAL_WHITE: string = 'https://cdn.cogroom.com/default_image/Logo/Logo_Vertical_white.svg';
export const DEFAULT_LOGO_VERTICAL_BLACK: string = 'https://cdn.cogroom.com/default_image/Logo/Logo_Vertical_black.svg';
export const DEFAULT_LOGO_KOREAN: string = 'https://cdn.cogroom.com/default_image/Logo/Logo_Korean.svg';
export const DEFAULT_LOGO_STAGING: string = 'https://cdn.cogroom.com/default_image/Logo/Logo_Staging.svg';
export const DEFAULT_LOGO_DEV: string = 'https://cdn.cogroom.com/default_image/Logo/Logo_Dev.svg';

export const ENV_LOGO_MAP: Record<DeployEnv, string> = {
  production: DEFAULT_LOGO_HORIZONTAL_NORMAL,
  staging: DEFAULT_LOGO_STAGING,
  development: DEFAULT_LOGO_DEV,
};

// Home
export const DEFAULT_HERO_WAVY: string = 'https://cdn.cogroom.com/default_image/Hero_Wavy.gif';
export const DEFAULT_DAILY_WATERDROP: string = 'https://cdn.cogroom.com/default_image/Daily_Waterdrop.png';
export const DEFAULT_COMMUNITY_BANNER: string = 'https://cdn.cogroom.com/default_image/Community_Banner.png';

// Daily
export const DEFAULT_QUESTION_BACKGROUND: string =
  'https://cdn.cogroom.com/default_image/Daily_Question_Background.png';
export const DEFAULT_WATERDROP: string = 'https://cdn.cogroom.com/default_image/Waterdrop.svg';
export const DEFAULT_DAILY_BANNER: string = 'https://cdn.cogroom.com/default_image/Daily_Banner.png';

// Contents
export const DEFAULT_CONTENT_MAIN_BANNER: string = 'https://cdn.cogroom.com/default_image/Content_Main_Banner.png';

// Community
export const DEFAULT_COMMUNITY_MAIN_BANNER: string = 'https://cdn.cogroom.com/default_image/Community_Main_Banner.png';

// MyPage
export const DEFAULT_MYPAGE_BANNER_1: string = 'https://cdn.cogroom.com/default_image/MyPage_Banner1.png';
export const DEFAULT_MYPAGE_BANNER_2: string = 'https://cdn.cogroom.com/default_image/MyPage_Banner2.png';
export const DEFAULT_MYPAGE_BANNER_3: string = 'https://cdn.cogroom.com/default_image/MyPage_Banner3.png';

// Loading
export const DEFAULT_LOADING: string = 'https://cdn.cogroom.com/default_image/Loading.png';

// Streak share
export const STREAK_SHARE_IMAGE_URLS: string[] = [
  'https://cdn.cogroom.com/default_image/StreakShare01.png',
  'https://cdn.cogroom.com/default_image/StreakShare02.png',
  'https://cdn.cogroom.com/default_image/StreakShare03.png',
];

// Subscription
export const DEFAULT_FEATURE_BANNER_1: string = 'https://cdn.cogroom.com/default_image/Feature1.png';
export const DEFAULT_FEATURE_BANNER_2: string = 'https://cdn.cogroom.com/default_image/Feature2.png';
export const DEFAULT_FEATURE_BANNER_3: string = 'https://cdn.cogroom.com/default_image/Feature3.png';
export const DEFAULT_UPGRADE_BANNER: string = 'https://cdn.cogroom.com/default_image/Subscription_Upgrade.png';

// Coupon
export const DEFAULT_COUPON_TICKET: string = 'https://cdn.cogroom.com/default_image/Coupon_Ticket.png';
