import createCachedSelector from "re-reselect";

import { ReduxStore } from "@/redux";

export const fetchLogbookOverview = createCachedSelector(
  (state: ReduxStore) => state.entities.logbooks,
  (state: ReduxStore) => state.entities.overviews,
  (state: ReduxStore, logbookId: number | null) => logbookId,
  (logbooks, overviews, logbookId) => {
    if (logbooks && overviews && logbookId && logbooks[logbookId]) {
      const currentLogbook = logbooks[logbookId];
      if (overviews[currentLogbook.overview.id]) {
        return overviews[currentLogbook.overview.id];
      }
    }
  }
)((_state_, logbookId) => logbookId);
