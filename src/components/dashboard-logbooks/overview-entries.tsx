import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Constants from "@/constants";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import * as Selectors from "@/selectors";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

import Styles from "./overview-entries.module.scss";
import { EntriesDropdown } from "./entries-dropdown";

export const OverviewEntries = () => {
  const dispatch = useDispatch();
  const { selectedLogbookId } = signalsStore;

  const currentLogbook = useSelector((state: Redux.ReduxStore) => {
    return Selectors.selectLogbook(state, selectedLogbookId.value);
  });

  const currentOverviewEntries = useSelector((state: Redux.ReduxStore) => {
    return Selectors.selectOverviewEntries(state, selectedLogbookId.value);
  });

  useEffect(() => {
    if (currentLogbook && currentLogbook.overview.id && Constants.userId) {
      dispatch(
        Sagas.fetchOverviewEntriesRequest({
          overviewId: currentLogbook.overview.id,
          userId: Constants.userId,
        })
      );
    }
  }, [currentLogbook]);

  return (
    <section className={Styles.container}>
      {currentOverviewEntries &&
        currentOverviewEntries.map((overviewEntry: Types.EntryModel) => {
          return (
            <EntriesDropdown
              key={`dashboard-logbooks-overview-entry-${overviewEntry.id}`}
            >
              <div className={Styles.entryDropdownHeader}>
                <span>{overviewEntry.name}</span>
                <span className={Styles.totalCost}>
                  ${Helpers.truncateCostToString(overviewEntry.totalSpent)}
                </span>
              </div>
            </EntriesDropdown>
          );
        })}
    </section>
  );
};
