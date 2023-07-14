import { useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Sagas from "@/sagas";
import * as Types from "@/types";
import { ReduxState } from "@/redux";

import { SettingsSection } from "./settings-section";

export const SettingsSession = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: ReduxState) => state.entities);

  function logout(event: Types.OnSubmit): void {
    event.preventDefault();
    if (currentUser) {
      dispatch(Sagas.logoutRequest({ email: currentUser.email }));
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
