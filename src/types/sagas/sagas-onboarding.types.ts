import { GatedRoutePayload } from "./sagas.types";

export type OnboardNewUserPayload = {
  income: number;
  savings: number;
  overviewId: number;
} & GatedRoutePayload;
