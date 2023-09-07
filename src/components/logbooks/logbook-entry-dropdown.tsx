import { useSignal } from "@preact/signals-react";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import * as Selectors from "@/selectors";
import * as Types from "@/types";

import { LogbookEntryHeader } from "./logbook-entry-header";
import { LogbookEntryDropdownButtons } from "./logbook-entry-dropdown-buttons";

import Styles from "./logbook-entry-dropdown.module.scss";

type Props = {
  entryId: number;
  name: string;
  budget?: number | null;
  totalSpent: number;
  purchaseIds: { id: number }[];
};

type SelectedPurchases = {
  [key: number]: number;
};

export const LogbookEntryDropdown = (props: Props) => {
  const dispatch = useDispatch();

  const opened = useSignal(false);
  const selectedPurchases = useSignal<SelectedPurchases>({});

  const purchases = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchEntryPurchases(state, props.purchaseIds)
  );

  const selectPurchase = useCallback((purchaseId: number) => {
    if (selectedPurchases.value[purchaseId]) {
      delete selectedPurchases.value[purchaseId];
    } else {
      selectedPurchases.value[purchaseId] = purchaseId;
    }
  }, []);

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
			${opened.value ? Styles.opened : Styles.closed}
		`}
    >
      <LogbookEntryHeader
        name={props.name}
        budget={props.budget}
        totalSpent={props.totalSpent}
        opened={opened}
      />

      {opened.value && (
        <>
          <section className={Styles.purchases}>
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

          <LogbookEntryDropdownButtons
            entryId={props.entryId}
            selectedPurchaseIds={Object.values(selectedPurchases.value)}
          />
        </>
      )}
    </section>
  );
};
