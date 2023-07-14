import * as Types from "@/types";

import { SettingsSection } from "./settings-section";

export const SettingsCustomization = () => {
  function deleteAccount(event: Types.OnSubmit): void {
    event.preventDefault();

    console.log("Submitted Dangerous");
  }

  return (
    <SettingsSection
      key="dashboard-settings-account-dangerous"
      title="Dangerous"
      onSubmit={deleteAccount}
    >
      Foo
    </SettingsSection>
  );
};
