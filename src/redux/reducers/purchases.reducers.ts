import { PayloadAction } from "@reduxjs/toolkit";

import * as Types from "@/types";

import { EntitiesState } from "../slices/entities-slice";

export const purchasesReducers = {
  setPurchases: (
    state: EntitiesState,
    action: PayloadAction<Types.NormalizedPurchases>
  ) => {
    state.purchases = action.payload;
  },
};
