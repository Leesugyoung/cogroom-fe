const AUTH_QUERY_KEYS = {
  AUTH: ['auth'],
  AUTH_REISSUE: ['auth', 'reissue'],
  GET_EMAIL_STATUS: ['auth', 'get_email_status'],
  CHECK_EMAIL: ['auth', 'check_email'],
} as const;

const MEMBER_QUERY_KEYS = {
  MEMBER: ['member'],
  MEMBER_INFO: ['member', 'info'],
  MEMBER_SUMMARY: ['member', 'summary'],
  MEMBER_DAILY: ['member', 'daily'],
  MEMBER_DASHBOARD: ['member', 'dashboard'],
  MEMBER_POSTS: ['member', 'posts'],
  MEMBER_COMMENTS: ['member', 'comments'],
  MEMBER_SAVES: ['member', 'posts', 'saves'],
  MEMBER_LIKESPOSTS: ['member', 'posts', 'likes'],
  MEMBER_LIKESCOMMENTS: ['member', 'comments', 'likes'],
  MEMBER_SUBSCRIPTION: ['member', 'subscription'],
  MEMBER_PAYMENT_METHOD: ['member', 'payment-method'],
  PROFILE: ['member', 'profile'],
} as const;

const DAILY_QUERY_KEYS = {
  DAILY: ['daily'],
  DAILY_QUESTION_ANSWER: ['daily', 'question', 'answer'],
  DAILY_HAS_ANSWERED: ['daily', 'hasAnswered'],
} as const;

const STREAK_QUERY_KEYS = {
  STREAK: ['streak'],
  STREAK_CALENDAR: ['streak', 'calendar'],
  STREAK_DAYS: ['streak', 'days'],
} as const;

const POST_QUERY_KEYS = {
  POST: ['post'],
  POST_CREATE: ['post', 'create'],
  POST_LIST: ['post', 'list'],
} as const;

const COMMENT_QUERY_KEYS = {
  COMMENT: ['comment'],
  COMMENT_LIST: ['comment', 'list'],
} as const;

const PAYMENT_QUERY_KEYS = {
  PAYMENT: ['payment'],
  PLAN_INFO: ['payment', 'plan', 'info'],
  PLANS: ['payment', 'plans'],
  BILLING_KEY: ['payment', 'billing_key'],
  COUPONS: ['payment', 'coupons'],
} as const;

const ADMIN_QUERY_KEYS = {
  ADMIN: ['admin'],
  ADMIN_MEMBER_LIST: ['admin', 'member_list'],
  ADMIN_DAILY_LIST: ['admin', 'daily_list'],
  ADMIN_MEMBER_DAILY: ['admin', 'daily'],
  POST_LIST: ['admin', 'post_list'],
  COMMENT_LIST: ['admin', 'comment_list'],
  PAYMENT_HISTORY: ['admin', 'payment_history'],
} as const;

export {
  AUTH_QUERY_KEYS,
  MEMBER_QUERY_KEYS,
  DAILY_QUERY_KEYS,
  STREAK_QUERY_KEYS,
  POST_QUERY_KEYS,
  COMMENT_QUERY_KEYS,
  PAYMENT_QUERY_KEYS,
  ADMIN_QUERY_KEYS,
};
