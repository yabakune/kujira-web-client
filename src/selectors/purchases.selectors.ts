import { createSelector } from "@reduxjs/toolkit";

import { ReduxStore } from "@/redux";

export const fetchEntryPurchases = createSelector(
  (state: ReduxStore) => state.entities.entries,
  (state: ReduxStore) => state.entities.purchases,
  (state: ReduxStore, entryId: number | undefined) => entryId,
  (entries, purchases, entryId) => {
    if (entries && purchases && entryId && entries[entryId]) {
      const entryPurchases = entries[entryId].purchases;
      if (entryPurchases) {
        return entryPurchases.map((purchaseId: number) => {
          if (purchases[purchaseId]) return purchases[purchaseId];
        });
      }
    }
  }
);
