import { GatedRoutePayload } from "./sagas.types";
import { PurchaseCategory } from "../api-models.types";

type PayloadPurchase = {
  placement: number;
  category: PurchaseCategory;
  description: string;
  cost: number | null;
  entryId: number;
};

type OverviewEntry = {
  id: number;
  totalCost: number;
};

export type OnboardNewUserPayload = {
  userId: number;
  logbookId: number;
  income: number;
  savings: number;
  recurringPurchases: PayloadPurchase[];
  incomingPurchases: PayloadPurchase[];
  recurringEntry: OverviewEntry;
  incomingEntry: OverviewEntry;
} & GatedRoutePayload;
