import { GatedRoutePayload } from "./sagas.types";

export type FetchOverviewsPayload = {} & GatedRoutePayload;

export type FetchOverviewPayload = {
  overviewId: number;
} & GatedRoutePayload;

export type FetchLogbookOverviewPayload = {
  logbookId: number;
} & GatedRoutePayload;

export type CreateOverviewPayload = {
  income: number;
  savings?: number;
  logbookId: number;
} & GatedRoutePayload;

export type UpdateOverviewPayload = Partial<{
  income: number;
  savings: number;
}> & { overviewId: number } & GatedRoutePayload;

export type DeleteOverviewPayload = {
  overviewId: number;
} & GatedRoutePayload;
