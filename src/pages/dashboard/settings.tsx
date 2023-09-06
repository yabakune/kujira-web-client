import dynamic from "next/dynamic";
import { effect, useSignal } from "@preact/signals-react";
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

type PageLoadedCache = {
  ["personal"]: boolean;
  ["security"]: boolean;
  ["personalize"]: boolean;
};

const Settings: NextPageWithLayout = () => {
  const pageLoadedCache = useSignal<PageLoadedCache>({
    personal: false,
    security: false,
    personalize: false,
  });

  effect(() => {
    if (
      currentSettingsPage.value === "Personal" &&
      !pageLoadedCache.value.personal
    ) {
      pageLoadedCache.value.personal = true;
    } else if (
      currentSettingsPage.value === "Security" &&
      !pageLoadedCache.value.security
    ) {
      pageLoadedCache.value.security = true;
    } else if (
      currentSettingsPage.value === "Personalize" &&
      !pageLoadedCache.value.personalize
    ) {
      pageLoadedCache.value.personalize = true;
    }
  });

  return (
    <>
      <Components.PageHead title="Settings" />

      <div className={Styles.page}>
        <Components.CachedDisplay
          show={currentSettingsPage.value === "Personal"}
        >
          <Components.SettingsPersonal />
        </Components.CachedDisplay>

        {pageLoadedCache.value.security && (
          <Components.CachedDisplay
            show={currentSettingsPage.value === "Security"}
          >
            <DynamicSecurity />
          </Components.CachedDisplay>
        )}

        {pageLoadedCache.value.personalize && (
          <Components.CachedDisplay
            show={currentSettingsPage.value === "Personalize"}
          >
            <DynamicPersonalize />
          </Components.CachedDisplay>
        )}
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
