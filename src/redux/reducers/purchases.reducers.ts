import { PayloadAction } from "@reduxjs/toolkit";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

import { EntitiesState } from "../slices/entities-slice";

export const purchasesReducers = {
  setPurchases: (
    state: EntitiesState,
    action: PayloadAction<Types.NormalizedPurchases>
  ) => {
    state.purchases = { ...state.purchases, ...action.payload };
  },

  addPurchaseToEntries: (
    state: EntitiesState,
    action: PayloadAction<{ purchase: Types.PurchaseModel; entryId: number }>
  ) => {
    const { purchase, entryId } = action.payload;

    if (state.purchases) state.purchases[purchase.id] = purchase;

    if (state.entries && state.entries[entryId]) {
      const entryPurchases = state.entries[entryId].purchases;
      if (entryPurchases && !entryPurchases.includes(purchase.id)) {
        state.entries[entryId].purchases = [...entryPurchases, purchase.id];
      }
    }
  },

  addPurchasesToEntry: (
    state: EntitiesState,
    action: PayloadAction<{ entryId: number; purchases: Types.PurchaseModel[] }>
  ) => {
    const { entryId, purchases } = action.payload;

    if (state.entries && state.entries[entryId]) {
      const entryPurchaseIds = state.entries[entryId].purchases;

      const newPurchaseIds: number[] = [];

      for (const purchase of purchases) {
        newPurchaseIds.push(purchase.id);
      }

      if (entryPurchaseIds) {
        const updatedPurchaseIds = Helpers.sortArray(
          Helpers.removeDuplicatesFromArray([
            ...entryPurchaseIds,
            ...newPurchaseIds,
          ])
        );
        state.entries[entryId].purchases = updatedPurchaseIds;
      } else {
        const updatedPurchaseIds = Helpers.sortArray(
          Helpers.removeDuplicatesFromArray(newPurchaseIds)
        );
        state.entries[entryId].purchases = updatedPurchaseIds;
      }
    }
  },

  updatePurchase: (
    state: EntitiesState,
    action: PayloadAction<Types.PurchaseModel>
  ) => {
    if (state.purchases) state.purchases[action.payload.id] = action.payload;
  },

  deletePurchases: (state: EntitiesState, action: PayloadAction<number[]>) => {
    if (state.purchases) {
      for (const purchaseId of action.payload) {
        if (state.purchases[purchaseId]) {
          delete state.purchases[purchaseId];
        }
      }
    }
  },

  deletePurchase: (state: EntitiesState, action: PayloadAction<number>) => {
    if (state.purchases && state.purchases[action.payload]) {
      delete state.purchases[action.payload];
    }
  },
};
