import { GatedRoutePayload } from "./sagas.types";

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

export type CreateEntryPayload = {
  name: string;
  totalSpent?: number;
  budget?: number;
  overviewId?: number;
  logbookId?: number;
} & GatedRoutePayload;

export type UpdateEntryPayload = Partial<{
  entryId: number;
  totalSpent: number;
  budget: number | null;
}> &
  GatedRoutePayload;

export type DeleteEntryPayload = {
  entryId: number;
} & GatedRoutePayload;
