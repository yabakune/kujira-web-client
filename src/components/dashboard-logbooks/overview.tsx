import { signalsStore } from "@/signals/signals";

import { OverviewHeader } from "./overview-header";
import { OverviewInfo } from "./overview-info";
import { OverviewEntries } from "./overview-entries";

import Styles from "./overview.module.scss";

export const Overview = () => {
  const { selectedLogbookId } = signalsStore;

  return (
    <aside
      className={`
        ${Styles.container}
        ${!selectedLogbookId.value && Styles.hide}
      `}
    >
      <OverviewHeader />
      <OverviewInfo />
      <OverviewEntries />
    </aside>
  );
};
