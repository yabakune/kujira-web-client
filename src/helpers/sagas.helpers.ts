import Cookies from "js-cookie";
import * as Saga from "redux-saga/effects";

import * as Constants from "@/constants";
import * as Redux from "@/redux";

export const userId = Number(Cookies.get("userId"));

export function generateGatedEndpoint(
  baseEndpoint: Constants.APIRoutes,
  extendedEndpoint: string = "",
  authorizedUserId: number
): string {
  return baseEndpoint + extendedEndpoint + `?userId=${authorizedUserId}`;
}

export function* handleError(error: any) {
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
