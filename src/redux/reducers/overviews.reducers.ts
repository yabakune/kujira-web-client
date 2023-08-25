import { PayloadAction } from "@reduxjs/toolkit";

import * as Types from "@/types";

import { EntitiesState } from "../slices/entities-slice";

export const overviewsReducers = {
  setOverviews: (
    state: EntitiesState,
    action: PayloadAction<Types.NormalizedOverviews>
  ) => {
    state.overviews = action.payload;
  },
  setOverview: (
    state: EntitiesState,
    action: PayloadAction<Types.OverviewModel>
  ) => {
    if (state.overviews) state.overviews[action.payload.id] = action.payload;
  },
};
