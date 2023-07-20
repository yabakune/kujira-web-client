import { useSignal } from "@preact/signals-react";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Constants from "@/constants";
import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import * as Selectors from "@/selectors";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

import { OverviewCell } from "./overview-cell";

import Styles from "./overview-info.module.scss";

export const OverviewInfo = () => {
  const dispatch = useDispatch();
  const { selectedLogbookId, totalSpent, remaining } = signalsStore;

  const currentOverview = useSelector((state: Redux.ReduxStore) => {
    return Selectors.selectLogbookOverview(state, selectedLogbookId.value);
  });

  const income = useSignal("");
  const savings = useSignal("");

  const incomeError = useSignal("");
  const savingsError = useSignal("");

  function updateOverview(event: Types.OnSubmit) {
    event.preventDefault();
    if (
      currentOverview &&
      Constants.userId &&
      incomeError.value.length === 0 &&
      savingsError.value.length === 0
    ) {
      dispatch(
        Sagas.updateOverviewRequest({
          income: Helpers.truncateCost(Number(income.value)),
          savings: Helpers.truncateCost(Number(savings.value)),
          overviewId: currentOverview.id,
          userId: Constants.userId,
        })
      );
    }
  }

  useEffect(() => {
    if (selectedLogbookId.value && Constants.userId) {
      dispatch(
        Sagas.fetchLogbookOverviewRequest({
          logbookId: selectedLogbookId.value,
          userId: Constants.userId,
        })
      );
    }
  }, [selectedLogbookId.value]);

  useEffect(() => {
    if (currentOverview) {
      income.value = Helpers.truncateCostToString(currentOverview.income);
      savings.value = Helpers.truncateCostToString(currentOverview.savings);

      totalSpent.value = Helpers.truncateCostToString(
        currentOverview.income - currentOverview.savings
      );

      remaining.value = Helpers.truncateCostToString(
        currentOverview.income - currentOverview.savings
      );
    } else {
      income.value = "";
      savings.value = "";
    }
  }, [currentOverview]);

  return (
    <section className={Styles.container}>
      <header className={Styles.header}>
        <h2 className={Styles.title}>My Overview</h2>
        <p className={Styles.saving}>
          Saving <span className={Styles.calculation}>$400.00</span>
        </p>
      </header>

      <form className={Styles.overviewCells} onSubmit={updateOverview}>
        <OverviewCell
          key="overview-cell-income"
          label="Income"
          value={income}
          valueError={incomeError}
          cost
        />

        <OverviewCell
          key="overview-cell-savings"
          label="Savings"
          value={savings}
          valueError={savingsError}
        />

        <OverviewCell
          key="overview-cell-total-spent"
          label="Total Spent"
          value={totalSpent}
          cost
          frozen
        />

        <OverviewCell
          key="overview-cell-remaining"
          label="Remaining"
          value={remaining}
          cost
          frozen
        />

        <Components.Button
          type="submit"
          text={
            selectedLogbookId.value ? "Update Overview" : "Select a Logbook"
          }
          disabled={!selectedLogbookId.value}
          centerContents
          addClick
          primary
        />

        <button type="submit" style={{ display: "none" }} />
      </form>
    </section>
  );
};
