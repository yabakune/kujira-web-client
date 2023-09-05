import createCachedSelector from "re-reselect";
import { createSelector } from "@reduxjs/toolkit";

import { ReduxStore } from "@/redux";

export const fetchLogbookOverview = createCachedSelector(
  (state: ReduxStore) => state.entities.logbooks,
  (state: ReduxStore) => state.entities.overviews,
  (state: ReduxStore, logbookId: number | null) => logbookId,
  (logbooks, overviews, logbookId) => {
    if (logbooks && overviews && logbookId && logbooks[logbookId]) {
      const currentLogbook = logbooks[logbookId];
      const logbookOverview = overviews[currentLogbook.overview.id];
      return logbookOverview;
    }
  }
)((_state_, logbookId) => logbookId);

export const fetchLogbookOverviewId = createSelector(
  (state: ReduxStore) => state.entities.logbooks,
  (state: ReduxStore) => state.entities.overviews,
  (state: ReduxStore, logbookId: number | null) => logbookId,
  (logbooks, overviews, logbookId) => {
    if (logbooks && overviews && logbookId && logbooks[logbookId]) {
      const currentLogbook = logbooks[logbookId];
      const logbookOverview = overviews[currentLogbook.overview.id];
      return logbookOverview.id;
    }
  }
);

export const fetchLogbookOverviewIncome = createSelector(
  (state: ReduxStore) => state.entities.logbooks,
  (state: ReduxStore) => state.entities.overviews,
  (state: ReduxStore, logbookId: number | null) => logbookId,
  (logbooks, overviews, logbookId) => {
    if (logbooks && overviews && logbookId && logbooks[logbookId]) {
      const currentLogbook = logbooks[logbookId];
      const logbookOverview = overviews[currentLogbook.overview.id];
      return logbookOverview.income;
    }
  }
);

export const fetchLogbookOverviewSavings = createSelector(
  (state: ReduxStore) => state.entities.logbooks,
  (state: ReduxStore) => state.entities.overviews,
  (state: ReduxStore, logbookId: number | null) => logbookId,
  (logbooks, overviews, logbookId) => {
    if (logbooks && overviews && logbookId && logbooks[logbookId]) {
      const currentLogbook = logbooks[logbookId];
      const logbookOverview = overviews[currentLogbook.overview.id];
      return logbookOverview.savings;
    }
  }
);

export const recurringOverviewEntryTotalSpent = createSelector(
  (state: ReduxStore) => state.entities.logbooks,
  (state: ReduxStore) => state.entities.overviews,
  (state: ReduxStore) => state.entities.entries,
  (state: ReduxStore, logbookId: number | null) => logbookId,
  (logbooks, overviews, entries, logbookId) => {
    if (logbooks && overviews && entries && logbookId && logbooks[logbookId]) {
      const currentOverview = overviews[logbooks[logbookId].overview.id];
      for (const { id: entryId } of currentOverview.entries) {
        const currentEntry = entries[entryId];
        if (currentEntry && currentEntry.name === "Recurring") {
          return currentEntry.totalSpent;
        }
      }
      return 0;
    } else {
      return 0;
    }
  }
);
