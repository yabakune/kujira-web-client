import { GatedRoutePayload } from "./sagas.types";
import { LogbookModel, OverviewModel } from "../api-models.types";

export type FetchLogbooksPayload = {} & GatedRoutePayload;

export type FetchLogbookPayload = {
  logbookId: number;
} & GatedRoutePayload;

export type FetchUserLogbooksPayload = {} & GatedRoutePayload;

export type CreateLogbookPayload = Omit<
  LogbookModel,
  "id" | "name" | "createdAt" | "updatedAt" | "overview" | "entries"
>;

export type UpdateLogbookPayload = Partial<
  Omit<
    LogbookModel,
    "id" | "createdAt" | "updatedAt" | "ownerId" | "overview" | "entries"
  >
> & { logbookId: number } & GatedRoutePayload;

export type DeleteLogbookPayload = {
  logbookId: number;
} & GatedRoutePayload;
