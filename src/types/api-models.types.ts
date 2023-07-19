export type Theme = "dark" | "light" | "system" | "auto";

export type Currency = "USD";

export type UserModel = {
  id: number;
  email: string;
  username: string;
  currency: Currency | string;
  theme: Theme;
  mobileNumber?: string | null;
  emailVerified: boolean;
  onboarded: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Has Many
  logbookIds: number[];
  bugReportIds: number[];
};

export type OverviewModel = {
  id: number;
  income: number;
  savings: number;
  createdAt: Date;
  updatedAt: Date;
  // One To One
  logbookId: number;
  // Has Many
  entryIds: number[];
};

export type LogbookModel = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  // Belongs To
  ownerId: number;
  // One to One
  overview: { id: number };
  // Has Many
  entryIds: number[];
};

export type EntryModel = {
  id: number;
  name: string;
  totalSpent: number;
  budget?: number | null;
  createdAt: Date;
  updatedAt: Date;
  // Belongs To
  overviewId?: number | null;
  logbookId?: number | null;
  // Has Many
  purchaseIds: number[];
};

export type PurchaseCategory =
  | "monthly"
  | "need"
  | "planned"
  | "impulse"
  | "regret";

export type PurchaseModel = {
  id: number;
  placement: number;
  category: PurchaseCategory;
  description: string;
  cost?: number | null;
  createdAt: Date;
  updatedAt: Date;
  // Belongs To
  entryId: number;
};

export type BugReportModel = {
  id: number;
  issue: string;
  details?: string | null;
  createdAt: Date;
  updatedAt: Date;
  // Belongs To
  ownerId: number;
};
