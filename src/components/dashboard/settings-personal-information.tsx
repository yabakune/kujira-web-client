import { useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Types from "@/types";

import { SettingsSection } from "./settings-section";

import TextStyles from "@/styles/texts.module.scss";

export const SettingsPersonalInformation = () => {
  const email = useSignal("");
  const username = useSignal("");
  const emailError = useSignal("");
  const usernameError = useSignal("");

  function handleEmailErrors(): void {
    if (email.value.length === 0) {
      emailError.value = "";
    } else {
      if (!email.value.includes("@")) {
        emailError.value = 'Please include "@"';
      } else if (!email.value.includes(".com")) {
        emailError.value = 'Please include ".com"';
      } else {
        emailError.value = "";
      }
    }
  }

  function handleUsernameErrors(): void {
    if (username.value.length === 0) {
      usernameError.value = "";
    } else {
      if (!Helpers.checkValidUsername(username.value)) {
        usernameError.value = "Invalid username.";
      } else if (username.value.length > 14) {
        usernameError.value = "Username too long.";
      } else {
        usernameError.value = "";
      }
    }
  }

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
