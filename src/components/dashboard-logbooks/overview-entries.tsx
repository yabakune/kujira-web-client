import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Constants from "@/constants";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import * as Selectors from "@/selectors";
import { signalsStore } from "@/signals/signals";

import Styles from "./overview-entries.module.scss";

export const OverviewEntries = () => {
  const dispatch = useDispatch();
  const { selectedLogbookId } = signalsStore;

  const currentLogbook = useSelector((state: Redux.ReduxStore) => {
    return Selectors.selectLogbook(state, selectedLogbookId.value);
  });

  const currentOverview = useSelector((state: Redux.ReduxStore) => {
    return Selectors.selectLogbookOverview(state, selectedLogbookId.value);
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

  return <section className={Styles.container}></section>;
};
