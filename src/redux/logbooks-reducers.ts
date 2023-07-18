import { PayloadAction } from "@reduxjs/toolkit";

import * as Types from "@/types";

import { EntitiesState } from "./entities-slice";

export const logbooksReducers = {
  setLogbooks: (
    state: EntitiesState,
    action: PayloadAction<Types.NormalizedLogbooks>
  ) => {
    state.logbooks = action.payload;
  },
  setLogbook: (
    state: EntitiesState,
    action: PayloadAction<Types.LogbookModel>
  ) => {
    if (state.logbooks) {
      state.logbooks[action.payload.id] = action.payload;
    }
  },
  deleteLogbook: (
    state: EntitiesState,
    action: PayloadAction<{ logbookId: number }>
  ) => {
    if (state.logbooks) {
      delete state.logbooks[action.payload.logbookId];
    }
  },
};