import { effect, useSignal } from "@preact/signals-react";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import * as Selectors from "@/selectors";
import { signalsStore } from "@/signals/signals";

import { OverviewInlineForm } from "./overview-inline-form";

const { currentLogbookId } = signalsStore;

export const OverviewInlineForms = () => {
  const dispatch = useDispatch();

  const currentOverview = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchLogbookOverview(state, currentLogbookId.value)
  );

  const income = useSignal(
    currentOverview ? Helpers.roundCost(currentOverview.income) : ""
  );
  const savings = useSignal(
    currentOverview ? currentOverview.savings.toString() : ""
  );
  const incomeError = useSignal("");
  const savingsError = useSignal("");

  const cents = income.value.split(".")[1];

  effect(() => {
    if (income.value.length === 0) {
      incomeError.value = "";
    } else {
      if (!Number(income.value)) {
        incomeError.value = "Income must be a number.";
      } else if (cents && cents.length > 2) {
        incomeError.value = "Cents can only be within the hundreds.";
      } else {
        incomeError.value = "";
      }
    }

    if (savings.value.length === 0) {
      savingsError.value = "";
    } else {
      if (!Number(savings.value)) {
        savingsError.value = "Savings must be a number.";
      } else if (Number(savings.value) < 0) {
        savingsError.value = "Savings can't go below 0%.";
      } else if (Number(savings.value) > 100) {
        savingsError.value = "Savings can't go above 100%.";
      } else {
        savingsError.value = "";
      }
    }
  });

  const savedIncome = useMemo((): string => {
    if (currentOverview) {
      return `$${Helpers.formatRoundedCost(
        Helpers.calculateSavedIncome(
          currentOverview.income,
          currentOverview.savings
        )
      )}`;
    } else {
      return "$0.00";
    }
  }, [currentOverview]);

  const updateIncome = useCallback(
    Helpers.debounce(() => {
      if (currentOverview && Helpers.userId) {
        if (Number(income.value) !== currentOverview.income) {
          dispatch(
            Sagas.updateOverviewRequest({
              income: Number(income.value),
              overviewId: currentOverview.id,
              userId: Helpers.userId,
            })
          );
        }
      }
    }, 800),
    []
  );

  const updateSavings = useCallback(
    Helpers.debounce(() => {
      if (currentOverview && Helpers.userId) {
        if (Number(savings.value) !== currentOverview.savings) {
          dispatch(
            Sagas.updateOverviewRequest({
              savings: Number(savings.value),
              overviewId: currentOverview.id,
              userId: Helpers.userId,
            })
          );
        }
      }
    }, 800),
    []
  );

  return (
    <>
      <OverviewInlineForm
        key="Overview Income Inline Form"
        title="Income"
        placeholder="Income"
        userInput={income}
        errorMessage={incomeError}
        icon={<Components.USD width={12} fill={8} />}
        action={updateIncome}
      />

      <OverviewInlineForm
        key="Overview Savings Inline Form"
        title="Savings"
        titlePrimary={savedIncome}
        placeholder="Savings"
        userInput={savings}
        errorMessage={savingsError}
        icon={<Components.Percent width={12} fill={8} />}
        action={updateSavings}
      />
    </>
  );
};
