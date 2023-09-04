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
  startOpened?: boolean;
  shadow?: true;
};

export const OverviewPurchasesDropdown = (props: Props) => {
  console.log("Overview purchases dropdown");

  const dispatch = useDispatch();

  const opened = useSignal(props.startOpened || false);

  const entryPurchases = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchEntryPurchase(state, props.entryId)
  );

  function addPurchase(): void {
    if (props.entryId && entryPurchases && Helpers.userId) {
      dispatch(
        Sagas.createPurchaseRequest({
          placement: entryPurchases.length + 1,
          description: "",
          entryId: props.entryId,
          userId: Helpers.userId,
        })
      );
    }
  }

  function generatePurchase(purchase: Types.PurchaseModel): JSX.Element {
    return (
      <Components.Purchase
        key={purchase.id}
        purchase={purchase}
        updatePurchase={props.updatePurchase}
        deletePurchase={props.deletePurchase}
        disabled={props.disabled}
        backgroundLevel={2}
        hideCategories
      />
    );
  }

  function generateEntryPurchases(): (JSX.Element | undefined)[] | null {
    if (props.onboardingPurchases) {
      return props.onboardingPurchases.map((purchase: Types.PurchaseModel) => {
        return generatePurchase(purchase);
      });
    } else if (entryPurchases) {
      return entryPurchases.map((purchase: Types.PurchaseModel | undefined) => {
        if (purchase) return generatePurchase(purchase);
      });
    } else {
      return null;
    }
  }

  useEffect(() => {
    if (props.entryId && opened.value && Helpers.userId) {
      dispatch(
        Sagas.fetchEntryPurchasesRequest({
          entryId: props.entryId,
          userId: Helpers.userId,
        })
      );
    }
  }, [props.entryId, opened.value]);

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
        {generateEntryPurchases()}
      </article>
    </section>
  );
};
