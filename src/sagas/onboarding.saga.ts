import * as Saga from "redux-saga/effects";
import axios from "axios";
import { normalize, schema } from "normalizr";

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

const purchasesSchema = new schema.Entity("logbooks");
const purchasesSchemaList = new schema.Array(purchasesSchema);

function* onboardNewUser(
  action: Types.SagaPayload<Types.OnboardNewUserPayload>
) {
  try {
    const endpoint = Helpers.generateGatedEndpoint(
      Constants.APIRoutes.ONBOARDING,
      `/onboard-new-user`,
      action.payload.userId
    );

    const { data } = yield Saga.call(axios.post, endpoint, action.payload);
    const {
      logbookOverview,
      overviewRecurringPurchases,
      overviewIncomingPurchases,
      updatedRecurringEntry,
      updatedIncomingEntry,
      onboardedUser,
    } = data.response;

    yield Saga.put(Redux.entitiesActions.setOverview(logbookOverview));

    const normalizedRecurringPurchases = normalize(
      overviewRecurringPurchases,
      purchasesSchemaList
    );
    const normalizedIncomingPurchases = normalize(
      overviewIncomingPurchases,
      purchasesSchemaList
    );
    yield Saga.put(
      Redux.entitiesActions.setPurchases({
        ...normalizedRecurringPurchases.entities.logbooks,
        ...normalizedIncomingPurchases.entities.logbooks,
      } as Types.NormalizedPurchases)
    );

    yield Saga.put(Redux.entitiesActions.setEntry(updatedRecurringEntry));
    yield Saga.put(Redux.entitiesActions.setEntry(updatedIncomingEntry));

    yield Saga.put(Redux.entitiesActions.setCurrentUser(onboardedUser));
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
