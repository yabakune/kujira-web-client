import { PayloadAction } from "@reduxjs/toolkit";

import * as Types from "@/types";

import { EntitiesState } from "./entities-slice";

type UserRelation = "overviewIds" | "logbookIds" | "bugReportIds";

export const usersReducers = {
  setCurrentUser: (
    state: EntitiesState,
    action: PayloadAction<Types.UserModel>
  ) => {
    state.currentUser = action.payload;
  },
  updateCurrentUserRelations: (
    state: EntitiesState,
    action: PayloadAction<{
      relation: UserRelation;
      relationalIds: number[];
    }>
  ) => {
    if (state.currentUser) {
      const { relation, relationalIds } = action.payload;
      state.currentUser[relation] = relationalIds;
    }
  },
  logoutUser: (state: EntitiesState) => {
    state.currentUser = null;
  },
};
