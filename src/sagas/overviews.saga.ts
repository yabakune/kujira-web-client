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
  FETCH_LOGBOOK_OVERVIEW = "FETCH_LOGBOOK_OVERVIEW",
  CREATE_OVERVIEW = "CREATE_OVERVIEW",
  UPDATE_OVERVIEW = "UPDATE_OVERVIEW",
  DELETE_OVERVIEW = "DELETE_OVERVIEW",
}

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

export function fetchLogbookOverviewRequest(
  payload: Types.FetchLogbookOverviewPayload
): Types.SagaPayload<Types.FetchLogbookOverviewPayload> {
  return {
    type: OverviewsActions.FETCH_LOGBOOK_OVERVIEW,
    payload,
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

const overviewSchema = new schema.Entity("overview");
const overviewSchemas = new schema.Array(overviewSchema);

function* fetchLogbookOverview(
  action: Types.SagaPayload<Types.FetchLogbookOverviewPayload>
) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.OVERVIEWS,
      `/fetch-logbook-overview`,
      action.payload.userId
    );
    const { userId, ...fetchPayload } = action.payload;
    const { data } = yield Saga.call(axios.post, endpoint, fetchPayload);
    const normalizedData = normalize(data.response, overviewSchema);

    yield Saga.put(
      Redux.entitiesActions.setOverviews(
        normalizedData.entities.overview as Types.NormalizedOverviews
      )
    );
  } catch (error) {
    console.error(error);
    yield Helpers.handleError(error);
  }
}

export default function* overviewsSaga() {
  yield Saga.all([
    Saga.takeEvery(
      OverviewsActions.FETCH_LOGBOOK_OVERVIEW,
      fetchLogbookOverview
    ),
  ]);
}
