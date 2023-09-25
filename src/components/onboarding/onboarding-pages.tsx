import dynamic from "next/dynamic";
import { Signal, effect, useSignal } from "@preact/signals-react";
import { memo } from "react";

import * as Components from "@/components";

const DynamicIncome = dynamic(() =>
  import("@/components/onboarding/onboarding-income").then(
    (mod) => mod.OnboardingIncome
  )
);

const DynamicSavings = dynamic(() =>
  import("@/components/onboarding/onboarding-savings").then(
    (mod) => mod.OnboardingSavings
  )
);

const DynamicRecurring = dynamic(() =>
  import("@/components/onboarding/onboarding-recurring").then(
    (mod) => mod.OnboardingRecurring
  )
);

const DynamicIncoming = dynamic(() =>
  import("@/components/onboarding/onboarding-incoming").then(
    (mod) => mod.OnboardingIncoming
  )
);

const DynamicFinal = dynamic(() =>
  import("@/components/onboarding/onboarding-final").then(
    (mod) => mod.OnboardingFinal
  )
);

type Props = {
  page: Signal<number>;
  recurringOverviewTotalCost: Signal<number>;
  income: Signal<string>;
  savings: Signal<string>;
  disabled: Signal<boolean>;
};

const ExportedComponent = (props: Props) => {
  return (
    <>
      {props.page.value === 1 ? (
        <Components.OnboardingWelcome />
      ) : props.page.value === 2 ? (
        <DynamicIncome income={props.income} disabled={props.disabled} />
      ) : props.page.value === 3 ? (
        <DynamicSavings
          income={props.income}
          savings={props.savings}
          disabled={props.disabled}
        />
      ) : props.page.value === 4 ? (
        <DynamicRecurring
          recurringOverviewTotalCost={props.recurringOverviewTotalCost}
          disabled={props.disabled}
        />
      ) : props.page.value === 5 ? (
        <DynamicIncoming disabled={props.disabled} />
      ) : (
        <DynamicFinal />
      )}
    </>
  );
};

export const OnboardingPages = memo(ExportedComponent);
