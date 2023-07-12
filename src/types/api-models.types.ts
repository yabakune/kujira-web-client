type Theme = "dark" | "light" | "system" | "auto";

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

export type OverviewModel = {
  id: number | null;
  income: number | null;
  savings: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  // Belongs To
  ownerId: number | null;
  // Has Many
  entryIds: number[];
};

export type LogbookModel = {
  id: number | null;
  name: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  // Belongs To
  ownerId: number | null;
  // Has Many
  entryIds: number[] | null;
};

export type EntryModel = {
  id: number | null;
  name: string | null;
  totalSpent: number | null;
  budget?: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  // Belongs To
  overviewId?: number | null;
  logbookId?: number | null;
  // Has Many
  purchaseIds: number[];
};

type PurchaseCategory = "monthly" | "need" | "planned" | "impulse" | "regret";

export type PurchaseModel = {
  id: number | null;
  placement: number | null;
  category: PurchaseCategory | null;
  description: string | null;
  cost?: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  // Belongs To
  entryId: number | null;
};

export type BugReportModel = {
  id: number | null;
  issue: string | null;
  details?: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  // Belongs To
  ownerId: number | null;
};
