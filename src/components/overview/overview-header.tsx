import * as Components from "@/components";
import * as Redux from "@/redux";
import * as Selectors from "@/selectors";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

import Styles from "./overview-header.module.scss";
import { useSelector } from "react-redux";

const { currentLogbookId, currentSettingsPage, remainingBudget } = signalsStore;

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
  const currentLogbookEntriesTotalSpent = useSelector(
    (state: Redux.ReduxStore) =>
      Selectors.calculateLogbookEntriesTotalSpent(state, currentLogbookId.value)
  );

  return <section></section>;
};

export const OverviewHeader = () => {
  return (
    <header className={Styles.container}>
      <SettingsNavigation />
      <OverviewStatus />
    </header>
  );
};
