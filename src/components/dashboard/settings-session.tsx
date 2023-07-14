import * as Types from "@/types";

import { SettingsSection } from "./settings-section";

export const SettingsSecurity = () => {
  function logout(event: Types.OnSubmit): void {
    event.preventDefault();

    console.log("Submitted Session");
  }

  return (
    <SettingsSection
      key="dashboard-settings-account-session"
      title="Session"
      onSubmit={logout}
    >
      Foo
    </SettingsSection>
  );
};
