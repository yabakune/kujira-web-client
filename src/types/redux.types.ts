import {
  BugReportModel,
  EntryModel,
  LogbookModel,
  OverviewModel,
  PurchaseModel,
} from "./api-models.types";

type NormalizedEntity<Entity> = { [key: string]: Entity };

export type NormalizedOverviews = NormalizedEntity<OverviewModel>;
export type NormalizedLogbooks = NormalizedEntity<LogbookModel>;
export type NormalizedEntries = NormalizedEntity<EntryModel>;
export type NormalizedPurchases = NormalizedEntity<PurchaseModel>;
export type NormalizedBugReports = NormalizedEntity<BugReportModel>;
