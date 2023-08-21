import { Signal, effect, useSignal } from "@preact/signals-react";

import * as Components from "@/components";

type Props = {
  income: Signal<string>;
  disabled: Signal<boolean>;
};

export const OnboardingIncome = (props: Props) => {
  const incomeError = useSignal("");

  effect(() => {});

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
