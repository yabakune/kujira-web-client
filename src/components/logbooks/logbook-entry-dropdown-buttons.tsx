import { Signal } from "@preact/signals-react";
import { useDispatch } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Sagas from "@/sagas";
import * as Types from "@/types";

import Styles from "./logbook-entry-dropdown-buttons.module.scss";

type Props = {
  entryId: number;
  selectedPurchases: Signal<Types.SelectedPurchases>;
};

export const LogbookEntryDropdownButtons = (props: Props) => {
  const dispatch = useDispatch();

  function deleteSelectedPurchases(): void {
    const selectedPurchaseIds = Object.values(props.selectedPurchases.value);
    if (selectedPurchaseIds.length > 0 && Helpers.userId) {
      dispatch(
        Sagas.bulkDeletePurchasesRequest({
          purchaseIds: selectedPurchaseIds,
          userId: Helpers.userId,
        })
      );
    }
  }

  function addPurchase(): void {
    if (Helpers.userId) {
      dispatch(
        Sagas.createPurchaseRequest({
          entryId: props.entryId,
          userId: Helpers.userId,
        })
      );
    }
  }

  function deleteAllPurchases(): void {
    if (Helpers.userId) {
      dispatch(
        Sagas.deleteEntryPurchasesRequest({
          entryId: props.entryId,
          userId: Helpers.userId,
        })
      );
    }
  }

  return (
    <section className={Styles.container}>
      <Components.Button
        key="Logbook Entry Dropdown Delete Selected Button"
        text="Delete Selected"
        onClick={deleteSelectedPurchases}
        weak={true}
        centered
        border
      />

      <Components.Button
        key="Logbook Entry Dropdown Delete All Button"
        text="Delete All"
        onClick={deleteAllPurchases}
        weak={true}
        centered
        border
      />

      <Components.Button
        key="Logbook Entry Dropdown Add Button"
        text="Add"
        onClick={addPurchase}
        backgroundLevel={4}
        weak={true}
        centered
      />
    </section>
  );
};
