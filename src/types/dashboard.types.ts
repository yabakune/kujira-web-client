import { PurchaseCategory } from "./api-models.types";

export type PurchaseUpdateFields = {
  placement?: number;
  category?: PurchaseCategory;
  description?: string;
  cost?: number;
};

export type UpdatePurchase = (updateFields: PurchaseUpdateFields) => void;

export type DeletePurchase = (id: number) => void;

export type SettingsPage = "Personal" | "Security" | "Personalize" | "Feedback";

export type SelectedPurchases = {
  [key: number]: number;
};
