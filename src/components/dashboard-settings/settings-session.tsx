import { useDispatch } from "react-redux";

import * as Components from "@/components";
import * as Constants from "@/constants";
import * as Sagas from "@/sagas";
import * as Types from "@/types";

import { SettingsSection } from "./settings-section";

export const SettingsSession = () => {
  const dispatch = useDispatch();

  function logout(event: Types.OnSubmit): void {
    event.preventDefault();
    if (Constants.userId) {
      dispatch(Sagas.logoutRequest({ userId: Constants.userId }));
    }
  }

  return (
    <SettingsSection
      key="dashboard-settings-account-session"
      title="Session"
      onSubmit={logout}
    >
      <Components.Button
        type="submit"
        text="Log Out"
        borderRadius={10}
        centerContents
        addClick
        primary
      />
    </SettingsSection>
  );
};
