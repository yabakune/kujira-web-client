import { createSelector } from "@reduxjs/toolkit";

import { ReduxStore } from "@/redux";

export const selectLogbookOverview = createSelector(
  (state: ReduxStore) => state.entities.logbooks,
  (state: ReduxStore) => state.entities.overviews,
  (state: ReduxStore, logbookId: number | null) => logbookId,
  (logbooks, overviews, logbookId) => {
    if (logbooks && logbookId && logbooks[logbookId] && overviews) {
      return overviews[logbooks[logbookId].overview.id];
    }
  }
);
