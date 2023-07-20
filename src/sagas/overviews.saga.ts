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

export function fetchOverviewsRequest(
  payload: Types.FetchOverviewsPayload
): Types.SagaPayload<Types.FetchOverviewsPayload> {
  return {
    type: OverviewsActions.FETCH_OVERVIEWS,
    payload,
  };
}

export function fetchOverviewRequest(
  payload: Types.FetchOverviewPayload
): Types.SagaPayload<Types.FetchOverviewPayload> {
  return {
    type: OverviewsActions.FETCH_OVERVIEW,
    payload,
  };
}

export function fetchLogbookOverviewRequest(
  payload: Types.FetchLogbookOverviewPayload
): Types.SagaPayload<Types.FetchLogbookOverviewPayload> {
  return {
    type: OverviewsActions.FETCH_LOGBOOK_OVERVIEW,
    payload,
  };
}

export function createOverviewRequest(
  payload: Types.CreateOverviewPayload
): Types.SagaPayload<Types.CreateOverviewPayload> {
  return {
    type: OverviewsActions.CREATE_OVERVIEW,
    payload,
  };
}

export function updateOverviewRequest(
  payload: Types.UpdateOverviewPayload
): Types.SagaPayload<Types.UpdateOverviewPayload> {
  return {
    type: OverviewsActions.UPDATE_OVERVIEW,
    payload,
  };
}

export function deleteOverviewRequest(
  payload: Types.DeleteOverviewPayload
): Types.SagaPayload<Types.DeleteOverviewPayload> {
  return {
    type: OverviewsActions.DELETE_OVERVIEW,
    payload,
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

const overviewsSchema = new schema.Entity("overviews");
const overviewsSchemaList = new schema.Array(overviewsSchema);

function* fetchOverviews(
  action: Types.SagaPayload<Types.FetchOverviewsPayload>
) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.OVERVIEWS,
      `/`,
      action.payload.userId
    );
    const { data } = yield Saga.call(axios.get, endpoint);
    const normalizedData = normalize(data.response, overviewsSchemaList);

    yield Saga.put(
      Redux.entitiesActions.setOverviews(
        normalizedData.entities.overviews as Types.NormalizedOverviews
      )
    );
  } catch (error) {
    console.error(error);
    yield Helpers.handleError(error);
  }
}

function* fetchOverview(action: Types.SagaPayload<Types.FetchOverviewPayload>) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.OVERVIEWS,
      `/${action.payload.overviewId}`,
      action.payload.userId
    );
    const { data } = yield Saga.call(axios.post, endpoint);

    yield Saga.put(Redux.entitiesActions.setOverview(data.response));
  } catch (error) {
    console.error(error);
    yield Helpers.handleError(error);
  }
}

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
    const normalizedData = normalize(data.response, overviewsSchema);

    yield Saga.put(
      Redux.entitiesActions.setOverviews(
        normalizedData.entities.overviews as Types.NormalizedOverviews
      )
    );
  } catch (error) {
    console.error(error);
    yield Helpers.handleError(error);
  }
}

function* createOverview(
  action: Types.SagaPayload<Types.CreateOverviewPayload>
) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.OVERVIEWS,
      `/`,
      action.payload.userId
    );
    const { userId, ...createPayload } = action.payload;
    const { data } = yield Saga.call(axios.post, endpoint, createPayload);

    yield Saga.put(Redux.entitiesActions.setOverview(data.response));

    yield Saga.put(
      Redux.uiActions.setNotification({
        body: data.body,
        status: "success",
        timeout: 5000,
      })
    );
  } catch (error) {
    console.error(error);
    yield Helpers.handleError(error);
  }
}

function* updateOverview(
  action: Types.SagaPayload<Types.UpdateOverviewPayload>
) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.OVERVIEWS,
      `/${action.payload.overviewId}`,
      action.payload.userId
    );
    const { userId, ...updatePayload } = action.payload;
    const { data } = yield Saga.call(axios.post, endpoint, updatePayload);

    yield Saga.put(Redux.entitiesActions.setOverview(data.response));

    yield Saga.put(
      Redux.uiActions.setNotification({
        body: data.body,
        status: "success",
        timeout: 5000,
      })
    );
  } catch (error) {
    console.error(error);
    yield Helpers.handleError(error);
  }
}

function* deleteOverview(
  action: Types.SagaPayload<Types.DeleteOverviewPayload>
) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.OVERVIEWS,
      `/${action.payload.overviewId}`,
      action.payload.userId
    );
    const { data } = yield Saga.call(axios.delete, endpoint);

    yield Saga.put(Redux.entitiesActions.deleteOverview(data.response));

    yield Saga.put(
      Redux.uiActions.setNotification({
        body: data.body,
        status: "success",
        timeout: 5000,
      })
    );
  } catch (error) {
    console.error(error);
    yield Helpers.handleError(error);
  }
}

export default function* overviewsSaga() {
  yield Saga.all([
    Saga.takeEvery(OverviewsActions.FETCH_OVERVIEWS, fetchOverviews),
    Saga.takeEvery(OverviewsActions.FETCH_OVERVIEW, fetchOverview),
    Saga.takeEvery(
      OverviewsActions.FETCH_LOGBOOK_OVERVIEW,
      fetchLogbookOverview
    ),
    Saga.takeEvery(OverviewsActions.CREATE_OVERVIEW, createOverview),
    Saga.takeEvery(OverviewsActions.UPDATE_OVERVIEW, updateOverview),
    Saga.takeEvery(OverviewsActions.DELETE_OVERVIEW, deleteOverview),
  ]);
}
