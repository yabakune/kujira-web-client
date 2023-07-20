import { Signal, useSignal } from "@preact/signals-react";

import * as Components from "@/components";

import Styles from "./purchase-dropdown.module.scss";

type Props = {
  total: Signal<number>;
  children: React.ReactNode;
};

export const PurchaseDropdown = (props: Props) => {
  const open = useSignal(false);
  const selectedPurchases = useSignal<{ [key: string]: number }>({});

  function toggleOpen(): void {
    open.value = !open.value;
  }

  function deleteSelected(): void {
    console.log("Delete Selected");
  }

  function deleteAll(): void {
    console.log("Delete All");
  }

  function addPurchase(): void {
    console.log("Add Purchase");
  }

  return (
    <section className={`${Styles.container} ${open.value && Styles.open}`}>
      <header className={Styles.header} onClick={toggleOpen}>
        {props.children}
      </header>

      <div className={`${Styles.body} ${!open.value && Styles.hide}`}>
        <article className={Styles.purchases}></article>

        <article className={Styles.buttons}>
          {Object.keys(selectedPurchases.value).length > 0 && (
            <Components.Button
              type="button"
              text="Delete Selected"
              onClick={deleteSelected}
              borderRadius={10}
              backgroundLevel={1}
              centerContents
              addClick
            />
          )}

          <Components.Button
            type="button"
            text="Delete All"
            onClick={deleteAll}
            borderRadius={10}
            backgroundLevel={1}
            centerContents
            addClick
          />

          <Components.Button
            type="button"
            text="Add"
            onClick={addPurchase}
            borderRadius={10}
            backgroundLevel={2}
            centerContents
            addClick
          />
        </article>
      </div>
    </section>
  );
};
