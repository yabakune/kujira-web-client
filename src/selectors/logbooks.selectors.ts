import createCachedSelector from "re-reselect";
import { createSelector } from "@reduxjs/toolkit";

import { ReduxStore } from "@/redux";

export const fetchLogbook = createCachedSelector(
  (state: ReduxStore) => state.entities.logbooks,
  (state: ReduxStore, logbookId: number | null) => logbookId,
  (logbooks, logbookId) => {
    if (logbooks && logbookId && logbooks[logbookId]) {
      return logbooks[logbookId];
    }
  }
)((_state_, logbookId) => logbookId);

export const fetchCurrentLogbookName = createSelector(
  (state: ReduxStore) => state.entities.logbooks,
  (state: ReduxStore, logbookId: number | null) => logbookId,
  (logbooks, logbookId) => {
    if (logbooks && logbookId && logbooks[logbookId]) {
      return `${logbooks[logbookId].name} Logbook`;
    }
  }
);

export const fetchCurrentLogbookEntries = createSelector(
  (state: ReduxStore) => state.entities.logbooks,
  (state: ReduxStore) => state.entities.entries,
  (state: ReduxStore, logbookId: number | null) => logbookId,
  (logbooks, entries, logbookId) => {
    if (logbooks && entries && logbookId && logbooks[logbookId]) {
      return logbooks[logbookId].entries.map(
        ({ id: entryId }: { id: number }) => {
          if (entries[entryId]) return entries[entryId];
        }
      );
    }
  }
);

export const logbookTotalSpent = createSelector(
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

export const logbookNonMonthlyTotalSpent = createSelector(
  (state: ReduxStore) => state.entities.logbooks,
  (state: ReduxStore) => state.entities.entries,
  (state: ReduxStore, logbookId: number | null) => logbookId,
  (logbooks, entries, logbookId) => {
    if (logbooks && entries && logbookId && logbooks[logbookId]) {
      let nonMonthlyTotalSpent = 0;
      const logbookEntryIds = logbooks[logbookId].entries;

      for (const { id: entryId } of logbookEntryIds) {
        if (entries[entryId]) {
          nonMonthlyTotalSpent += entries[entryId].nonMonthlyTotalSpent;
        }
      }

      return nonMonthlyTotalSpent;
    } else {
      return 0;
    }
  }
);
