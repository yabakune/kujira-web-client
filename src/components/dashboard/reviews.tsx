import * as Components from "@/components";

import Styles from "./settings.module.scss";

export const DashboardReviews = () => {
  return (
    <div className={Styles.container}>
      <Components.PageSidebar
        title="Reviews"
        caption="Select a logbook below to review your purchasing habits."
      />
      Reviews
    </div>
  );
};
