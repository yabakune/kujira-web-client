import { useSignal } from "@preact/signals-react";

import * as Components from "@/components";

import { SettingsPersonalInformation } from "./settings-personal-information";
import { SettingsSession } from "./settings-session";
import { SettingsDangerous } from "./settings-dangerous";
import { SettingsPassword } from "./settings-password";
import { SettingsTheme } from "./settings-theme";

import Styles from "./dashboard-settings.module.scss";

const tabs = ["Account", "Security", "Customization"] as const;
type Tab = (typeof tabs)[number];

export const DashboardSettings = () => {
  const currentTab = useSignal<Tab>("Account");

  function setCurrentTab(tab: Tab): void {
    currentTab.value = tab;
  }

  return (
    <div className={Styles.container}>
      <Components.PageSidebar
        title="Settings"
        caption="Navigate your settings below."
      >
        {tabs.map((tab: Tab) => {
          return (
            <Components.Button
              key={`dashboard-settings-${tab}-button`}
              type="button"
              text={tab}
              onClick={() => setCurrentTab(tab)}
              selected={currentTab.value === tab}
              addClick
            />
          );
        })}
      </Components.PageSidebar>

      <section className={Styles.body}>
        {currentTab.value === "Account" ? (
          <>
            <SettingsPersonalInformation />
            <SettingsSession />
            <SettingsDangerous />
          </>
        ) : currentTab.value === "Security" ? (
          <SettingsPassword />
        ) : (
          <SettingsTheme />
        )}
      </section>

      <Components.Spacer width={16.25} show={true} />
    </div>
  );
};
