import { PayloadAction } from "@reduxjs/toolkit";

import * as Types from "@/types";

import { EntitiesState } from "../slices/entities-slice";

export const logbooksReducers = {
  setLogbooks: (
    state: EntitiesState,
    action: PayloadAction<Types.NormalizedLogbooks>
  ) => {
    state.logbooks = { ...state.logbooks, ...action.payload };
  },
  updateLogbook: (
    state: EntitiesState,
    action: PayloadAction<Types.LogbookModel>
  ) => {
    if (state.logbooks) state.logbooks[action.payload.id] = action.payload;
  },
};
