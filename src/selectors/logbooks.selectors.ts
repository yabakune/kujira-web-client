import { createSelector } from "@reduxjs/toolkit";

import { ReduxStore } from "@/redux";

export const fetchLogbook = createSelector(
  (state: ReduxStore) => state.entities.logbooks,
  (state: ReduxStore, logbookId: number) => logbookId,
  (logbooks, logbookId) => {
    if (logbooks && logbooks[logbookId]) {
      return logbooks[logbookId];
    }
  }
);
