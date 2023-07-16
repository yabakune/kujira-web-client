import { useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Sagas from "@/sagas";
import * as Types from "@/types";
import { ReduxState } from "@/redux";

import { SettingsSection } from "./settings-section";

export const SettingsDangerous = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: ReduxState) => state.entities);

  function deleteAccount(event: Types.OnSubmit): void {
    event.preventDefault();
    if (currentUser) {
      dispatch(Sagas.deleteUserRequest({ userId: currentUser.id }));
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
