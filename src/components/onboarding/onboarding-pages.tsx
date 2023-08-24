import dynamic from "next/dynamic";
import { Signal } from "@preact/signals-react";
import { memo } from "react";

import * as Components from "@/components";
import * as Types from "@/types";

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
  income: Signal<string>;
  savings: Signal<string>;
  recurringPurchases: Signal<Types.PurchaseModel[]>;
  incomingPurchases: Signal<Types.PurchaseModel[]>;
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
        <DynamicRecurring purchases={props.recurringPurchases} />
      ) : props.page.value === 5 ? (
        <DynamicIncoming purchases={props.incomingPurchases} />
      ) : (
        <DynamicFinal />
      )}
    </>
  );
};

export const OnboardingPages = memo(ExportedComponent);
