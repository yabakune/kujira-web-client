import { signalsStore } from "@/signals/signals";

import { LogbookSelector } from "../dashboard/logbook-selector";
import { Navbar } from "../dashboard/navbar";

import Styles from "./dashboard-layout.module.scss";
import Snippets from "@/styles/snippets.module.scss";

type Props = {
  children: React.ReactNode;
};

const { currentLogbookId } = signalsStore;

export const DashboardLayout = (props: Props) => {
  console.log("Dashboard layout rendered");

  return (
    <div className={Styles.container}>
      <Navbar />

      <section className={Snippets.responsiveSidePadding}>
        {!currentLogbookId.value ? <LogbookSelector /> : props.children}
      </section>
    </div>
  );
};
