import { signalsStore } from "@/signals/signals";

import { OverviewSelector } from "./overview-selector";

import Styles from "./logbook-entries.module.scss";

export const LogbookEntries = () => {
  const { selectedLogbookId } = signalsStore;

  return (
    <section className={Styles.container}>
      {!selectedLogbookId.value ? (
        <OverviewSelector />
      ) : (
        <>Dashboard Logbooks</>
      )}
    </section>
  );
};
