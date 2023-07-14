import * as Components from "@/components";

import Styles from "./settings.module.scss";

export const DashboardSettings = () => {
  return (
    <div className={Styles.container}>
      <Components.PageSidebar />
      Settings
    </div>
  );
};
