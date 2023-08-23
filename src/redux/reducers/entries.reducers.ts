import { PayloadAction } from "@reduxjs/toolkit";

import * as Types from "@/types";

import { EntitiesState } from "../slices/entities-slice";

export const entriesReducers = {
  setEntries: (
    state: EntitiesState,
    action: PayloadAction<Types.NormalizedEntries>
  ) => {
    state.entries = action.payload;
  },
};
