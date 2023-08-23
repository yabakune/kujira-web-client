import { PurchaseCategory } from "./api-models.types";

export type PurchaseUpdateFields = {
  id: number;
  category?: PurchaseCategory;
  description?: string;
  cost?: number;
};

export type UpdatePurchase = (updateFields: PurchaseUpdateFields) => void;

export type DeletePurchase = (id: number) => void;
