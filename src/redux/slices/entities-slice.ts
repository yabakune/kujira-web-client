import { createSlice } from "@reduxjs/toolkit";

import * as Types from "@/types";

import { usersReducers } from "../reducers/users-reducers";

export type EntitiesState = {
  currentUser: Types.UserModel | null;
};

const initialState: EntitiesState = {
  currentUser: null,
};

export const entitiesSlice = createSlice({
  name: "entitiesSlice",
  initialState,
  reducers: {
    ...usersReducers,
  },
});

export const entitiesActions = entitiesSlice.actions;
export const entitiesReducer = entitiesSlice.reducer;
