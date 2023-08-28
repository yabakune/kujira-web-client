import { createSelector } from "@reduxjs/toolkit";

import { ReduxStore } from "@/redux";

export const fetchCurrentUser = createSelector(
  (state: ReduxStore) => state.entities.currentUser,
  (currentUser) => currentUser
);
