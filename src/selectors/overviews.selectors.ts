import { createSelector } from "@reduxjs/toolkit";

import { ReduxStore } from "@/redux";

export const selectLogbookOverview = createSelector(
  (state: ReduxStore) => state.entities.logbooks,
  (state: ReduxStore) => state.entities.overviews,
  (state: ReduxStore, logbookId: number | null) => logbookId,
  (logbooks, overviews, logbookId) => {
    if (logbooks && overviews && logbookId && logbooks[logbookId]) {
      return overviews[logbooks[logbookId].overview.id];
    }
  }
);

export const selectOverviewEntries = createSelector(
  (state: ReduxStore) => state.entities.logbooks,
  (state: ReduxStore) => state.entities.overviews,
  (state: ReduxStore) => state.entities.entries,
  (state: ReduxStore, logbookId: number | null) => logbookId,
  (logbooks, overviews, entries, logbookId) => {
    if (logbooks && overviews && entries && logbookId) {
      if (logbooks[logbookId] && logbooks[logbookId].overview.id) {
        const currentOverview = overviews[logbooks[logbookId].overview.id];
        return currentOverview.entries.map(({ id }: { id: number }) => {
          return entries[id];
        });
      }
    }
  }
);
