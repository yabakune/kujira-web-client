import { useDispatch } from "react-redux";

import * as Components from "@/components";
import * as Constants from "@/constants";
import * as Sagas from "@/sagas";
import * as Types from "@/types";

import { SettingsSection } from "./settings-section";

export const SettingsDangerous = () => {
  const dispatch = useDispatch();

  function deleteAccount(event: Types.OnSubmit): void {
    event.preventDefault();
    if (Constants.userId) {
      dispatch(Sagas.deleteUserRequest({ userId: Constants.userId }));
    }
  }

  return (
    <SettingsSection
      key="dashboard-settings-account-dangerous"
      title="Dangerous"
      onSubmit={deleteAccount}
    >
      <Components.Button
        type="submit"
        text="Delete Account"
        borderRadius={10}
        backgroundLevel={4}
        centerContents
        addClick
      />
    </SettingsSection>
  );
};
