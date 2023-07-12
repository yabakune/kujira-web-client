export type Theme = "dark" | "light" | "system" | "auto";

type Currency = "USD";

export type UserModel = {
  id: number | null;
  email: string | null;
  username: string | null;
  currency: Currency | string | null;
  theme: Theme | null;
  mobileNumber?: string | null;
  emailVerified: boolean | null;
  onboarded: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  // Has Many
  overviewIds: number[];
  logbookIds: number[];
  bugReportIds: number[];
};

export type OverviewModel = {};
export type LogbookModel = {};
export type EntryModel = {};
export type PurchaseModel = {};
export type BugReportModel = {};
