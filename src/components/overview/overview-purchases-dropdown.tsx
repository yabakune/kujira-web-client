import { Signal, useSignal } from "@preact/signals-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import * as Selectors from "@/selectors";
import * as Types from "@/types";

import { OverviewDropdownHeader } from "./recurring-dropdown-header";

import Styles from "./overview-purchases-dropdown.module.scss";

type Props = {
  title: string;
  onboardingPurchases?: Types.PurchaseModel[];
  entryId?: number;
  addPurchase: () => void;
  updatePurchase: Types.UpdatePurchase;
  deletePurchase: Types.DeletePurchase;
  disabled?: Signal<boolean>;
  borderRadius?: number;
  startOpened?: true;
  shadow?: true;
};

export const OverviewPurchasesDropdown = (props: Props) => {
  const dispatch = useDispatch();

  const opened = useSignal(props.startOpened || false);

  const { purchases } = useSelector(
    (state: Redux.ReduxStore) => state.entities
  );
  const entryPurchases = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchEntryPurchase(state, props.entryId)
  );

  useEffect(() => {
    if (props.entryId) {
      // Dispatch entry purchase fetching
    }
  }, [props.entryId]);

  return (
    <section
      className={`
				${Styles.container}
        ${props.shadow && Styles.shadow}
				${opened.value ? Styles.opened : Styles.closed}
			`}
      style={{ borderRadius: Helpers.setBorderRadius(props.borderRadius) }}
    >
      <OverviewDropdownHeader
        title={props.title}
        opened={opened}
        totalCost={Helpers.calculatePurchasesTotalCost(
          props.onboardingPurchases || []
        )}
        addPurchase={props.addPurchase}
      />

      <article
        className={`
				${Styles.purchases}
				${!opened.value && Styles.closed}
			`}
      >
        {props.onboardingPurchases &&
          props.onboardingPurchases.map(
            (purchase: Types.PurchaseModel, index: number) => {
              return (
                <Components.Purchase
                  key={`${purchase.id} ${index}`}
                  purchase={purchase}
                  updatePurchase={props.updatePurchase}
                  deletePurchase={props.deletePurchase}
                  disabled={props.disabled}
                  backgroundLevel={2}
                  hideCategories
                />
              );
            }
          )}
      </article>
    </section>
  );
};
