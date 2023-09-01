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
