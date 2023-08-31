import * as Components from "@/components";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

import Styles from "./overview-header.module.scss";

const { currentSettingsPage, remainingBudget } = signalsStore;

const settingsPages: Types.SettingsPage[] = [
  "Personal",
  "Security",
  "Personalize",
];

const SettingsNavigation = () => {
  return (
    <section className={Styles.settingsNavigation}>
      {settingsPages.map((page: Types.SettingsPage, index: number) => {
        return (
          <Components.Button
            key={`Overview Header Settings Navigation ${page} ${index}`}
            text={page}
            onClick={() => (currentSettingsPage.value = page)}
            backgroundLevel={3}
            weak={currentSettingsPage.value !== page}
            centered
            border
          />
        );
      })}
    </section>
  );
};

const OverviewStatus = () => {
  return <section></section>;
};

type Props = {
  income: number;
};

export const OverviewHeader = () => {
  return (
    <header className={Styles.container}>
      <SettingsNavigation />
      <OverviewStatus />
    </header>
  );
};
