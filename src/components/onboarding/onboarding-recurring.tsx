import { Signal, useSignal } from "@preact/signals-react";
import { useEffect } from "react";

import * as Components from "@/components";
import { PurchaseModel } from "@/types";

const testPurchases: PurchaseModel[] = [
  {
    id: 1,
    placement: 1,
    category: "monthly",
    description: "Rent",
    cost: 2000,
    createdAt: new Date(),
    updatedAt: new Date(),
    entryId: 1,
  },
  {
    id: 2,
    placement: 2,
    category: "monthly",
    description: "Netflix",
    cost: 15.49,
    createdAt: new Date(),
    updatedAt: new Date(),
    entryId: 1,
  },
  {
    id: 3,
    placement: 3,
    category: "monthly",
    description: "YouTube Premium",
    cost: 16.13,
    createdAt: new Date(),
    updatedAt: new Date(),
    entryId: 1,
  },
];

type Props = {
  recurringPurchaseCost: Signal<number>;
};

export const OnboardingRecurring = (props: Props) => {
  const recurringPurchases = useSignal("");

  useEffect(() => {
    for (const testPurchase of testPurchases) {
      if (testPurchase.cost) {
        props.recurringPurchaseCost.value =
          props.recurringPurchaseCost.value + testPurchase.cost;
      }
    }
  }, []);

  return (
    <>
      <p>
        Many people have expenses that can be calculated and/or grouped into
        monthly segments, such as rent, grocery budget, gas, public
        transportation, and subscription services. If you have any expenses that
        occur on or can be grouped into consistent monthly payments, enter them
        all below.
      </p>

      <Components.OverviewPurchasesDropdown
        title="Recurring Purchases"
        purchases={testPurchases}
        startOpened
      />
    </>
  );
};
