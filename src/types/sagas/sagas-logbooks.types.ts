import { GatedRoutePayload } from "./sagas.types";

export type FetchLogbookPayload = {
  logbookId: number;
} & GatedRoutePayload;

export type CreateLogbookPayload = {
  name: string;
  ownerId: number;
} & GatedRoutePayload;

export type UpdateLogbookPayload = Partial<{
  name: string;
}> & { logbookId: number } & GatedRoutePayload;

export type DeleteLogbookPayload = {
  logbookId: number;
} & GatedRoutePayload;
