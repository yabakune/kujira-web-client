import { PayloadAction } from "@reduxjs/toolkit";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

import { EntitiesState } from "./entities-slice";

export const logbooksReducers = {
  setLogbooks: (
    state: EntitiesState,
    action: PayloadAction<{
      logbooks: Types.NormalizedLogbooks;
      logbookIds: number[];
    }>
  ) => {
    state.logbooks = action.payload.logbooks;
    if (state.currentUser) {
      const userWithLogbookIds = Helpers.deepCopy(state.currentUser);
      userWithLogbookIds.logbookIds = action.payload.logbookIds;
      // state.currentUser = userWithLogbookIds;

      // state.currentUser.logbookIds = action.payload.logbookIds;

      console.log("userWithLogbookIds:", userWithLogbookIds);
    }
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
