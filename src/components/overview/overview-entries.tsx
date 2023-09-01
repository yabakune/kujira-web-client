import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import * as Selectors from "@/selectors";
import { signalsStore } from "@/signals/signals";

import Styles from "./overview-entries.module.scss";

const { currentLogbookId } = signalsStore;

export const OverviewEntries = () => {
  console.log("Overview entries rendered");

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

  return <div className={Styles.container}>Overview Entries</div>;
};
