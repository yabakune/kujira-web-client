import * as Saga from "redux-saga/effects";
import axios from "axios";
import { normalize, schema } from "normalizr";

import * as Constants from "@/constants";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Types from "@/types";

enum PurchasesActions {
  FETCH_PURCHASES = "FETCH_PURCHASES",
  FETCH_PURCHASE = "FETCH_PURCHASE",
  FETCH_ENTRY_PURCHASES = "FETCH_ENTRY_PURCHASES",
  CREATE_PURCHASE = "CREATE_PURCHASE",
  UPDATE_PURCHASE = "UPDATE_PURCHASE",
  BULK_DELETE_PURCHASES = "BULK_DELETE_PURCHASES",
  DELETE_ENTRY_PURCHASES = "DELETE_ENTRY_PURCHASES",
  DELETE_PURCHASE = "DELETE_PURCHASE",
}

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

export function fetchPurchasesRequest(
  payload: Types.FetchPurchasesPayload
): Types.SagaPayload<Types.FetchPurchasesPayload> {
  return {
    type: PurchasesActions.FETCH_PURCHASES,
    payload,
  };
}

export function fetchPurchaseRequest(
  payload: Types.FetchPurchasePayload
): Types.SagaPayload<Types.FetchPurchasePayload> {
  return {
    type: PurchasesActions.FETCH_PURCHASE,
    payload,
  };
}

export function fetchEntryPurchasesRequest(
  payload: Types.FetchEntryPurchasesPayload
): Types.SagaPayload<Types.FetchEntryPurchasesPayload> {
  return {
    type: PurchasesActions.FETCH_ENTRY_PURCHASES,
    payload,
  };
}

export function createPurchaseRequest(
  payload: Types.CreatePurchasePayload
): Types.SagaPayload<Types.CreatePurchasePayload> {
  return {
    type: PurchasesActions.CREATE_PURCHASE,
    payload,
  };
}

export function updatePurchaseRequest(
  payload: Types.UpdatePurchase
): Types.SagaPayload<Types.UpdatePurchase> {
  return {
    type: PurchasesActions.UPDATE_PURCHASE,
    payload,
  };
}

export function bulkDeletePurchasesRequest(
  payload: Types.BulkDeletePurchasesPayload
): Types.SagaPayload<Types.BulkDeletePurchasesPayload> {
  return {
    type: PurchasesActions.BULK_DELETE_PURCHASES,
    payload,
  };
}

export function deleteEntryPurchasesRequest(
  payload: Types.DeleteEntryPurchasesPayload
): Types.SagaPayload<Types.DeleteEntryPurchasesPayload> {
  return {
    type: PurchasesActions.DELETE_ENTRY_PURCHASES,
    payload,
  };
}

export function deletePurchaseRequest(
  payload: Types.DeletePurchasePayload
): Types.SagaPayload<Types.DeletePurchasePayload> {
  return {
    type: PurchasesActions.DELETE_PURCHASE,
    payload,
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

const purchasesSchema = new schema.Entity("purchases");
const purchasesSchemaList = new schema.Array(purchasesSchema);

function* fetchPurchases(
  action: Types.SagaPayload<Types.FetchPurchasesPayload>
) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.PURCHASES,
      `/`,
      action.payload.userId
    );
    const { data } = yield Saga.call(axios.get, endpoint);
    const normalizedData = normalize(data.response, purchasesSchemaList);

    yield Saga.put(
      Redux.entitiesActions.setPurchases(
        normalizedData.entities.purchases as Types.NormalizedPurchases
      )
    );
  } catch (error) {
    console.error(error);
    yield Helpers.handleError(error);
  }
}

function* fetchPurchase(action: Types.SagaPayload<Types.FetchPurchasePayload>) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.PURCHASES,
      `/${action.payload.purchaseId}`,
      action.payload.userId
    );
    const { data } = yield Saga.call(axios.get, endpoint);
    const normalizedData = normalize(data.response, purchasesSchema);

    yield Saga.put(
      Redux.entitiesActions.setPurchases(
        normalizedData.entities.purchases as Types.NormalizedPurchases
      )
    );
  } catch (error) {
    console.error(error);
    yield Helpers.handleError(error);
  }
}

