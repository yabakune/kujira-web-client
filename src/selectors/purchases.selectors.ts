import { createSelector } from "@reduxjs/toolkit";

import { ReduxStore } from "@/redux";

export const fetchEntryPurchase = createSelector(
  (state: ReduxStore) => state.entities.entries,
  (state: ReduxStore) => state.entities.purchases,
  (state: ReduxStore, entryId: number | undefined) => entryId,
  (entries, purchases, entryId) => {
    if (entries && purchases && entryId && entries[entryId]) {
      return entries[entryId].purchases.map(({ id }: { id: number }) => {
        if (purchases[id]) return purchases[id];
      });
    }
  }
);
