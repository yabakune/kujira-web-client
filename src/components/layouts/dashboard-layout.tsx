import * as Components from "@/components";

import Styles from "./dashboard-layout.module.scss";

type Props = { children: React.ReactNode };

export const DashboardLayout = (props: Props) => {
  return (
    <main className={Styles.container}>
      <Components.Navbar />
      {props.children}
    </main>
  );
};
