import { GatedRoutePayload } from "./sagas.types";
import { EntryModel } from "../api-models.types";

export type FetchEntriesPayload = {} & GatedRoutePayload;

export type FetchEntryPayload = {
  entryId: number;
} & GatedRoutePayload;

export type FetchOverviewEntriesPayload = {
  overviewId: number;
} & GatedRoutePayload;

export type FetchLogbookEntriesPayload = {
  logbookId: number;
} & GatedRoutePayload;

export type CreateEntryPayload = Omit<
  EntryModel,
  "id" | "totalSpent" | "createdAt" | "updatedAt" | "purchases"
> &
  GatedRoutePayload;

export type UpdateEntryPayload = Partial<
  Omit<EntryModel, "id" | "createdAt" | "updatedAt" | "purchases">
> & { entryId: number; showNotification?: boolean } & GatedRoutePayload;

export type DeleteEntryPayload = {
  entryId: number;
} & GatedRoutePayload;
