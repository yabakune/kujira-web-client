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
      
      if (entryPurchases && !entryPurchases.includes({ id: purchase.id })) {
        state.entries[entryId].purchases = [
          ...entryPurchases,
          { id: purchase.id },
        ];
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
