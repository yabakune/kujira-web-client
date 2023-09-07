import { Signal } from "@preact/signals-react";
import { useCallback } from "react";
import { useSelector } from "react-redux";

import * as Components from "@/components";
import * as Redux from "@/redux";
import * as Selectors from "@/selectors";
import * as Types from "@/types";

import Styles from "./logbook-entry-purchases.module.scss";

type Props = {
  selectedPurchases: Signal<Types.SelectedPurchases>;
  purchaseIds: { id: number }[];
};

export const LogbookEntryPurchases = (props: Props) => {
  const purchases = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchEntryPurchases(state, props.purchaseIds)
  );

  const selectPurchase = useCallback((purchaseId: number) => {
    if (props.selectedPurchases.value[purchaseId]) {
      delete props.selectedPurchases.value[purchaseId];
    } else {
      props.selectedPurchases.value[purchaseId] = purchaseId;
    }
  }, []);

  return (
    <section className={Styles.container}>
      {purchases ? (
        purchases.map((purchase: Types.PurchaseModel | undefined) => {
          if (purchase) {
            return (
              <Components.Purchase
                key={`Logbook Entry Dropdown Purchase ${purchase.id}`}
                purchase={purchase}
                selectAction={selectPurchase}
                backgroundLevel={2}
              />
            );
          }
        })
      ) : (
        <>
          <Components.Shimmer height="45px" borderRadius={4} />
          <Components.Shimmer height="45px" borderRadius={4} />
          <Components.Shimmer height="45px" borderRadius={4} />
        </>
      )}
    </section>
  );
};
