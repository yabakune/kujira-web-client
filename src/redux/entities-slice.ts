import { createSlice } from "@reduxjs/toolkit";

import * as Types from "@/types";

import { usersReducers } from "./users-reducers";
import { overviewsReducers } from "./overviews-reducers";
import { logbooksReducers } from "./logbooks-reducers";
import { entriesReducer } from "./entries-reducers";

export type EntitiesState = {
  currentUser: Types.UserModel | null;
  overviews: Types.NormalizedOverviews | null;
  logbooks: Types.NormalizedLogbooks | null;
  entries: Types.NormalizedEntries | null;
  purchases: Types.NormalizedPurchases | null;
  bugReports: Types.NormalizedBugReports | null;
};

const initialState: EntitiesState = {
  currentUser: null,
  overviews: null,
  logbooks: null,
  entries: null,
  purchases: null,
  bugReports: null,
};

export const entitiesSlice = createSlice({
  name: "entitiesSlice",
  initialState,
  reducers: {
    ...usersReducers,
    ...overviewsReducers,
    ...logbooksReducers,
    ...entriesReducer,
  },
});

export const entitiesActions = entitiesSlice.actions;
export const entitiesReducer = entitiesSlice.reducer;
