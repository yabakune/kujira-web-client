import { createSelector } from "@reduxjs/toolkit";

import { ReduxStore } from "@/redux";

export const fetchOverviewEntries = createSelector(
  (state: ReduxStore) => state.entities.overviews,
  (state: ReduxStore) => state.entities.entries,
  (overviews, entries) => {
    if (overviews && entries) {
      const currentOverview = Object.values(overviews)[0];
      const { entries } = currentOverview;
      return entries.map((entry: { id: number }) => entries[entry.id]);
    }
  }
);
