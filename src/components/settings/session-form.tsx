import { memo } from "react";
import { useDispatch } from "react-redux";

import * as Helpers from "@/helpers";
import * as Sagas from "@/sagas";

import { SettingsForm } from "./settings-form";

const ExportedComponent = () => {
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

export const SessionForm = memo(ExportedComponent);
