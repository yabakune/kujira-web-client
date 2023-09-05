import { Signal, useSignal } from "@preact/signals-react";
import { useEffect } from "react";
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
  disabled?: Signal<boolean>;
  borderRadius?: number;
  startOpened?: boolean;
  shadow?: true;
};

export const OverviewPurchasesDropdown = (props: Props) => {
  console.log("Overview purchases dropdown:", props.title);

  const dispatch = useDispatch();

  const opened = useSignal(props.startOpened || false);

  const entryPurchases = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchEntryPurchases(state, props.entryId)
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
          entryPurchasesCount={entryPurchases.length}
          title={props.title}
          opened={opened}
          totalCost={Helpers.calculatePurchasesTotalCost(entryPurchases)}
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
