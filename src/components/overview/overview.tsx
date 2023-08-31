import { OverviewHeader } from "./overview-header";
import Styles from "./overview.module.scss";

export const Overview = () => {
  return (
    <section className={Styles.container}>
      <OverviewHeader />
    </section>
  );
};