function* fetchEntryPurchases(
  action: Types.SagaPayload<Types.FetchEntryPurchasesPayload>
) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.PURCHASES,
      `/fetch-entry-purchases`,
      action.payload.userId
    );
    const { userId, ...fetchPayload } = action.payload;
    const { data } = yield Saga.call(axios.post, endpoint, fetchPayload);
    const normalizedData = normalize(data.response, purchasesSchemaList);

    yield Saga.put(
      Redux.entitiesActions.setPurchases(
        normalizedData.entities.purchases as Types.NormalizedPurchases
      )
    );
  } catch (error) {
    console.error(error);
    yield Helpers.handleError(error);
  }
}

function* createPurchase(
  action: Types.SagaPayload<Types.CreatePurchasePayload>
) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.PURCHASES,
      `/`,
      action.payload.userId
    );
    const { userId, ...createPayload } = action.payload;
    const { data } = yield Saga.call(axios.post, endpoint, createPayload);
    const normalizedData = normalize(data.response, purchasesSchema);

    yield Saga.put(
      Redux.entitiesActions.setPurchases(
        normalizedData.entities.purchases as Types.NormalizedPurchases
      )
    );

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

function* updatePurchase(
  action: Types.SagaPayload<Types.UpdatePurchasePayload>
) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.PURCHASES,
      `/${action.payload.purchaseId}`,
      action.payload.userId
    );
    const { userId, ...updatePayload } = action.payload;
    const { data } = yield Saga.call(axios.patch, endpoint, updatePayload);

    yield Saga.put(Redux.entitiesActions.setPurchase(data));

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

function* bulkDeletePurchases(
  action: Types.SagaPayload<Types.BulkDeletePurchasesPayload>
) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.PURCHASES,
      `/bulk-delete-purchases`,
      action.payload.userId
    );
    const { userId, ...deletePayload } = action.payload;
    const { data } = yield Saga.call(axios.post, endpoint, deletePayload);

    yield Saga.put(Redux.entitiesActions.deletePurchases(data.response));

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

function* deleteEntryPurchases(
  action: Types.SagaPayload<Types.DeleteEntryPurchasesPayload>
) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.PURCHASES,
      `/delete-entry-purchases`,
      action.payload.userId
    );
    const { userId, ...deletePayload } = action.payload;
    const { data } = yield Saga.call(axios.post, endpoint, deletePayload);

    yield Saga.put(Redux.entitiesActions.deletePurchases(data.response));

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

function* deletePurchase(
  action: Types.SagaPayload<Types.DeletePurchasePayload>
) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.PURCHASES,
      `${action.payload.purchaseId}`,
      action.payload.userId
    );
    const { data } = yield Saga.call(axios.delete, endpoint);

    yield Saga.put(Redux.entitiesActions.deletePurchase(data.response));

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

export default function* purchasesSaga() {
  yield Saga.all([
    Saga.takeEvery(PurchasesActions.FETCH_PURCHASES, fetchPurchases),
    Saga.takeEvery(PurchasesActions.FETCH_PURCHASE, fetchPurchase),
    Saga.takeEvery(PurchasesActions.FETCH_ENTRY_PURCHASES, fetchEntryPurchases),
    Saga.takeEvery(PurchasesActions.CREATE_PURCHASE, createPurchase),
    Saga.takeEvery(PurchasesActions.UPDATE_PURCHASE, updatePurchase),
    Saga.takeEvery(PurchasesActions.BULK_DELETE_PURCHASES, bulkDeletePurchases),
    Saga.takeEvery(
      PurchasesActions.DELETE_ENTRY_PURCHASES,
      deleteEntryPurchases
    ),
    Saga.takeEvery(PurchasesActions.DELETE_PURCHASE, deletePurchase),
  ]);
}
