import { Signal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Types from "@/types";
import { useCallback } from "react";

type Props = {
  purchases: Signal<Types.PurchaseModel[]>;
};

export const OnboardingRecurring = (props: Props) => {
  function addPurchase(): void {
    const emptyPurchase: Types.PurchaseModel = {
      id: props.purchases.value.length + 1,
      placement: props.purchases.value.length + 1,
      category: "monthly",
      description: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      entryId: 1,
    };
    props.purchases.value = [...props.purchases.value, emptyPurchase];
  }

  const updatePurchase = useCallback(
    (purchaseUpdateFields: Types.PurchaseUpdateFields) => {
      console.log("Purchases Before:", props.purchases.value);

      const { id, category, description, cost } = purchaseUpdateFields;
      const updatedPurchases = [...props.purchases.value];
      const index = id - 1;
      const purchase = updatedPurchases.splice(index, 1)[0];
      if (category) purchase.category = category;
      else if (description) purchase.description = description;
      else if (cost) purchase.cost = cost;
      Helpers.insertElementIntoArray(updatedPurchases, index, purchase);
      props.purchases.value = updatedPurchases;

      console.log("Purchases After:", props.purchases.value);
    },
    []
  );

  const deletePurchase = useCallback((id: number) => {
    const index = id - 1;
    props.purchases.value = Helpers.deleteArrayElement(
      props.purchases.value,
      index
    );
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
