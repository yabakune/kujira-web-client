import { Signal } from "@preact/signals-react";
import { useCallback } from "react";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Types from "@/types";

type Props = {
  purchases: Signal<Types.PurchaseModel[]>;
};

export const OnboardingIncoming = (props: Props) => {
  const addPurchase = useCallback(() => {
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
  }, []);

  const updatePurchase = useCallback(
    Helpers.debounce((purchaseUpdateFields: Types.PurchaseUpdateFields) => {
      const { id, category, description, cost } = purchaseUpdateFields;
      const updatedPurchases = [...props.purchases.value];
      const index = id - 1;
      const purchase = updatedPurchases.splice(index, 1)[0];
      if (category) purchase.category = category;
      else if (description) purchase.description = description;
      else if (cost) purchase.cost = cost;
      Helpers.insertElementIntoArray(updatedPurchases, index, purchase);
      props.purchases.value = updatedPurchases;
    }),
    []
  );

  const deletePurchase = useCallback((id: number) => {
    let purchaseIndex: number | null = null;

    for (let index = 0; index < props.purchases.value.length; index++) {
      const purchase = props.purchases.value[index];
      if (purchase.id === id) {
        purchaseIndex = index;
        break;
      }
    }

    if (purchaseIndex || purchaseIndex === 0) {
      props.purchases.value = Helpers.deleteArrayElement(
        props.purchases.value,
        purchaseIndex
      );
    }
  }, []);

  return (
    <>
      <p>
        Are you aware of any incoming purchases that will eventually come down
        your way but are not sure when you have to pay for them? Or do you have
        any payments in general that you want to jot down for later? If so,
        enter them all below.
      </p>

      <Components.OverviewPurchasesDropdown
        title="Incoming Purchases"
        purchases={props.purchases.value}
        addPurchase={addPurchase}
        updatePurchase={updatePurchase}
        deletePurchase={deletePurchase}
        startOpened
      />
    </>
  );
};
