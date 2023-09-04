import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import * as Selectors from "@/selectors";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

const { currentLogbookId } = signalsStore;

export const OverviewEntries = () => {
  // console.log("Overview entries rendered");

  const dispatch = useDispatch();

  const { entries } = useSelector((state: Redux.ReduxStore) => state.entities);
  const overviewId = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchLogbookOverviewId(state, currentLogbookId.value)
  );

  useEffect(() => {
    if (!entries && overviewId && Helpers.userId) {
      dispatch(
        Sagas.fetchOverviewEntriesRequest({
          overviewId,
          userId: Helpers.userId,
        })
      );
    }
  }, [entries, overviewId]);

  if (entries) {
    return (
      <>
        {Object.values(entries).map((entry: Types.EntryModel) => {
          return (
            <Components.OverviewPurchasesDropdown
              key={entry.id}
              title={entry.name}
              entryId={entry.id}
              startOpened={
                entry.name === "Recurring" || entry.name === "Incoming"
              }
              shadow
            />
          );
        })}
      </>
    );
  } else {
    return (
      <>
        <Components.Shimmer height="86px" borderRadius={6} />
        <Components.Shimmer height="86px" borderRadius={6} />
      </>
    );
  }
};
