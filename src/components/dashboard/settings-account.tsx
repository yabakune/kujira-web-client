import * as Components from "@/components";
import * as Types from "@/types";

import Styles from "./dashboard-settings.module.scss";
import { SettingsSection } from "./settings-section";
import { useSignal } from "@preact/signals-react";

export const SettingsAccount = () => {
  const email = useSignal("");
  const username = useSignal("");

  function submitPersonalInformation(event: Types.OnSubmit): void {
    event.preventDefault();

    console.log("Submitted Personal Information");
  }

  function submitSession(event: Types.OnSubmit): void {
    event.preventDefault();

    console.log("Submitted Session");
  }

  function submitDangerous(event: Types.OnSubmit): void {
    event.preventDefault();

    console.log("Submitted Dangerous");
  }

  return (
    <section className={Styles.body}>
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
      </SettingsSection>

      <SettingsSection
        key="dashboard-settings-account-session"
        title="Session"
        onSubmit={submitSession}
      >
        Foo
      </SettingsSection>

      <SettingsSection
        key="dashboard-settings-account-dangerous"
        title="Dangerous"
        onSubmit={submitDangerous}
      >
        Foo
      </SettingsSection>
    </section>
  );
};
