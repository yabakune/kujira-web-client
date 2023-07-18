import { PayloadAction } from "@reduxjs/toolkit";

import * as Types from "@/types";

import { EntitiesState } from "./entities-slice";

export const entriesReducer = {
  setEntries: (
    state: EntitiesState,
    action: PayloadAction<Types.NormalizedEntries>
  ) => {
    state.entries = action.payload;
  },
  setEntry: (state: EntitiesState, action: PayloadAction<Types.EntryModel>) => {
    if (state.entries) {
      console.log("Entry Payload:", action.payload);
      state.entries[action.payload.id] = action.payload;
    } else {
      state.entries = { [action.payload.id]: action.payload };
    }
  },
  deleteEntry: (
    state: EntitiesState,
    action: PayloadAction<{ logbookId: number }>
  ) => {
    if (state.entries) {
      delete state.entries[action.payload.logbookId];
    }
  },
};
