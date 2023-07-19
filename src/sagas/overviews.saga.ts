import * as Saga from "redux-saga/effects";
import axios from "axios";
import { normalize, schema } from "normalizr";

import * as Constants from "@/constants";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Types from "@/types";

enum OverviewsActions {
  FETCH_OVERVIEWS = "FETCH_OVERVIEWS",
  FETCH_OVERVIEW = "FETCH_OVERVIEW",
  FETCH_USER_OVERVIEWS = "FETCH_USER_OVERVIEWS",
  CREATE_OVERVIEW = "CREATE_OVERVIEW",
  UPDATE_OVERVIEW = "UPDATE_OVERVIEW",
  DELETE_OVERVIEW = "DELETE_OVERVIEW",
}

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* fetchOverviews() {}

export default function* overviewsSaga() {
  yield Saga.all([
    Saga.takeEvery(OverviewsActions.FETCH_OVERVIEWS, fetchOverviews),
  ]);
}
