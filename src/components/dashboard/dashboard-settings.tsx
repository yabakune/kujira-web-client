import { useSignal } from "@preact/signals-react";

import * as Components from "@/components";

import { SettingsPersonalInformation } from "./settings-personal-information";
import { SettingsSession } from "./settings-session";
import { SettingsDangerous } from "./settings-dangerous";

import Styles from "./dashboard-settings.module.scss";

const states = ["Account", "Security", "Customization"] as const;
type State = (typeof states)[number];

export const DashboardSettings = () => {
  const currentState = useSignal<State>("Account");

  function setCurrentState(state: State): void {
    currentState.value = state;
  }

  return (
    <div className={Styles.container}>
      <Components.PageSidebar
        title="Settings"
        caption="Navigate your settings below."
      >
        {states.map((state: State) => {
          return (
            <Components.Button
              key={`dashboard-settings-${state}-button`}
              type="button"
              text={state}
              onClick={() => setCurrentState(state)}
              selected={currentState.value === state}
              addClick
            />
          );
        })}
      </Components.PageSidebar>

      <section className={Styles.body}>
        {currentState.value === "Account" ? (
          <>
            <SettingsPersonalInformation />
            <SettingsSession />
            <SettingsDangerous />
          </>
        ) : currentState.value === "Security" ? (
          <SettingsPersonalInformation />
        ) : (
          <SettingsPersonalInformation />
        )}
      </section>
    </div>
  );
};
