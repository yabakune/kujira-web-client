import { effect, useSignal } from "@preact/signals-react";
import { memo, useCallback, useEffect, useMemo } from "react";
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
  const overviewSavings = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchLogbookOverviewSavings(state, currentLogbookId.value)
  );

  const savings = useSignal("");
  const savingsError = useSignal("");

  const savedIncome = useMemo((): string => {
    if (overviewIncome && overviewSavings) {
      return `$${Helpers.formatRoundedCost(
        Helpers.calculateSavedIncome(overviewIncome, overviewSavings)
      )}`;
    } else {
      return "$0.00";
    }
  }, [overviewIncome, overviewSavings]);

  const updateSavings = useCallback(
    Helpers.debounce((overviewId: number) => {
      if (Helpers.userId) {
        dispatch(
          Sagas.updateOverviewRequest({
            savings: Number(savings.value),
            overviewId,
            userId: Helpers.userId,
          })
        );
      }
    }, 800),
    []
  );

  effect(() => {
    if (savings.value.length === 0) {
      savingsError.value = "";
    } else {
      if (!Number(savings.value) && Number(savings.value) !== 0) {
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

  useEffect(() => {
    if (overviewSavings) {
      savings.value = overviewSavings.toString();
    }
  }, [overviewSavings]);

  useEffect(() => {
    const validSavings = !savingsError.value && savings.value.length > 0;
    const validOverviewSavings = overviewSavings || overviewSavings === 0;
    const validSavingsPayload = Number(savings.value) !== overviewSavings;

    if (
      validSavings &&
      overviewId &&
      validOverviewSavings &&
      validSavingsPayload
    ) {
      updateSavings(overviewId);
    }
  }, [savings.value, savingsError.value, overviewId, overviewSavings]);

  if (overviewId) {
    return (
      <OverviewInlineForm
        key="Overview Savings Inline Form"
        title="Savings"
        titlePrimary={savedIncome}
        placeholder="Savings"
        userInput={savings}
        errorMessage={savingsError}
        icon={<Components.Percent width={12} fill={8} />}
      />
    );
  } else {
    return <Components.Shimmer height="102px" borderRadius={6} />;
  }
};

export const OverviewSavingsForm = memo(ExportedComponent);
