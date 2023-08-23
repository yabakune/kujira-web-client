import { useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Types from "@/types";

import { OverviewDropdownHeader } from "./recurring-dropdown-header";

import Styles from "./overview-purchases-dropdown.module.scss";

type Props = {
  title: string;
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
      <OverviewDropdownHeader
        title={props.title}
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
              purchase={purchase}
              backgroundLevel={2}
            />
          );
        })}
      </article>
    </section>
  );
};
