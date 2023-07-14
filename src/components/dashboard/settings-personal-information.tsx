import { useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Types from "@/types";

import { SettingsSection } from "./settings-section";

export const SettingsPersonalInformation = () => {
  const email = useSignal("");
  const username = useSignal("");

  function handlePersonalInformationDisabled(): boolean {
    return false;
  }

  function submitPersonalInformation(event: Types.OnSubmit): void {
    event.preventDefault();

    console.log("Submitted Personal Information");
  }

  return (
    <SettingsSection
      key="dashboard-settings-account-personal-information"
      title="Personal Information"
      onSubmit={submitPersonalInformation}
    >
      <Components.Input
        type="text"
        userInput={email}
        placeholder="Email"
        leftIcon={<Components.Message width={16} fill={10} />}
        borderRadius={10}
        backgroundLevel={4}
        required
      />
      <Components.Input
        type="text"
        userInput={username}
        placeholder="Username"
        leftIcon={<Components.User width={16} fill={10} />}
        borderRadius={10}
        backgroundLevel={4}
        required
      />
      <Components.Button
        type="submit"
        text="Update"
        disabled={handlePersonalInformationDisabled()}
        borderRadius={10}
        centerContents
        addClick
        primary
      />
    </SettingsSection>
  );
};
