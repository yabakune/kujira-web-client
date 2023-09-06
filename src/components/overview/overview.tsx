import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import * as Selectors from "@/selectors";
import { signalsStore } from "@/signals/signals";

import { OverviewHeader } from "./overview-header";
import { OverviewIncomeForm } from "./overview-income-form";
import { OverviewSavingsForm } from "./overview-savings-form";
import { OverviewEntries } from "./overview-entries";

import Styles from "./overview.module.scss";

const { currentLogbookId } = signalsStore;

const LogbookOverviewFetcher = () => {
  const dispatch = useDispatch();

  const { overviews } = useSelector(
    (state: Redux.ReduxStore) => state.entities
  );

  useEffect(() => {
    if (!overviews && currentLogbookId.value && Helpers.userId) {
      dispatch(
        Sagas.fetchLogbookOverviewRequest({
          logbookId: currentLogbookId.value,
          userId: Helpers.userId,
        })
      );
    }
  }, [overviews]);

  return null;
};

export const Overview = () => {
  const overviewId = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchLogbookOverviewId(state, currentLogbookId.value)
  );

  return (
    <section className={Styles.container}>
      <LogbookOverviewFetcher />

      <OverviewHeader />

      <OverviewIncomeForm />

      <OverviewSavingsForm />

      {overviewId ? (
        <OverviewEntries overviewId={overviewId} />
      ) : (
        <>
          <Components.Shimmer height="151px" borderRadius={6} />
          <Components.Shimmer height="102px" borderRadius={6} />
          <Components.Shimmer height="102px" borderRadius={6} />
        </>
      )}
    </section>
  );
};
