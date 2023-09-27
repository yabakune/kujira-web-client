import { ReactElement } from "react";
import { useSelector } from "react-redux";

import * as Components from "@/components";
import * as Redux from "@/redux";
import * as Selectors from "@/selectors";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";
import { NextPageWithLayout } from "../_app";

import Styles from "@/styles/logbooks.module.scss";

const { currentLogbookId } = signalsStore;

const Logbooks: NextPageWithLayout = () => {
  const logbookEntries = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchCurrentLogbookEntries(state, currentLogbookId.value)
  );

  return (
    <>
      <Components.PageHead title="Logbooks" />

      <section className={Styles.logbookEntries}>
        {logbookEntries ? (
          logbookEntries.map((logbookEntry: Types.EntryModel) => {
            return (
              <Components.LogbookEntryDropdown
                key={`Dashboard Logbook Entry ${logbookEntry.id}`}
                entryId={logbookEntry.id}
                name={logbookEntry.name}
                budget={logbookEntry.budget}
                totalSpent={logbookEntry.totalSpent}
                purchaseIds={logbookEntry.purchases}
              />
            );
          })
        ) : (
          <>
            <Components.Shimmer height="76px" borderRadius={4} />
            <Components.Shimmer height="76px" borderRadius={4} />
            <Components.Shimmer height="76px" borderRadius={4} />
          </>
        )}
      </section>
    </>
  );
};

Logbooks.getLayout = function getLayout(page: ReactElement) {
  return <Components.DashboardLayout>{page}</Components.DashboardLayout>;
};

export default Logbooks;

export async function getServerSideProps() {
  return { props: { requiresAuthorization: true } };
}
