import * as Saga from "redux-saga/effects";
import axios from "axios";
import Cookies from "js-cookie";

import * as Constants from "@/constants";
import * as Redux from "@/redux";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

enum AuthActions {
  REGISTER = "REGISTER",
  VERIFY_REGISTRATION = "VERIFY_REGISTRATION",
  LOGIN = "LOGIN",
  VERIFY_LOGIN = "VERIFY_LOGIN",
  SEND_NEW_VERIFICATION_CODE = "SEND_NEW_VERIFICATION_CODE",
}

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

export function registerRequest(
  data: Types.RegistrationAction
): Types.SagaAction<Types.RegistrationAction> {
  return {
    type: AuthActions.REGISTER,
    payload: data,
  };
}

export function verifyRegistrationRequest(
  data: Types.AuthVerificationAction
): Types.SagaAction<Types.AuthVerificationAction> {
  return {
    type: AuthActions.VERIFY_REGISTRATION,
    payload: data,
  };
}

export function loginRequest(
  data: Types.LoginAction
): Types.SagaAction<Types.LoginAction> {
  return {
    type: AuthActions.LOGIN,
    payload: data,
  };
}

export function verifyLoginRequest(
  data: Types.AuthVerificationAction
): Types.SagaAction<Types.AuthVerificationAction> {
  return {
    type: AuthActions.VERIFY_LOGIN,
    payload: data,
  };
}

export function sendNewVerificationCode(
  data: Types.SendNewVerificationCodeAction
): Types.SagaAction<Types.SendNewVerificationCodeAction> {
  return {
    type: AuthActions.SEND_NEW_VERIFICATION_CODE,
    payload: data,
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* register(action: Types.SagaAction<Types.RegistrationAction>) {
  try {
    const endpoint = Constants.APIRoutes.AUTH + "/register";
    const { data } = yield Saga.call(axios.post, endpoint, action.payload);

    signalsStore.authVerificationCodeSent.value = true;

    console.log("Register Data:", data);
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

function* verifyRegistration(
  action: Types.SagaAction<Types.AuthVerificationAction>
) {
  try {
    const endpoint = Constants.APIRoutes.AUTH + `/verify-registration`;
    const { data } = yield Saga.call(axios.post, endpoint, action.payload);
    yield Saga.put(Redux.entitiesActions.loginUser(data.response.safeUser));

    Cookies.set("userId", data.response.safeUser.id);
    signalsStore.authVerificationCodeSent.value = false;

    console.log("Verify Registration Data:", data);
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

function* login(action: Types.SagaAction<Types.LoginAction>) {
  try {
    const endpoint = Constants.APIRoutes.AUTH + `/login`;
    const { data } = yield Saga.call(axios.post, endpoint, action.payload);

    signalsStore.authVerificationCodeSent.value = true;

    console.log("Login Data:", data);
  } catch (error: any) {
    console.error(error);
    alert(error.response.data.body);
    alert(error.response.data.caption);
  }
}

function* verifyLogin(action: Types.SagaAction<Types.AuthVerificationAction>) {
  try {
    const endpoint = Constants.APIRoutes.AUTH + `/verify-login`;
    const { data } = yield Saga.call(axios.post, endpoint, action.payload);
    yield Saga.put(Redux.entitiesActions.loginUser(data.response.safeUser));

    Cookies.set("userId", data.response.safeUser.id);

    signalsStore.authVerificationCodeSent.value = false;

    console.log("Verify Login Data:", data);
  } catch (error) {
    console.error(error);
  }
}

export function* authSaga() {
  yield Saga.all([
    Saga.takeEvery(AuthActions.REGISTER, register),
    Saga.takeEvery(AuthActions.VERIFY_REGISTRATION, verifyRegistration),
    Saga.takeEvery(AuthActions.LOGIN, login),
    Saga.takeEvery(AuthActions.VERIFY_LOGIN, verifyLogin),
  ]);
}
