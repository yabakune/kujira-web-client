import { GatedRoutePayload } from "./sagas.types";
import { OverviewModel } from "../api-models.types";

export type FetchLogbooksPayload = {} & GatedRoutePayload;

export type FetchLogbookPayload = {
  logbookId: number;
} & GatedRoutePayload;

export type FetchUserLogbooksPayload = {} & GatedRoutePayload;

export type CreateLogbookPayload = Omit<
  OverviewModel,
  "id" | "createdAt" | "updatedAt" | "overview" | "entries"
> &
  GatedRoutePayload;

export type UpdateLogbookPayload = Partial<
  Omit<
    OverviewModel,
    "id" | "createdAt" | "updatedAt" | "ownerId" | "overview" | "entries"
  >
> & { logbookId: number } & GatedRoutePayload;

export type DeleteLogbookPayload = {
  logbookId: number;
} & GatedRoutePayload;
