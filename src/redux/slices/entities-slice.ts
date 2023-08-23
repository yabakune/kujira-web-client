import { createSlice } from "@reduxjs/toolkit";

import * as Types from "@/types";

import { usersReducers } from "../reducers/users.reducers";
import { overviewsReducers } from "../reducers/overviews.reducers";
import { logbooksReducers } from "../reducers/logbooks.reducers";
import { entriesReducers } from "../reducers/entries.reducers";

export type EntitiesState = {
  currentUser: Types.UserModel | null;
  overviews: Types.NormalizedOverviews | null;
  logbooks: Types.NormalizedLogbooks | null;
  entries: Types.NormalizedEntries | null;
};

const initialState: EntitiesState = {
  currentUser: null,
  overviews: null,
  logbooks: null,
  entries: null,
};

export const entitiesSlice = createSlice({
  name: "entitiesSlice",
  initialState,
  reducers: {
    ...usersReducers,
    ...overviewsReducers,
    ...logbooksReducers,
    ...entriesReducers
  },
});

export const entitiesActions = entitiesSlice.actions;
export const entitiesReducer = entitiesSlice.reducer;
