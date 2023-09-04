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

export function fetchPurchases(
  payload: Types.FetchPurchasesPayload
): Types.SagaPayload<Types.FetchPurchasesPayload> {
  return {
    type: PurchasesActions.FETCH_PURCHASES,
    payload,
  };
}
