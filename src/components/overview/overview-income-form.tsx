import { effect, useSignal } from "@preact/signals-react";
import { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Redux from "@/redux";
import * as Helpers from "@/helpers";
import * as Sagas from "@/sagas";
import * as Selectors from "@/selectors";
import { signalsStore } from "@/signals/signals";

import { OverviewInlineForm } from "./overview-inline-form";

const { currentLogbookId } = signalsStore;

const ExportedComponent = () => {
  const dispatch = useDispatch();

  const overviewId = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchLogbookOverviewId(state, currentLogbookId.value)
  );
  const overviewIncome = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchLogbookOverviewIncome(state, currentLogbookId.value)
  );

  const income = useSignal("");
  const incomeError = useSignal("");

  const updateIncome = useCallback(
    Helpers.debounce((overviewId: number) => {
      if (Helpers.userId) {
        dispatch(
          Sagas.updateOverviewRequest({
            income: Helpers.roundCostToNumber(Number(income.value)),
            overviewId,
            userId: Helpers.userId,
          })
        );
      }
    }, 800),
    []
  );

  effect(() => {
    const cents = income.value.split(".")[1];

    if (income.value.length === 0) {
      incomeError.value = "";
    } else {
      if (!Number(income.value) && Number(income.value) !== 0) {
        incomeError.value = "Income must be a number.";
      } else if (cents && cents.length > 2) {
        incomeError.value = "Cents should only be within the hundreds.";
      } else {
        incomeError.value = "";
      }
    }
  });

  useEffect(() => {
    if (overviewIncome) {
      income.value = Helpers.roundCost(overviewIncome);
    }
  }, [overviewIncome]);

  useEffect(() => {
    const validIncome = !incomeError.value && income.value.length > 0;
    const validOverviewIncome = overviewIncome || overviewIncome === 0;
    const validIncomePayload = Number(income.value) !== overviewIncome;

    if (
      validIncome &&
      overviewId &&
      validOverviewIncome &&
      validIncomePayload
    ) {
      updateIncome(overviewId);
    }
  }, [income.value, incomeError.value, overviewId, overviewIncome]);

  if (overviewId) {
    return (
      <OverviewInlineForm
        key="Overview Income Inline Form"
        title="Income"
        placeholder="Income"
        userInput={income}
        errorMessage={incomeError}
        icon={<Components.USD width={12} fill={8} />}
      />
    );
  } else {
    return <Components.Shimmer height="102px" borderRadius={6} />;
  }
};

export const OverviewIncomeForm = memo(ExportedComponent);
