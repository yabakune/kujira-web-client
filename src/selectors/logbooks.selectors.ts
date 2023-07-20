import { createSelector } from "@reduxjs/toolkit";

import { ReduxStore } from "@/redux";

export const selectLogbook = createSelector(
  (state: ReduxStore) => state.entities.logbooks,
  (state: ReduxStore, logbookId: number | null) => logbookId,
  (logbooks, logbookId) => {
    if (logbooks && logbookId && logbooks[logbookId]) {
      return logbooks[logbookId];
    }
  }
);
