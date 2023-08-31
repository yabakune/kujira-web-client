import { useSignal } from "@preact/signals-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import * as Components from "@/components";
import * as Constants from "@/constants";
import * as Redux from "@/redux";
import * as Selectors from "@/selectors";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

import Styles from "./overview-header.module.scss";

const { currentLogbookId, currentSettingsPage } = signalsStore;

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
  const remainingBudget = useSignal(0);

  const { overviews } = useSelector(
    (state: Redux.ReduxStore) => state.entities
  );

  const currentOverview = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchLogbookOverview(state, currentLogbookId.value)
  );

  const currentLogbookEntriesTotalSpent = useSelector(
    (state: Redux.ReduxStore) =>
      Selectors.calculateLogbookEntriesTotalSpent(state, currentLogbookId.value)
  );

  useEffect(() => {
    if (currentOverview) {
      const { income, savings } = currentOverview;
      const savedIncome = income * (savings / 100);
      remainingBudget.value =
        income - savedIncome - currentLogbookEntriesTotalSpent;
    }
  }, [currentOverview, currentLogbookEntriesTotalSpent]);

  return <section></section>;
};

export const OverviewHeader = () => {
  const router = useRouter();

  return (
    <header className={Styles.container}>
      {router.pathname === Constants.ClientRoutes.SETTINGS && (
        <SettingsNavigation />
      )}
      <OverviewStatus />
    </header>
  );
};
