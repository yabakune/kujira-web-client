import * as Saga from "redux-saga/effects";
import axios from "axios";
import { normalize, schema } from "normalizr";

import * as Constants from "@/constants";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Types from "@/types";

enum EntriesActions {
  FETCH_ENTRIES = "FETCH_ENTRIES",
  FETCH_ENTRY = "FETCH_ENTRY",
  FETCH_OVERVIEW_ENTRIES = "FETCH_OVERVIEW_ENTRIES",
  FETCH_LOGBOOK_ENTRIES = "FETCH_LOGBOOK_ENTRIES",
  CREATE_ENTRY = "CREATE_ENTRY",
  UPDATE_ENTRY = "UPDATE_ENTRY",
  DELETE_ENTRY = "DELETE_ENTRY",
}

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

export function fetchEntriesRequest(
  payload: Types.FetchEntriesPayload
): Types.SagaPayload<Types.FetchEntriesPayload> {
  return {
    type: EntriesActions.FETCH_ENTRIES,
    payload,
  };
}

export function fetchEntryRequest(
  payload: Types.FetchEntryPayload
): Types.SagaPayload<Types.FetchEntryPayload> {
  return {
    type: EntriesActions.FETCH_ENTRY,
    payload,
  };
}

export function fetchOverviewEntriesRequest(
  payload: Types.FetchOverviewEntriesPayload
): Types.SagaPayload<Types.FetchOverviewEntriesPayload> {
  return {
    type: EntriesActions.FETCH_OVERVIEW_ENTRIES,
    payload,
  };
}

export function fetchLogbookEntriesRequest(
  payload: Types.FetchLogbookEntriesPayload
): Types.SagaPayload<Types.FetchLogbookEntriesPayload> {
  return {
    type: EntriesActions.FETCH_LOGBOOK_ENTRIES,
    payload,
  };
}

export function createEntryRequest(
  payload: Types.CreateEntryPayload
): Types.SagaPayload<Types.CreateEntryPayload> {
  return {
    type: EntriesActions.CREATE_ENTRY,
    payload,
  };
}

export function updateEntryRequest(
  payload: Types.UpdateEntryPayload
): Types.SagaPayload<Types.UpdateEntryPayload> {
  return {
    type: EntriesActions.UPDATE_ENTRY,
    payload,
  };
}

export function deleteEntryRequest(
  payload: Types.DeleteEntryPayload
): Types.SagaPayload<Types.DeleteEntryPayload> {
  return {
    type: EntriesActions.DELETE_ENTRY,
    payload,
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

const entriesSchema = new schema.Entity("entries");
const entriesSchemaList = new schema.Array(entriesSchema);

function* fetchEntries(action: Types.SagaPayload<Types.FetchEntriesPayload>) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.ENTRIES,
      `/`,
      action.payload.userId
    );
    const { data } = yield Saga.call(axios.get, endpoint);
    const normalizedData = normalize(data.response, entriesSchemaList);

    // yield Saga.put(
    //   Redux.entitiesActions.setEntries(
    //     normalizedData.entities.entries as Types.NormalizedEntries
    //   )
    // );
  } catch (error: any) {
    console.error(error);
    yield Helpers.handleError(error);
  }
}

function* fetchEntry(action: Types.SagaPayload<Types.FetchEntryPayload>) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.ENTRIES,
      `/${action.payload.entryId}`,
      action.payload.userId
    );
    const { data } = yield Saga.call(axios.get, endpoint);

    // yield Saga.put(Redux.entitiesActions.updateEntry(data.response));
  } catch (error: any) {
    console.error(error);
    yield Helpers.handleError(error);
  }
}

function* fetchOverviewEntries(
  action: Types.SagaPayload<Types.FetchOverviewEntriesPayload>
) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.ENTRIES,
      `/fetch-overview-entries`,
      action.payload.userId
    );
    const { userId, ...fetchPayload } = action.payload;
    const { data } = yield Saga.call(axios.post, endpoint, fetchPayload);
    const normalizedData = normalize(data.response, entriesSchemaList);

    yield Saga.put(
      Redux.entitiesActions.setEntries(
        normalizedData.entities.entries as Types.NormalizedEntries
      )
    );
  } catch (error: any) {
    console.error(error);
    yield Helpers.handleError(error);
  }
}

