import * as Components from "@/components";
import { NextPageWithLayout } from "../_app";

const Settings: NextPageWithLayout = () => {
  return <div>Settings</div>;
};

Settings.getLayout = function getLayout(page: React.ReactElement) {
  return <Components.DashboardLayout>{page}</Components.DashboardLayout>;
};

export default Settings;
