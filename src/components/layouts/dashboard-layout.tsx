import { Navbar } from "../dashboard/navbar";

import Styles from "./dashboard-layout.module.scss";
import Snippets from "@/styles/snippets.module.scss";

type Props = {
  children: React.ReactNode;
};

export const DashboardLayout = (props: Props) => {
  console.log("Dashboard layout rendered");

  return (
    <div className={Styles.container}>
      <Navbar />

      <section className={Snippets.responsiveSidePadding}>
        {props.children}
      </section>
    </div>
  );
};
