import * as Components from "@/components";

import { useSignal } from "@preact/signals-react";

export const OnboardingRecurring = () => {
  const recurringPurchases = useSignal("");
  const opened = useSignal(true);

  return (
    <>
      <p>
        Many people have expenses that can be calculated and/or grouped into
        monthly segments, such as rent, grocery budget, gas, public
        transportation, and subscription services. If you have any expenses that
        occur on or can be grouped into consistent monthly payments, enter them
        all below.
      </p>

      <Components.PurchasesDropdown
        startOpened
        header={
          <Components.RecurringDropdownHeader
            opened={opened}
            remainingCost={15.49}
            totalCost={2031.62}
          />
        }
      >
        <div>Foo</div>
        <div>Foo</div>
        <div>Foo</div>
      </Components.PurchasesDropdown>
    </>
  );
};
