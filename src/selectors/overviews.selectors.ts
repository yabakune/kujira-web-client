import { createSelector } from "@reduxjs/toolkit";

import { ReduxStore } from "@/redux";

export const fetchLogbookOverview = createSelector(
  (state: ReduxStore) => state.entities.logbooks,
  (state: ReduxStore) => state.entities.overviews,
  (state: ReduxStore, logbookId: number) => logbookId,
  (logbooks, overviews, logbookId) => {
    if (logbooks && overviews && logbooks[logbookId]) {
      const currentLogbook = logbooks[logbookId];
      return overviews[currentLogbook.overview.id];
    }
  }
);
