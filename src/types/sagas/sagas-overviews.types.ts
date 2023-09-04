import { GatedRoutePayload } from "./sagas.types";
import { OverviewModel } from "../api-models.types";

export type FetchOverviewsPayload = {} & GatedRoutePayload;

export type FetchOverviewPayload = {
  overviewId: number;
} & GatedRoutePayload;

export type FetchLogbookOverviewPayload = {
  logbookId: number;
} & GatedRoutePayload;

export type CreateOverviewPayload = Omit<
  OverviewModel,
  "id" | "createdAt" | "updatedAt" | "entries"
> &
  GatedRoutePayload;

export type UpdateOverviewPayload = Partial<
  Omit<
    OverviewModel,
    "id" | "createdAt" | "updatedAt" | "logbookId" | "entries"
  >
> & { overviewId: number } & GatedRoutePayload;

export type DeleteOverviewPayload = {
  overviewId: number;
} & GatedRoutePayload;
