import { Signal, effect, useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Helpers from "@/helpers";

import Styles from "@/styles/onboarding.module.scss";

type Props = {
  income: Signal<string>;
  savings: Signal<string>;
  disabled: Signal<boolean>;
};

export const OnboardingSavings = (props: Props) => {
  const savingsError = useSignal("");

  effect(() => {
    if (props.savings.value.length === 0) {
      savingsError.value = "";
      props.disabled.value = true;
    } else {
      if (!Number(props.savings.value)) {
        savingsError.value = "Savings must be a number.";
        props.disabled.value = true;
      } else if (Number(props.savings.value) < 0) {
        savingsError.value = "Savings can't go below 0%.";
        props.disabled.value = true;
      } else if (Number(props.savings.value) > 100) {
        savingsError.value = "Savings can't go above 100%.";
        props.disabled.value = true;
      } else {
        savingsError.value = "";
        props.disabled.value = false;
      }
    }
  });

  return (
    <>
      <p>
        You never know when you’re going to have a rainy day, so it’s important
        that you set aside a portion of your income as emergency cash to prepare
        for that day. Enter the percentage of your take-home income you’d like
        to save every month below.
      </p>

      <p>
        If you’re not sure how much you want to or should save, a common
        percentage-based budget is the 50/30/20 rule, where 50% of your income
        goes to your needs, 30% goes to your wants, and 20% goes to your
        savings. if you want to start with that, enter “20” (without the quotes”
        below and proceed to the next step.
      </p>

      <p>
        You are currently saving:{" "}
        <span className={Styles.highlight}>
          $
          {Helpers.roundCost(
            Helpers.calculateSavedIncome(
              Number(props.income.value),
              Number(props.savings.value)
            )
          )}
        </span>
        .
      </p>

      <Components.Input
        type="text"
        placeholder="Savings"
        userInput={props.savings}
        errorMessage={savingsError}
        icon={<Components.Percent width={16} fill={8} />}
        autoFocus
        required
      />
    </>
  );
};
