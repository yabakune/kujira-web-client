import * as Components from "@/components";

import Styles from "./dashboard-layout.module.scss";
import ResponsiveStyles from "@/styles/responsive.module.scss";

type Props = { children: React.ReactNode };

export const DashboardLayout = (props: Props) => {
  return (
    <main className={Styles.main}>
      <Components.Navbar />
      <section className={ResponsiveStyles.responsiveSidePadding}>
        {props.children}
      </section>
    </main>
  );
};
