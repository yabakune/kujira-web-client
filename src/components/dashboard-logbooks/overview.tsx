import { OverviewHeader } from "./overview-header";
import Styles from "./overview.module.scss";

export const Overview = () => {
  return (
    <aside className={Styles.container}>
      <OverviewHeader />
    </aside>
  );
};
