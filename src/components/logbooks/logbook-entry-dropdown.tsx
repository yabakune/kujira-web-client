import { useSignal } from "@preact/signals-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as Helpers from "@/helpers";
import * as Sagas from "@/sagas";
import * as Types from "@/types";

import { LogbookEntryHeader } from "./logbook-entry-header";
import { LogbookEntryPurchases } from "./logbook-entry-purchases";
import { LogbookEntryDropdownButtons } from "./logbook-entry-dropdown-buttons";

import Styles from "./logbook-entry-dropdown.module.scss";

type Props = {
  entryId: number;
  name: string;
  budget?: number | null;
  totalSpent: number;
  purchaseIds: { id: number }[];
};

export const LogbookEntryDropdown = (props: Props) => {
  const dispatch = useDispatch();

  const opened = useSignal(false);
  const selectedPurchases = useSignal<Types.SelectedPurchases>({});

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
        entryId={props.entryId}
        name={props.name}
        budget={props.budget}
        totalSpent={props.totalSpent}
        purchaseIds={props.purchaseIds}
        opened={opened}
      />

      {opened.value && (
        <>
          <LogbookEntryPurchases
            selectedPurchases={selectedPurchases}
            purchaseIds={props.purchaseIds}
          />

          <LogbookEntryDropdownButtons
            entryId={props.entryId}
            selectedPurchases={selectedPurchases}
          />
        </>
      )}
    </section>
  );
};
