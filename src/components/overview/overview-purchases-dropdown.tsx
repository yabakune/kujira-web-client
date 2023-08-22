import { useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Types from "@/types";

import { RecurringDropdownHeader } from "./recurring-dropdown-header";

import Styles from "./overview-purchases-dropdown.module.scss";

type Props = {
  purchases: Types.PurchaseModel[];
  borderRadius?: number;
  startOpened?: true;
};

export const OverviewPurchasesDropdown = (props: Props) => {
  const opened = useSignal(props.startOpened || false);

  function calculateTotalCost(): number {
    let totalCost = 0;
    for (const purchase of props.purchases) {
      if (purchase.cost) totalCost += purchase.cost;
    }
    return totalCost;
  }

  return (
    <section
      className={`
				${Styles.container}
				${opened.value ? Styles.opened : Styles.closed}
			`}
      style={{ borderRadius: Helpers.setBorderRadius(props.borderRadius) }}
    >
      <RecurringDropdownHeader
        opened={opened}
        totalCost={calculateTotalCost()}
      />

      <article
        className={`
				${Styles.purchases}
				${!opened.value && Styles.closed}
			`}
      >
        {props.purchases.map((purchase: Types.PurchaseModel, index: number) => {
          return (
            <Components.Purchase
              key={`${purchase.id}-${index}`}
              id={purchase.id}
              category={purchase.category}
              description={purchase.description}
              cost={purchase.cost ? purchase.cost.toString() : ""}
              backgroundLevel={2}
            />
          );
        })}
      </article>
    </section>
  );
};
