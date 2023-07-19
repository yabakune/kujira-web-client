import { PayloadAction } from "@reduxjs/toolkit";

import * as Types from "@/types";

import { EntitiesState } from "./entities-slice";

export const overviewsReducers = {
  setOverviews: (
    state: EntitiesState,
    action: PayloadAction<Types.NormalizedOverviews>
  ) => {
    if (state.overviews) {
      state.overviews = { ...state.overviews, ...action.payload };
    } else {
      state.overviews = action.payload;
    }
  },
  setOverview: (
    state: EntitiesState,
    action: PayloadAction<Types.OverviewModel>
  ) => {
    if (state.overviews) {
      state.overviews[action.payload.id] = action.payload;
    } else {
      state.overviews = { [action.payload.id]: action.payload };
    }
  },
  deleteOverview: (
    state: EntitiesState,
    action: PayloadAction<{ overviewId: number }>
  ) => {
    if (state.overviews) {
      delete state.overviews[action.payload.overviewId];
    }
  },
};
