import * as Saga from "redux-saga/effects";
import axios from "axios";
import Cookies from "js-cookie";

import * as Constants from "@/constants";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Types from "@/types";

enum LogbooksActions {
  FETCH_LOGBOOKS = "FETCH_LOGBOOKS",
  FETCH_LOGBOOK = "FETCH_LOGBOOK",
  CREATE_LOGBOOK = "CREATE_LOGBOOK",
  UPDATE_LOGBOOK = "UPDATE_LOGBOOK",
  DELETE_LOGBOOK = "DELETE_LOGBOOK",
}

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

export function fetchLogbooksRequest(): Types.SagaPayload<null> {
  return {
    type: LogbooksActions.FETCH_LOGBOOKS,
    payload: null,
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

function* fetchLogbooks() {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.LOGBOOKS,
      `/`
    );

		
  } catch (error: any) {
    console.error(error);
    yield Saga.put(
      Redux.uiActions.setNotification({
        body: error.response.data.body,
        caption: error.response.data.caption,
        status: "failure",
        timeout: 10000,
      })
    );
  }
}
