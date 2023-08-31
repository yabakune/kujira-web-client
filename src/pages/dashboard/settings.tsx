import { ReactElement } from "react";

import * as Components from "@/components";
import { signalsStore } from "@/signals/signals";
import { NextPageWithLayout } from "../_app";

import Styles from "@/styles/settings.module.scss";

const { currentSettingsPage } = signalsStore;

const Settings: NextPageWithLayout = () => {
  return (
    <>
      <Components.PageHead title="Settings" />

      <div className={Styles.page}>
        {currentSettingsPage.value === "Personal" ? (
          <Components.SettingsPersonal />
        ) : currentSettingsPage.value === "Security" ? (
          <Components.SettingsSecurity />
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