function* fetchLogbookEntries(
  action: Types.SagaPayload<Types.FetchLogbookEntriesPayload>
) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.ENTRIES,
      `/fetch-logbook-entries`,
      action.payload.userId
    );
    const { userId, ...fetchPayload } = action.payload;
    const { data } = yield Saga.call(axios.post, endpoint, fetchPayload);
    const normalizedData = normalize(data.response, entriesSchemaList);

    yield Saga.put(
      Redux.entitiesActions.setEntries(
        normalizedData.entities.entries as Types.NormalizedEntries
      )
    );
  } catch (error: any) {
    console.error(error);
    yield Helpers.handleError(error);
  }
}

function* createEntry(action: Types.SagaPayload<Types.CreateEntryPayload>) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.ENTRIES,
      `/`,
      action.payload.userId
    );
    const { userId, ...createPayload } = action.payload;
    const { data } = yield Saga.call(axios.post, endpoint, createPayload);
    const normalizedData = normalize(data.response, entriesSchema);

    yield Saga.put(
      Redux.entitiesActions.setEntries(
        normalizedData.entities.entries as Types.NormalizedEntries
      )
    );

    if (createPayload.logbookId) {
      yield Saga.put(
        Redux.entitiesActions.addEntryIdToLogbook({
          logbookId: createPayload.logbookId,
          entryId: data.response.id,
        })
      );
    }

    yield Saga.put(
      Redux.uiActions.setNotification({
        body: data.body,
        status: "success",
        timeout: 5000,
      })
    );
  } catch (error: any) {
    console.error(error);
    yield Helpers.handleError(error);
  }
}

function* updateEntry(action: Types.SagaPayload<Types.UpdateEntryPayload>) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.ENTRIES,
      `/${action.payload.entryId}`,
      action.payload.userId
    );
    const { showNotification, userId, entryId, ...updatePayload } =
      action.payload;
    const { data } = yield Saga.call(axios.patch, endpoint, updatePayload);
    yield Saga.put(Redux.entitiesActions.updateEntry(data.response));

    if (showNotification) {
      yield Saga.put(
        Redux.uiActions.setNotification({
          body: data.body,
          status: "success",
          timeout: 5000,
        })
      );
    }
  } catch (error: any) {
    console.error(error);
    yield Helpers.handleError(error);
  }
}

function* deleteEntry(action: Types.SagaPayload<Types.DeleteEntryPayload>) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.ENTRIES,
      `/${action.payload.entryId}`,
      action.payload.userId
    );
    const { data } = yield Saga.call(axios.delete, endpoint);
    yield Saga.put(Redux.entitiesActions.deleteEntry(action.payload.entryId));

    yield Saga.put(
      Redux.uiActions.setNotification({
        body: data.body,
        status: "success",
        timeout: 5000,
      })
    );
  } catch (error: any) {
    console.error(error);
    yield Helpers.handleError(error);
  }
}

export default function* entriesSaga() {
  yield Saga.all([
    Saga.takeEvery(EntriesActions.FETCH_ENTRIES, fetchEntries),
    Saga.takeEvery(EntriesActions.FETCH_ENTRY, fetchEntry),
    Saga.takeEvery(EntriesActions.FETCH_OVERVIEW_ENTRIES, fetchOverviewEntries),
    Saga.takeEvery(EntriesActions.FETCH_LOGBOOK_ENTRIES, fetchLogbookEntries),
    Saga.takeEvery(EntriesActions.CREATE_ENTRY, createEntry),
    Saga.takeEvery(EntriesActions.UPDATE_ENTRY, updateEntry),
    Saga.takeEvery(EntriesActions.DELETE_ENTRY, deleteEntry),
  ]);
}
