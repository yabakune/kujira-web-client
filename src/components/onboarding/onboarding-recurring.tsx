import * as Components from "@/components";
import { PurchaseModel } from "@/types";

import { useSignal } from "@preact/signals-react";

const testPurchases: PurchaseModel[] = [
  {
    id: 1,
    placement: 1,
    category: "monthly",
    description: "Test 1",
    cost: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    entryId: 1,
  },
  {
    id: 2,
    placement: 2,
    category: "monthly",
    description: "Test 2",
    cost: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    entryId: 1,
  },
  {
    id: 3,
    placement: 3,
    category: "monthly",
    description: "Test 3",
    cost: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    entryId: 1,
  },
];

export const OnboardingRecurring = () => {
  const recurringPurchases = useSignal("");

  return (
    <>
      <p>
        Many people have expenses that can be calculated and/or grouped into
        monthly segments, such as rent, grocery budget, gas, public
        transportation, and subscription services. If you have any expenses that
        occur on or can be grouped into consistent monthly payments, enter them
        all below.
      </p>

      <Components.OverviewDropdown purchases={testPurchases} startOpened />
    </>
  );
};
