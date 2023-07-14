import { useRouter } from "next/router";

import * as Components from "@/components";
import * as Constants from "@/constants";

import Styles from "./dashboard-layout.module.scss";

type Props = { children: React.ReactNode };

export const DashboardLayout = (props: Props) => {
  const { pathname } = useRouter();

  return (
    <main className={Styles.main}>
      <Components.Navbar />
      <section className={Styles.body}>
        {pathname !== Constants.ClientRoutes.LOGBOOKS && (
          <Components.PageSidebar />
        )}
        {props.children}
      </section>
    </main>
  );
};
