import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import * as Selectors from "@/selectors";
import * as Types from "@/types";

type Props = {
  overviewId: number;
};

export const OverviewEntries = (props: Props) => {
  const dispatch = useDispatch();

  const overviewEntries = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchOverviewEntries(state, props.overviewId)
  );

  useEffect(() => {
    dispatch(
      Sagas.fetchOverviewEntriesRequest({
        overviewId: props.overviewId,
        userId: Helpers.userId,
      })
    );
  }, []);

  if (overviewEntries) {
    return overviewEntries.map((entry: Types.EntryModel | undefined) => {
      if (entry) {
        return (
          <Components.OverviewPurchasesDropdown
            key={entry.id}
            entryId={entry.id}
            title={entry.name}
            totalSpent={entry.totalSpent}
            purchaseIds={entry.purchases}
            startOpened={
              entry.name === "Recurring" || entry.name === "Incoming"
            }
            shadow
          />
        );
      }
    });
  } else {
    return (
      <>
        <Components.Shimmer height="86px" borderRadius={6} />
        <Components.Shimmer height="86px" borderRadius={6} />
      </>
    );
  }
};
