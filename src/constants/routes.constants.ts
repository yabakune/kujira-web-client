export enum ClientRoutes {
  LANDING = "/",
  REGISTER = "/register",
  LOGIN = "/login",
  PASSWORD_RESET = "/password-reset",
  TERMS_OF_SERVICE = "/terms-of-service",
  PRIVACY_POLICY = "/privacy-policy",
  COOKIE_POLICY = "/cookie-policy",
  ONBOARDING = "/onboarding",
  LOGBOOKS = "/dashboard/logbooks",
  REVIEWS = "/dashboard/reviews",
  SETTINGS = "/dashboard/settings",
  BUG_REPORT = "/bug-report",
}

export enum APIRoutes {
  AUTH = "/api/v1/auth",
  ONBOARDING = "/api/v1/onboarding",
  USERS = "/api/v1/users",
  OVERVIEWS = "/api/v1/overviews",
  LOGBOOKS = "/api/v1/logbooks",
  ENTRIES = "/api/v1/entries",
  PURCHASES = "/api/v1/purchases",
  BUG_REPORTS = "/api/v1/bug-reports",
}
