import { PayloadAction } from "@reduxjs/toolkit";

import * as Types from "@/types";

import { EntitiesState } from "../slices/entities-slice";

export const purchasesReducers = {
  setPurchases: (
    state: EntitiesState,
    action: PayloadAction<Types.NormalizedPurchases>
  ) => {
    state.purchases = { ...state.purchases, ...action.payload };
  },
  setPurchase: (
    state: EntitiesState,
    action: PayloadAction<Types.PurchaseModel>
  ) => {
    if (state.purchases) state.purchases[action.payload.id] = action.payload;
  },
  deletePurchases: (
    state: EntitiesState,
    action: PayloadAction<number[]>
  ) => {
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
