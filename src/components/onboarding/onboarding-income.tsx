import { Signal, effect, useSignal } from "@preact/signals-react";

import * as Components from "@/components";

type Props = {
  income: Signal<string>;
  disabled: Signal<boolean>;
};

export const OnboardingIncome = (props: Props) => {
  const incomeError = useSignal("");

  const cents = props.income.value.split(".")[1];

  effect(() => {
    if (props.income.value.length === 0) {
      incomeError.value = "";
      props.disabled.value = true;
    } else {
      if (!Number(props.income.value)) {
        incomeError.value = "Income must be a number.";
        props.disabled.value = true;
      } else if (cents && cents.length > 2) {
        incomeError.value = "Cents can only be within the hundreds.";
        props.disabled.value = true;
      } else {
        incomeError.value = "";
        props.disabled.value = false;
      }
    }
  });

  return (
    <>
      <p>
        Enter your leftover monthly income, after deducting taxes and all other
        required expenses.
      </p>

      <Components.Input
        type="text"
        placeholder="Income"
        userInput={props.income}
        errorMessage={incomeError}
        icon={<Components.USD width={16} fill={8} />}
        required
      />
    </>
  );
};
