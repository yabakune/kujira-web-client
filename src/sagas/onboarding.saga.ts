import * as Saga from "redux-saga/effects";
import axios from "axios";

import * as Constants from "@/constants";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Types from "@/types";

enum OnboardingActions {
  ONBOARD_NEW_USER = "ONBOARD_NEW_USER",
}

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

export function onboardNewUserRequest(
  payload: Types.OnboardNewUserPayload
): Types.SagaPayload<Types.OnboardNewUserPayload> {
  return {
    type: OnboardingActions.ONBOARD_NEW_USER,
    payload,
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* onboardNewUser(
  action: Types.SagaPayload<Types.OnboardNewUserPayload>
) {
  try {
    const { userId, overviewId, ...overviewUpdatePayload } = action.payload;

    const { data: overview } = yield Saga.call(
      axios.patch,
      Helpers.generateGatedEndpoint(
        Constants.APIRoutes.OVERVIEWS,
        `/${overviewId}`,
        userId
      ),
      overviewUpdatePayload
    );

    const { data: onboardedUser } = yield Saga.call(
      axios.patch,
      Helpers.generateGatedEndpoint(
        Constants.APIRoutes.USERS,
        `/${userId}`,
        userId
      ),
      { onboarded: true }
    );

    yield Saga.put(Redux.entitiesActions.setOverview(overview));
    yield Saga.put(Redux.entitiesActions.setCurrentUser(onboardedUser));

    location.reload();
  } catch (error) {
    console.error(error);
    yield Helpers.handleError(error);
  }
}

export default function* onboardingSaga() {
  yield Saga.all([
    Saga.takeEvery(OnboardingActions.ONBOARD_NEW_USER, onboardNewUser),
  ]);
}
