import { Signal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Types from "@/types";
import { useCallback } from "react";

type Props = {
  purchases: Signal<Types.PurchaseModel[]>;
};

export const OnboardingRecurring = (props: Props) => {
  function addPurchase(): void {
    props.purchases.value.push({
      id: props.purchases.value.length + 1,
      placement: props.purchases.value.length + 1,
      category: "monthly",
      description: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      entryId: 1,
    });
  }

  const updatePurchase = useCallback(() => {
    console.log("Update Purchase");
  }, []);

  const deletePurchase = useCallback((index: number) => {
    props.purchases.value.splice(index);
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
        purchases={props.purchases.value}
        addPurchase={addPurchase}
        updatePurchase={updatePurchase}
        deletePurchase={deletePurchase}
        startOpened
      />
    </>
  );
};
