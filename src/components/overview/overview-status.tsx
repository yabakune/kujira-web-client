import { useSignal } from "@preact/signals-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Selectors from "@/selectors";
import { signalsStore } from "@/signals/signals";

import Styles from "./overview-status.module.scss";
import Snippets from "@/styles/snippets.module.scss";

const { currentLogbookId } = signalsStore;

export const OverviewStatus = () => {
  const remainingBudget = useSignal(0);
  const budgetStatusText = useSignal("");

  const currentLogbook = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchLogbook(state, currentLogbookId.value)
  );

  const currentOverview = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchLogbookOverview(state, currentLogbookId.value)
  );

  const currentLogbookEntriesTotalSpent = useSelector(
    (state: Redux.ReduxStore) =>
      Selectors.calculateLogbookEntriesTotalSpent(state, currentLogbookId.value)
  );

  useEffect(() => {
    if (currentOverview) {
      const { income, savings } = currentOverview;
      const savedIncome = income * (savings / 100);
      remainingBudget.value =
        income - savedIncome - currentLogbookEntriesTotalSpent;
    }
  }, [currentOverview, currentLogbookEntriesTotalSpent]);

  function determineRemainingBudgetHealth(): string {
    if (currentOverview) {
      if (remainingBudget.value <= currentOverview.income * 0.25) {
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

  return (
    <section className={Styles.container}>
      <article className={Styles.header}>
        <div className={Styles.headerCopy}>
          <h1 className={Snippets.titleText}>
            {currentLogbook ? `${currentLogbook.name} Logbook` : "..."}
          </h1>
          <p className={Styles.headerCopyCaption}>Remaining Budget</p>
        </div>
        <Components.ButtonIcon
          onClick={() => (currentLogbookId.value = null)}
          backgroundLevel={2}
        >
          <Components.Filter width={14} fill={8} />
        </Components.ButtonIcon>
      </article>

      {currentOverview && (
        <article className={Styles.status}>
          <div className={Styles.statusCopy}>
            <p className={Styles.remaining}>
              <span
                className={`
								${Styles.remaining}
								${determineRemainingBudgetHealth()}
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
            progression={(remainingBudget.value / currentOverview.income) * 100}
          />
        </article>
      )}
    </section>
  );
};
