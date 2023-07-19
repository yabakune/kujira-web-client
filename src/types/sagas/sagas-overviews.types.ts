import { GatedRoutePayload } from "./sagas.types";

export type FetchOverviewsPayload = {} & GatedRoutePayload;

export type FetchOverviewPayload = {
  overviewId: number;
} & GatedRoutePayload;

export type FetchUserOverviewsPayload = {} & GatedRoutePayload;

export type CreateOverviewPayload = {
  name: string;
  ownerId: number;
} & GatedRoutePayload;

export type UpdateOverviewPayload = Partial<{
  name: string;
}> & { overviewId: number } & GatedRoutePayload;

export type DeleteOverviewPayload = {
  overviewId: number;
} & GatedRoutePayload;
