import createCachedSelector from "re-reselect";
import { createSelector } from "@reduxjs/toolkit";

import { ReduxStore } from "@/redux";

export const fetchEntry = createCachedSelector(
  (state: ReduxStore) => state.entities.entries,
  (state: ReduxStore, entryId: number) => entryId,
  (entries, entryId) => {
    if (entries && entries[entryId]) return entries[entryId];
  }
)((_state_, entryId) => entryId);

export const fetchRecurringOverviewEntry = createSelector(
  (state: ReduxStore) => state.entities.entries,
  (entries) => {
    if (entries) {
      for (const entry of Object.values(entries)) {
        if (entry.name === "Recurring") return entry;
      }
    }
  }
);

export const fetchIncomingOverviewEntry = createSelector(
  (state: ReduxStore) => state.entities.entries,
  (entries) => {
    if (entries) {
      for (const entry of Object.values(entries)) {
        if (entry.name === "Incoming") return entry;
      }
    }
  }
);

export const fetchOverviewEntries = createSelector(
  (state: ReduxStore) => state.entities.overviews,
  (state: ReduxStore) => state.entities.entries,
  (state: ReduxStore, overviewId?: number) => overviewId,
  (overviews, entries, overviewId) => {
    if (overviews && entries && overviewId && overviews[overviewId]) {
      return overviews[overviewId].entries.map((entry: { id: number }) => {
        if (entries[entry.id]) return entries[entry.id];
      });
    }
  }
);

export const fetchEntryTotalSpent = createCachedSelector(
  (state: ReduxStore) => state.entities.entries,
  (state: ReduxStore, entryId: number) => entryId,
  (entries, entryId) => {
    if (entries && entries[entryId]) return entries[entryId].totalSpent;
  }
)((_state_, entryId) => entryId);
