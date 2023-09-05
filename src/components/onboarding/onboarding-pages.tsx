import dynamic from "next/dynamic";
import { Signal, effect, useSignal } from "@preact/signals-react";
import { memo } from "react";

import * as Components from "@/components";

import Styles from "./onboarding-pages.module.scss";

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

type DisplayProps = {
  show: boolean;
  children: React.ReactNode;
};

const Display = (props: DisplayProps) => {
  return (
    <div
      className={`
      ${Styles.display}
      ${props.show ? Styles.show : Styles.hide}
    `}
    >
      {props.children}
    </div>
  );
};

type Props = {
  page: Signal<number>;
  recurringOverviewTotalCost: Signal<number>;
  income: Signal<string>;
  savings: Signal<string>;
  disabled: Signal<boolean>;
};

const ExportedComponent = (props: Props) => {
  const pageLoadedCache = useSignal<{ [key: string]: boolean }>({
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  effect(() => {
    if (props.page.value === 2) pageLoadedCache.value[2] = true;
    else if (props.page.value === 3) pageLoadedCache.value[3] = true;
    else if (props.page.value === 4) pageLoadedCache.value[4] = true;
    else if (props.page.value === 5) pageLoadedCache.value[5] = true;
    else if (props.page.value === 6) pageLoadedCache.value[6] = true;
  });

  return (
    <>
      <Display show={props.page.value === 1}>
        <Components.OnboardingWelcome />
      </Display>

      {pageLoadedCache.value[2] && (
        <Display show={props.page.value === 2}>
          <DynamicIncome income={props.income} disabled={props.disabled} />
        </Display>
      )}

      {pageLoadedCache.value[3] && (
        <Display show={props.page.value === 3}>
          <DynamicSavings
            income={props.income}
            savings={props.savings}
            disabled={props.disabled}
          />
        </Display>
      )}

      {pageLoadedCache.value[4] && (
        <Display show={props.page.value === 4}>
          <DynamicRecurring
            recurringOverviewTotalCost={props.recurringOverviewTotalCost}
            disabled={props.disabled}
          />
        </Display>
      )}

      {pageLoadedCache.value[5] && (
        <Display show={props.page.value === 5}>
          <DynamicIncoming disabled={props.disabled} />
        </Display>
      )}

      {pageLoadedCache.value[6] && (
        <Display show={props.page.value === 6}>
          <DynamicFinal />
        </Display>
      )}
    </>
  );
};

export const OnboardingPages = memo(ExportedComponent);
