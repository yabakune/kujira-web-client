import dynamic from "next/dynamic";
import { ReactElement } from "react";

import * as Components from "@/components";
import { signalsStore } from "@/signals/signals";
import { NextPageWithLayout } from "../_app";

import Styles from "@/styles/settings.module.scss";

const { currentSettingsPage } = signalsStore;

const DynamicSecurity = dynamic(
  import("@/components/settings/settings-security").then(
    (mod) => mod.SettingsSecurity
  )
);

const DynamicPersonalize = dynamic(
  import("@/components/settings/settings-personalize").then(
    (mod) => mod.SettingsPersonalize
  )
);

const Settings: NextPageWithLayout = () => {
  console.log("Settings page rendered");

  return (
    <>
      <Components.PageHead title="Settings" />

      <div className={Styles.page}>
        {currentSettingsPage.value === "Personal" ? (
          <Components.SettingsPersonal />
        ) : currentSettingsPage.value === "Security" ? (
          <DynamicSecurity />
        ) : currentSettingsPage.value === "Personalize" ? (
          <DynamicPersonalize />
        ) : null}
      </div>
    </>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <Components.DashboardLayout>{page}</Components.DashboardLayout>;
};

export default Settings;

export async function getServerSideProps() {
  return { props: { requiresAuthorization: true } };
}
