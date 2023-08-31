import { useRouter } from "next/router";
import { memo } from "react";

import * as Components from "@/components";
import * as Constants from "@/constants";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

import { OverviewStatus } from "./overview-status";

import Styles from "./overview-header.module.scss";

const { currentSettingsPage } = signalsStore;

const settingsPages: Types.SettingsPage[] = [
  "Personal",
  "Security",
  "Personalize",
];

const SettingsNavigation = () => {
  const router = useRouter();

  if (router.pathname === Constants.ClientRoutes.SETTINGS) {
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
  } else {
    return null;
  }
};

const ExportedComponent = () => {
  return (
    <header className={Styles.container}>
      <SettingsNavigation />
      <OverviewStatus />
    </header>
  );
};

export const OverviewHeader = memo(ExportedComponent);
