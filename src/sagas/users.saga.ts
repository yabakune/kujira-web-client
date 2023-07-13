import * as Saga from "redux-saga/effects";
import axios from "axios";

import * as Constants from "@/constants";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Types from "@/types";

enum UsersActions {
  FETCH_USER = "FETCH_USER",
  UPDATE_USER = "UPDATE_USER",
  UPDATE_USER_PASSWORD = "UPDATE_USER_PASSWORD",
  DELETE_USER = "DELETE_USER",
}

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

export function fetchUserRequest(
  payload: Types.FetchUserPayload
): Types.SagaPayload<Types.FetchUserPayload> {
  return {
    type: UsersActions.FETCH_USER,
    payload,
  };
}

export function updateUserRequest(
  payload: Types.UpdateUserPayload
): Types.SagaPayload<Types.UpdateUserPayload> {
  return {
    type: UsersActions.UPDATE_USER,
    payload,
  };
}

export function updateUserPasswordRequest(
  payload: Types.UpdateUserPasswordPayload
): Types.SagaPayload<Types.UpdateUserPasswordPayload> {
  return {
    type: UsersActions.UPDATE_USER_PASSWORD,
    payload,
  };
}

export function deleteUserRequest(
  payload: Types.DeleteUserPayload
): Types.SagaPayload<Types.DeleteUserPayload> {
  return {
    type: UsersActions.DELETE_USER,
    payload,
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* fetchUser(action: Types.SagaPayload<Types.FetchUserPayload>) {
  console.log("Fetch User payload:", action.payload);

  try {
    const endpoint = Helpers.generateEndpoint(
      Constants.APIRoutes.USERS,
      `/${action.payload.userId}`,
      action.payload.userId
    );

    const { data } = yield Saga.call(axios.get, endpoint);
    // yield Saga.put(Redux.entitiesActions.loginUser(data.response.safeUser));

    console.log("Fetch User Data:", data);
  } catch (error) {
    console.error(error);
  }
}

function* updateUser(action: Types.SagaPayload<Types.UpdateUserPayload>) {
  try {
    const endpoint = Constants.APIRoutes.USERS + `/${action.payload.userId}`;
    const { data } = yield Saga.call(axios.patch, endpoint, action.payload);

    console.log("Update User Data:", data);
  } catch (error) {
    console.error(error);
  }
}

function* updateUserPassword(
  action: Types.SagaPayload<Types.UpdateUserPasswordPayload>
) {
  try {
    const endpoint =
      Constants.APIRoutes.USERS + `/${action.payload.userId}/update-password`;
    const { data } = yield Saga.call(axios.patch, endpoint, action.payload);

    console.log("Update User Password:", data);
  } catch (error) {
    console.error(error);
  }
}

function* deleteUser(action: Types.SagaPayload<Types.DeleteUserPayload>) {
  try {
    const endpoint = Constants.APIRoutes.AUTH + `/${action.payload.userId}`;
    const { data } = yield Saga.call(axios.delete, endpoint);

    console.log("Delete User Data:", data);
  } catch (error) {
    console.error(error);
  }
}

export default function* usersSaga() {
  yield Saga.all([
    Saga.takeEvery(UsersActions.FETCH_USER, fetchUser),
    Saga.takeEvery(UsersActions.UPDATE_USER, updateUser),
    Saga.takeEvery(UsersActions.UPDATE_USER_PASSWORD, updateUserPassword),
    Saga.takeEvery(UsersActions.DELETE_USER, deleteUser),
  ]);
}
