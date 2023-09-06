import { GatedRoutePayload } from "./sagas.types";
import { PurchaseModel } from "../api-models.types";

export type FetchPurchasesPayload = {} & GatedRoutePayload;

export type FetchPurchasePayload = {
  purchaseId: number;
} & GatedRoutePayload;

export type FetchEntryPurchasesPayload = {
  entryId: number;
} & GatedRoutePayload;

export type CreatePurchasePayload = Omit<
  PurchaseModel,
  "id" | "placement" | "createdAt" | "updatedAt"
> &
  GatedRoutePayload;

export type UpdatePurchasePayload = Partial<
  Omit<PurchaseModel, "id" | "createdAt" | "updatedAt">
> & { purchaseId: number } & GatedRoutePayload;

export type BulkDeletePurchasesPayload = {
  purchaseIds: number[];
} & GatedRoutePayload;

export type DeleteEntryPurchasesPayload = {
  entryId: number;
} & GatedRoutePayload;

export type DeletePurchasePayload = {
  purchaseId: number;
} & GatedRoutePayload;
