import { Signal, useSignal } from "@preact/signals-react";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import * as Selectors from "@/selectors";
import * as Types from "@/types";

import { OverviewDropdownHeader } from "./overview-dropdown-header";

import Styles from "./overview-purchases-dropdown.module.scss";

type Props = {
  entryId: number;
  title: string;
  totalSpent: number;
  purchaseIds: { id: number }[];
  disabled?: Signal<boolean>;
  borderRadius?: number;
  startOpened?: boolean;
  shadow?: true;
};

const ExportedComponent = (props: Props) => {
  const dispatch = useDispatch();

  const opened = useSignal(!!props.startOpened);

  const entryPurchases = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchEntryPurchases(state, props.purchaseIds)
  );

  useEffect(() => {
    if (opened.value && Helpers.userId) {
      dispatch(
        Sagas.fetchEntryPurchasesRequest({
          entryId: props.entryId,
          userId: Helpers.userId,
        })
      );
    }
  }, [opened.value]);

  useEffect(() => {
    if (entryPurchases && entryPurchases.length > 0) {
      let totalSpent = 0;
      entryPurchases.forEach((purchase: Types.PurchaseModel | undefined) => {
        if (purchase && purchase.cost) totalSpent += purchase.cost;
      });

      const roundedTotalSpent = Number(Helpers.roundCost(totalSpent));

      if (roundedTotalSpent !== props.totalSpent && Helpers.userId) {
        dispatch(
          Sagas.updateEntryRequest({
            totalSpent: roundedTotalSpent,
            entryId: props.entryId,
            userId: Helpers.userId,
          })
        );
      }
    }
  }, [entryPurchases]);

  return (
    <section
      className={`
				${Styles.container}
        ${props.shadow && Styles.shadow}
				${opened.value ? Styles.opened : Styles.closed}
			`}
      style={{ borderRadius: Helpers.setBorderRadius(props.borderRadius) }}
    >
      {entryPurchases ? (
        <OverviewDropdownHeader
          entryId={props.entryId}
          title={props.title}
          opened={opened}
          totalCost={props.totalSpent}
        />
      ) : (
        <Components.Shimmer height="74px" borderRadius={4} />
      )}

      <article
        className={`
				${Styles.purchases}
				${!opened.value && Styles.closed}
			`}
      >
        {opened.value &&
          (entryPurchases ? (
            entryPurchases.map((purchase: Types.PurchaseModel | undefined) => {
              if (purchase) {
                return (
                  <Components.Purchase
                    key={purchase.id}
                    purchase={purchase}
                    disabled={props.disabled}
                    backgroundLevel={2}
                    hideCategories
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
          ))}
      </article>
    </section>
  );
};

export const OverviewPurchasesDropdown = memo(ExportedComponent);
