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
};
