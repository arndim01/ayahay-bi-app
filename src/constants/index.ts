export const AYAHAY_API_URL = (process.env.NEXT_PUBLIC_API_URL as string) || "http://localhost:3002"

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `/auth/register`,
    LOGIN: `/auth/login`,
    REFRESH_TOKEN: `/auth/refresh`,
    FORGOT_PASSWORD: `/auth/forgot-password`,
    RESET_PASSWORD: `/auth/reset-password`,
    VERIFY_EMAIL: `/auth/verify-email`,
    ME: `/auth/me`,
    CHANGE_PASSWORD: `/auth/change-password`,
    LOGOUT: `/auth/logout`,
    VERIFY_TOKEN: `/auth/verify-token`
  },
  TENANTS: "/integration/tenants"
}
