import createCachedSelector from "re-reselect";
import { createSelector } from "@reduxjs/toolkit";

import { ReduxStore } from "@/redux";

export const fetchLogbook = createCachedSelector(
  (state: ReduxStore) => state.entities.logbooks,
  (state: ReduxStore, logbookId: number) => logbookId,
  (logbooks, logbookId) => {
    if (logbooks && logbooks[logbookId]) return logbooks[logbookId];
  }
)((_state_, logbookId) => logbookId);

export const calculateLogbookEntriesTotalSpent = createSelector(
  (state: ReduxStore) => state.entities.logbooks,
  (state: ReduxStore) => state.entities.entries,
  (state: ReduxStore, logbookId: number | null) => logbookId,
  (logbooks, entries, logbookId) => {
    if (logbooks && entries && logbookId && logbooks[logbookId]) {
      let entriesTotalSpent = 0;
      const logbookEntryIds = logbooks[logbookId].entries;

      for (const { id: entryId } of logbookEntryIds) {
        if (entries[entryId]) {
          entriesTotalSpent += entries[entryId].totalSpent;
        }
      }

      return entriesTotalSpent;
    } else {
      return 0;
    }
  }
);
