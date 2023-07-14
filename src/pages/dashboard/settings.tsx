import * as Components from "@/components";
import { NextPageWithLayout } from "../_app";

const Settings: NextPageWithLayout = () => {
  return (
    <>
      <Components.PageHead title="Settings" />
      <Components.DashboardSettings />;
    </>
  );
};

Settings.getLayout = function getLayout(page: React.ReactElement) {
  return <Components.DashboardLayout>{page}</Components.DashboardLayout>;
};

export default Settings;
