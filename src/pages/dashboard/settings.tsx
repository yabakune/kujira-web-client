import { ReactElement } from "react";

import * as Components from "@/components";
import { NextPageWithLayout } from "../_app";

const Settings: NextPageWithLayout = () => {
  return (
    <>
      <Components.PageHead title="Settings" />
      Settings
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
