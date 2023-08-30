import { useDispatch } from "react-redux";

import * as Helpers from "@/helpers";
import * as Sagas from "@/sagas";

import { SettingsForm } from "./settings-form";

export const SessionForm = () => {
  console.log("Session form rendered");

  const dispatch = useDispatch();

  function submit(): void {
    if (Helpers.userId) {
      dispatch(
        Sagas.logoutRequest({
          userId: Helpers.userId,
        })
      );
    }
  }

  return (
    <SettingsForm title="Session" submit={submit} buttonText="Log Out" inputs />
  );
};
