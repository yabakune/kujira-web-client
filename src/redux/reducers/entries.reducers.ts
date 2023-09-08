import { PayloadAction } from "@reduxjs/toolkit";

import * as Types from "@/types";

import { EntitiesState } from "../slices/entities-slice";

export const entriesReducers = {
  setEntries: (
    state: EntitiesState,
    action: PayloadAction<Types.NormalizedEntries>
  ) => {
    state.entries = { ...state.entries, ...action.payload };
  },

  updateEntry: (
    state: EntitiesState,
    action: PayloadAction<Types.EntryModel>
  ) => {
    if (state.entries) state.entries[action.payload.id] = action.payload;
  },

  addEntryIdToLogbook: (
    state: EntitiesState,
    action: PayloadAction<{ logbookId: number; entryId: number }>
  ) => {
    if (state.logbooks) {
      const { logbookId, entryId } = action.payload;
      if (state.logbooks[logbookId]) {
        state.logbooks[logbookId].entries = [
          { id: entryId },
          ...state.logbooks[logbookId].entries,
        ];
      }
    }
  },

  deleteEntry: (state: EntitiesState, action: PayloadAction<number>) => {
    if (state.entries && state.entries[action.payload]) {
      delete state.entries[action.payload];
    }
  },
};
