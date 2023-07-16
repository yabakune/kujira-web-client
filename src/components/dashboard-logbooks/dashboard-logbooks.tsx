import { Overview } from "./overview";

import Styles from "./dashboard-logbooks.module.scss";

export const DashboardLogbooks = () => {
  return (
    <div className={Styles.container}>
      <Overview />
      <section className={Styles.body}>Dashboard Logbooks</section>
    </div>
  );
};
