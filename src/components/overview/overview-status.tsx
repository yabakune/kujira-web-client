import { Signal, useSignal } from "@preact/signals-react";
import { useRouter } from "next/router";
import { memo, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Constants from "@/constants";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import * as Selectors from "@/selectors";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

import Styles from "./overview-status.module.scss";
import Snippets from "@/styles/snippets.module.scss";

const { currentLogbookId, menuModalOpen } = signalsStore;

function generateNewLogbookEntryName(): string {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const year = today.getFullYear();
  return `${month}/${day}/${year}`;
}

function determineRemainingBudgetHealth(
  remainingBudget: Signal<number>,
  budgetStatusText: Signal<string>,
  currentOverview?: Types.OverviewModel
): string {
  if (currentOverview) {
    if (remainingBudget.value < 0) {
      budgetStatusText.value = "You're cutting into next month's budget!";
      return Styles.low;
    } else if (remainingBudget.value === 0) {
      budgetStatusText.value = "You ran out of this month's budget!";
      return Styles.low;
    } else if (remainingBudget.value <= currentOverview.income * 0.25) {
      budgetStatusText.value = "Your budget is running low!";
      return Styles.low;
    } else if (remainingBudget.value <= currentOverview.income * 0.5) {
      budgetStatusText.value = "Your budget is doing alright.";
      return Styles.moderate;
    } else if (remainingBudget.value <= currentOverview.income * 0.75) {
      budgetStatusText.value = "Your budget is doing great!";
      return Styles.high;
    } else {
      budgetStatusText.value = "Whoa! Your budget is so healthy!";
      return Styles.excellent;
    }
  } else {
    budgetStatusText.value = "";
    return "";
  }
}

const ExportedComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { entries } = useSelector((state: Redux.ReduxStore) => state.entities);
  const currentLogbookName = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchCurrentLogbookName(state, currentLogbookId.value)
  );
  const currentOverview = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchLogbookOverview(state, currentLogbookId.value)
  );
  const recurringOverviewEntryTotalSpent = useSelector(
    (state: Redux.ReduxStore) =>
      Selectors.recurringOverviewEntryTotalSpent(state, currentLogbookId.value)
  );
  const logbookNonMonthlyTotalSpent = useSelector((state: Redux.ReduxStore) =>
    Selectors.logbookNonMonthlyTotalSpent(state, currentLogbookId.value)
  );

  const remainingBudget = useSignal(0);
  const budgetStatusText = useSignal("");

  const inLogbooksPage = router.pathname === Constants.ClientRoutes.LOGBOOKS;

  const calculatedRemainingBudget = useMemo(() => {
    if (currentOverview) {
      const { income, savings } = currentOverview;
      const savedIncome = Helpers.calculateSavedIncome(income, savings);
      return (
        income -
        savedIncome -
        recurringOverviewEntryTotalSpent -
        logbookNonMonthlyTotalSpent
      );
    } else {
      return remainingBudget.value;
    }
  }, [
    currentOverview,
    recurringOverviewEntryTotalSpent,
    logbookNonMonthlyTotalSpent,
  ]);

  function toggleLogbookSelector(): void {
    currentLogbookId.value = null;
    menuModalOpen.value = false;
  }

  function createLogbookEntry(): void {
    if (currentLogbookId.value && Helpers.userId) {
      dispatch(
        Sagas.createEntryRequest({
          name: generateNewLogbookEntryName(),
          logbookId: currentLogbookId.value,
          userId: Helpers.userId,
        })
      );
    }
  }

  useEffect(() => {
    if (remainingBudget.value !== calculatedRemainingBudget) {
      remainingBudget.value = calculatedRemainingBudget;
    }
  }, [calculatedRemainingBudget]);

  useEffect(() => {
    if (!entries && currentLogbookId.value && Helpers.userId) {
      dispatch(
        Sagas.fetchLogbookEntriesRequest({
          logbookId: currentLogbookId.value,
          userId: Helpers.userId,
        })
      );
    }
  }, [entries]);

  return (
    <section className={Styles.container}>
      <article className={Styles.header}>
        <div className={Styles.headerCopy}>
          <h1 className={Snippets.titleText}>{currentLogbookName ?? "..."}</h1>
          <p className={Styles.headerCopyCaption}>Remaining Budget</p>
        </div>
        <section className={Styles.headerButtons}>
          <Components.ButtonIcon
            onClick={toggleLogbookSelector}
            backgroundLevel={2}
          >
            <Components.Filter width={14} fill={8} />
          </Components.ButtonIcon>
          <div
            className={`
            ${Styles.addLogbookButton}
            ${inLogbooksPage && Styles.show}`}
          >
            <Components.ButtonIcon onClick={createLogbookEntry} primary>
              <Components.Plus width={14} fill={12} />
            </Components.ButtonIcon>
          </div>
        </section>
      </article>

      {currentOverview ? (
        <article className={Styles.status}>
          <div className={Styles.statusCopy}>
            <p className={Styles.remaining}>
              <span
                className={`
								${Styles.remaining}
								${determineRemainingBudgetHealth(
                  remainingBudget,
                  budgetStatusText,
                  currentOverview
                )}
							`}
              >
                ${Helpers.formatRoundedCost(remainingBudget.value)}
              </span>{" "}
              / ${Helpers.formatRoundedCost(currentOverview.income)}
            </p>
            {budgetStatusText.value && <p>{budgetStatusText.value}</p>}
          </div>
          <Components.ProgressBar
            height={8}
            progression={
              (remainingBudget.value / currentOverview.income) * 100 || 0
            }
          />
        </article>
      ) : (
        <Components.Shimmer height="56px" borderRadius={4} />
      )}
    </section>
  );
};

export const OverviewStatus = memo(ExportedComponent);
