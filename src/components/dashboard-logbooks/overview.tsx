import { OverviewHeader } from "./overview-header";
import { OverviewInfo } from "./overview-info";

import Styles from "./overview.module.scss";

export const Overview = () => {
  return (
    <aside className={Styles.container}>
      <OverviewHeader />
      <OverviewInfo />
    </aside>
  );
};
