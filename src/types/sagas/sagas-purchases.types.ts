import { GatedRoutePayload } from "./sagas.types";
import { PurchaseModel } from "../api-models.types";

export type FetchPurchasesPayload = {} & GatedRoutePayload;

export type FetchPurchasePayload = {
  purchaseId: number;
} & GatedRoutePayload;

export type fetchEntryPurchasesPayload = {
  entryId: number;
} & GatedRoutePayload;

export type createPurchase = Omit<
  PurchaseModel,
  "id" | "createdAt" | "updatedAt"
> &
  GatedRoutePayload;

export type updatePurchase = Partial<
  Omit<PurchaseModel, "id" | "createdAt" | "updatedAt">
> &
  GatedRoutePayload;

export type bulkDeletePurchase = {
  purchaseIds: number[];
} & GatedRoutePayload;

export type deleteEntryPurchases = {
  entryId: number;
} & GatedRoutePayload;

export type deletePurchase = {
  purchaseId: number;
} & GatedRoutePayload;
