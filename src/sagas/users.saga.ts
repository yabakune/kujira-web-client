import * as Saga from "redux-saga/effects";
import axios from "axios";
import Cookies from "js-cookie";

import * as Constants from "@/constants";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

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
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.USERS,
      `/${action.payload.userId}`,
      action.payload.userId
    );
    const { data } = yield Saga.call(axios.get, endpoint);
    yield Saga.put(Redux.entitiesActions.setCurrentUser(data.response));
  } catch (error: any) {
    yield Helpers.handleError(error);
  }
}

function* updateUser(action: Types.SagaPayload<Types.UpdateUserPayload>) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.USERS,
      `/${action.payload.userId}`,
      action.payload.userId
    );
    const { userId, ...updatePayload } = action.payload;
    const { data } = yield Saga.call(axios.patch, endpoint, updatePayload);
    yield Saga.put(Redux.entitiesActions.setCurrentUser(data.response));

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

function* updateUserPassword(
  action: Types.SagaPayload<Types.UpdateUserPasswordPayload>
) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.USERS,
      `/${action.payload.userId}/update-password`,
      action.payload.userId
    );
    const { userId, ...updatePayload } = action.payload;
    const { data } = yield Saga.call(axios.patch, endpoint, updatePayload);

    yield Saga.put(Redux.entitiesActions.logoutUser());

    Cookies.remove("userId");

    yield Saga.put(
      Redux.uiActions.setNotification({
        body: `${data.body} For security reasons, you've been logged out. Please log back in with your new password.`,
        status: "success",
        timeout: 10000,
      })
    );
  } catch (error: any) {
    yield Helpers.handleError(error);
  }
}

function* deleteUser(action: Types.SagaPayload<Types.DeleteUserPayload>) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.USERS,
      `/${action.payload.userId}`,
      action.payload.userId
    );
    const { data } = yield Saga.call(axios.delete, endpoint);
    yield Saga.put(Redux.entitiesActions.logoutUser());

    Cookies.remove("userId");

    if (signalsStore.confirmationModalOpen.value) {
      signalsStore.confirmationModalOpen.value = false;
    }

    yield Saga.put(
      Redux.uiActions.setNotification({
        body: data.body,
        status: "success",
        timeout: 5000,
      })
    );

    location.reload();
  } catch (error: any) {
    yield Helpers.handleError(error);
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
