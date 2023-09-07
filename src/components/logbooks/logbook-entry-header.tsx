import { Signal, effect, useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Helpers from "@/helpers";

import Styles from "./logbook-entry-header.module.scss";

function determineBudgetHealth(budget: number): string {
  if (budget <= 0.25) return Styles.low;
  else if (budget <= 0.5) return Styles.moderate;
  else if (budget <= 0.75) return Styles.high;
  else return Styles.excellent;
}

type Props = {
  name: string;
  budget?: number | null;
  totalSpent: number;
  opened: Signal<boolean>;
};

export const LogbookEntryHeader = (props: Props) => {
  const name = useSignal(props.name);
  const budget = useSignal(props.budget ? Helpers.roundCost(props.budget) : "");
  const spent = useSignal("");
  const nameError = useSignal("");
  const budgetError = useSignal("");
  const spentError = useSignal("");

  function toggleOpened(): void {
    props.opened.value = !props.opened.value;
  }

  effect(() => {
    if (budget.value === "") {
    } else {
      budgetError.value = "";
      if (!Number(budget.value)) {
        budgetError.value = "Budget must be a number!";
      } else {
        budgetError.value = "";
      }
    }
  });

  return (
    <header
      className={`
      ${Styles.container}
      ${Helpers.setBackgroundClickHover(2)}
    `}
      onClick={toggleOpened}
    >
      <section className={Styles.inputs}>
        <Components.Input
          type="text"
          placeholder="DD/MM/YYYY"
          userInput={name}
          errorMessage={nameError}
          icon={<Components.Calendar width={12} fill={8} />}
          onClick={Helpers.preventBubbling}
          required
        />
        <Components.Input
          type="text"
          placeholder="Budget"
          userInput={budget}
          errorMessage={budgetError}
          icon={<Components.Wallet width={12} fill={8} />}
          onClick={Helpers.preventBubbling}
          required
        />
        <Components.Input
          type="text"
          placeholder="Spent"
          userInput={spent}
          errorMessage={spentError}
          icon={<Components.USD width={12} fill={8} />}
          backgroundLevel={2}
          preventInteraction
          required
        />
        <Components.ButtonIcon
          onClick={() => console.log("Delete Entry")}
          backgroundLevel={2}
        >
          <Components.Close width={14} fill={8} />
        </Components.ButtonIcon>
      </section>

      {props.budget && budgetError.value === "" && (
        <section className={Styles.budgetHealth}>
          <p className={Styles.remainingBudget}>
            <span
              className={determineBudgetHealth(
                props.totalSpent / Number(budget.value)
              )}
            >
              {Helpers.formatRoundedCost(props.totalSpent)}
            </span>
            {" / "}
            {Helpers.formatRoundedCost(Number(budget.value))}
          </p>
        </section>
      )}
    </header>
  );
};
