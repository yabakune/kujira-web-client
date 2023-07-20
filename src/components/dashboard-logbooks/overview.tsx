import { signalsStore } from "@/signals/signals";
import { OverviewHeader } from "./overview-header";
import { OverviewInfo } from "./overview-info";

import Styles from "./overview.module.scss";

export const Overview = () => {
  const { selectedLogbookId } = signalsStore;

  if (selectedLogbookId.value) {
    return (
      <aside className={Styles.container}>
        <OverviewHeader />
        <OverviewInfo />
      </aside>
    );
  } else {
    return null;
  }
};
