import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

import * as Components from "@/components";
import * as Sagas from "@/sagas";
import * as Types from "@/types";

import { SettingsSection } from "./settings-section";

const userId = Cookies.get("userId");

export const SettingsSession = () => {
  const dispatch = useDispatch();

  function logout(event: Types.OnSubmit): void {
    event.preventDefault();
    if (Number(userId)) {
      dispatch(Sagas.logoutRequest({ userId: Number(userId) }));
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
