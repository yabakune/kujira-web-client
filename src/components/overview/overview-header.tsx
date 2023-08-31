import * as Components from "@/components";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

import Styles from "./overview-header.module.scss";

const { currentSettingsPage } = signalsStore;

const settingsPages: Types.SettingsPage[] = [
  "Personal",
  "Security",
  "Personalize",
];

const SettingsNavigation = () => {
  function setSettingsPage(page: Types.SettingsPage): void {
    currentSettingsPage.value = page;
  }

  return (
    <section className={Styles.settingsNavigation}>
      {settingsPages.map((page: Types.SettingsPage, index: number) => {
        return (
          <Components.Button
            key={`Overview Header Settings Navigation ${page} ${index}`}
            text={page}
            onClick={() => setSettingsPage(page)}
            weakText={currentSettingsPage.value !== page}
            centered
          />
        );
      })}
    </section>
  );
};

export const OverviewHeader = () => {
  return (
    <header className={Styles.container}>
      <SettingsNavigation />
    </header>
  );
};
