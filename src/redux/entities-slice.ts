import { createSlice } from "@reduxjs/toolkit";

import * as Types from "@/types";

import { usersReducers } from "./users-reducers";

export type EntitiesState = {
  currentUser: Types.UserModel | null;
  overviews: Types.OverviewModel | null;
  logbooks: Types.LogbookModel | null;
  entries: Types.EntryModel | null;
  purchases: Types.PurchaseModel | null;
  bugReports: Types.BugReportModel | null;
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
  reducers: { ...usersReducers },
});

export const entitiesActions = entitiesSlice.actions;
export const entitiesReducer = entitiesSlice.reducer;
