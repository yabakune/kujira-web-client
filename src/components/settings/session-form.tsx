import { useDispatch } from "react-redux";

import * as Helpers from "@/helpers";
import * as Sagas from "@/sagas";

import { SettingsForm } from "./settings-form";

export const SessionForm = () => {
  console.log("Session form rendered");

  const dispatch = useDispatch();

  function logOut(): void {
    if (Helpers.userId) {
      dispatch(
        Sagas.logoutRequest({
          userId: Helpers.userId,
        })
      );
    }
  }

  return (
    <SettingsForm title="Session" submit={logOut} buttonText="Log Out" inputs />
  );
};
