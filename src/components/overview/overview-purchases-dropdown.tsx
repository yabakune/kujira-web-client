import { Signal, useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Types from "@/types";

import { OverviewDropdownHeader } from "./recurring-dropdown-header";

import Styles from "./overview-purchases-dropdown.module.scss";

type Props = {
  title: string;
  purchases: Types.PurchaseModel[];
  addPurchase: () => void;
  updatePurchase: Types.UpdatePurchase;
  deletePurchase: Types.DeletePurchase;
  disabled?: Signal<boolean>;
  borderRadius?: number;
  startOpened?: true;
};

export const OverviewPurchasesDropdown = (props: Props) => {
  const opened = useSignal(props.startOpened || false);

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
        totalCost={Helpers.calculatePurchasesTotalCost(props.purchases)}
        addPurchase={props.addPurchase}
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
              updatePurchase={props.updatePurchase}
              deletePurchase={props.deletePurchase}
              disabled={props.disabled}
              backgroundLevel={2}
              hideCategories
            />
          );
        })}
      </article>
    </section>
  );
};
