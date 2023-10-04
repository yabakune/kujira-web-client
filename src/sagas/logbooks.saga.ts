import * as Saga from "redux-saga/effects";
import axios from "axios";
import { normalize, schema } from "normalizr";

import * as Constants from "@/constants";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Types from "@/types";

enum LogbooksActions {
  FETCH_LOGBOOKS = "FETCH_LOGBOOKS",
  FETCH_LOGBOOK = "FETCH_LOGBOOK",
  FETCH_USER_LOGBOOKS = "FETCH_USER_LOGBOOKS",
  CREATE_LOGBOOK = "CREATE_LOGBOOK",
  UPDATE_LOGBOOK = "UPDATE_LOGBOOK",
  DELETE_LOGBOOK = "DELETE_LOGBOOK",
}

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

export function fetchLogbooksRequest(
  payload: Types.FetchLogbooksPayload
): Types.SagaPayload<Types.FetchLogbooksPayload> {
  return {
    type: LogbooksActions.FETCH_LOGBOOKS,
    payload,
  };
}

export function fetchLogbookRequest(
  payload: Types.FetchLogbookPayload
): Types.SagaPayload<Types.FetchLogbookPayload> {
  return {
    type: LogbooksActions.FETCH_LOGBOOK,
    payload,
  };
}

export function fetchUserLogbooksRequest(
  payload: Types.FetchUserLogbooksPayload
): Types.SagaPayload<Types.FetchUserLogbooksPayload> {
  return {
    type: LogbooksActions.FETCH_USER_LOGBOOKS,
    payload,
  };
}

export function createLogbookRequest(
  payload: Types.CreateLogbookPayload
): Types.SagaPayload<Types.CreateLogbookPayload> {
  return {
    type: LogbooksActions.CREATE_LOGBOOK,
    payload,
  };
}

export function updateLogbookRequest(
  payload: Types.UpdateLogbookPayload
): Types.SagaPayload<Types.UpdateLogbookPayload> {
  return {
    type: LogbooksActions.UPDATE_LOGBOOK,
    payload,
  };
}

export function deleteLogbookRequest(
  payload: Types.DeleteLogbookPayload
): Types.SagaPayload<Types.DeleteLogbookPayload> {
  return {
    type: LogbooksActions.DELETE_LOGBOOK,
    payload,
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

const logbooksSchema = new schema.Entity("logbooks");
const logbooksSchemaList = new schema.Array(logbooksSchema);

function* fetchLogbooks(action: Types.SagaPayload<Types.FetchLogbooksPayload>) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.LOGBOOKS,
      `/`,
      action.payload.userId
    );
    const { data } = yield Saga.call(axios.get, endpoint);
    const normalizedData = normalize(data.response, logbooksSchemaList);
    // yield Saga.put(
    //   Redux.entitiesActions.setLogbooks(
    //     normalizedData.entities.logbooks as Types.NormalizedLogbooks
    //   )
    // );
  } catch (error: any) {
    console.error(error);
    yield Helpers.handleError(error);
  }
}

function* fetchLogbook(action: Types.SagaPayload<Types.FetchLogbookPayload>) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.LOGBOOKS,
      `/${action.payload.logbookId}`,
      action.payload.userId
    );
    const { data } = yield Saga.call(axios.get, endpoint);
    // yield Saga.put(Redux.entitiesActions.updateLogbook(data.response));
  } catch (error: any) {
    yield Helpers.handleError(error);
  }
}

function* fetchUserLogbooks(
  action: Types.SagaPayload<Types.FetchUserLogbooksPayload>
) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.LOGBOOKS,
      `/fetch-user-logbooks`,
      action.payload.userId
    );
    const { data } = yield Saga.call(axios.post, endpoint, {
      ownerId: action.payload.userId,
    });

    const normalizedData = normalize(data.response, logbooksSchemaList);

    yield Saga.put(
      Redux.entitiesActions.setLogbooks(
        normalizedData.entities.logbooks as Types.NormalizedLogbooks
      )
    );
  } catch (error: any) {
    yield Helpers.handleError(error);
  }
}

function* createLogbook(action: Types.SagaPayload<Types.CreateLogbookPayload>) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.LOGBOOKS,
      `/`,
      action.payload.ownerId
    );

    const { data } = yield Saga.call(axios.post, endpoint, action.payload);
    const normalizedData = normalize(data.response, logbooksSchema);
    yield Saga.put(
      Redux.entitiesActions.setLogbooks(
        normalizedData.entities.logbooks as Types.NormalizedLogbooks
      )
    );
    yield Saga.put(
      Redux.entitiesActions.updateUserLogbooks({ id: data.response.id })
    );

    yield Saga.put(
      Redux.uiActions.setNotification({
        body: data.body,
        status: "success",
        timeout: 5000,
      })
    );
  } catch (error: any) {
    yield Helpers.handleError(error);
  }
}

function* updateLogbook(action: Types.SagaPayload<Types.UpdateLogbookPayload>) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.LOGBOOKS,
      `/${action.payload.logbookId}`,
      action.payload.userId
    );
    const { userId, logbookId, ...updatePayload } = action.payload;
    const { data } = yield Saga.call(axios.patch, endpoint, updatePayload);
    // yield Saga.put(Redux.entitiesActions.updateLogbook(data.response));

    yield Saga.put(
      Redux.uiActions.setNotification({
        body: data.body,
        status: "success",
        timeout: 5000,
      })
    );
  } catch (error: any) {
    yield Helpers.handleError(error);
  }
}

function* deleteLogbook(action: Types.SagaPayload<Types.DeleteLogbookPayload>) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.LOGBOOKS,
      `/${action.payload.logbookId}`,
      action.payload.userId
    );
    const { data } = yield Saga.call(axios.delete, endpoint);
    // yield Saga.put(Redux.entitiesActions.deleteLogbook(data.response));

    yield Saga.put(
      Redux.uiActions.setNotification({
        body: data.body,
        status: "success",
        timeout: 5000,
      })
    );
  } catch (error: any) {
    yield Helpers.handleError(error);
  }
}

export default function* logbooksSaga() {
  yield Saga.all([
    Saga.takeEvery(LogbooksActions.FETCH_LOGBOOKS, fetchLogbooks),
    Saga.takeEvery(LogbooksActions.FETCH_LOGBOOK, fetchLogbook),
    Saga.takeEvery(LogbooksActions.FETCH_USER_LOGBOOKS, fetchUserLogbooks),
    Saga.takeEvery(LogbooksActions.CREATE_LOGBOOK, createLogbook),
    Saga.takeEvery(LogbooksActions.UPDATE_LOGBOOK, updateLogbook),
    Saga.takeEvery(LogbooksActions.DELETE_LOGBOOK, deleteLogbook),
  ]);
}
