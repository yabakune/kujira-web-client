import { Signal, useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Types from "@/types";

import Styles from "./recurring-dropdown-header.module.scss";

type Props = {
  opened: Signal<boolean>;
  remainingCost: number;
  totalCost: number;
};

export const RecurringDropdownHeader = (props: Props) => {
  function toggleOpened(): void {
    props.opened.value = !props.opened.value;
  }

  function addPurchase(event: Types.OnClick<HTMLButtonElement>): void {
    Helpers.preventBubbling(event);
    console.log("Add Purchase");
  }

  function determineRemainingCost(): string {
    const remainingPercentage = (props.remainingCost / props.totalCost) * 100;

    if (remainingPercentage <= 25) {
      return Styles.low;
    } else if (remainingPercentage <= 50) {
      return Styles.moderate;
    } else if (remainingPercentage <= 75) {
      return Styles.high;
    } else {
      return Styles.excellent;
    }
  }

  return (
    <header
      className={`${Styles.container} ${Helpers.setBackgroundClickHover(2)}`}
      onClick={toggleOpened}
    >
      <div className={Styles.titleTotalAndButtons}>
        <section className={Styles.titleAndTotal}>
          <h5 className={Styles.title}>Recurring Purchases</h5>
          <p className={Styles.totalCost}>
            <span className={determineRemainingCost()}>
              {props.remainingCost}
            </span>{" "}
            / {props.totalCost}
          </p>
        </section>

        <section className={Styles.buttons}>
          <Components.ButtonIcon onClick={addPurchase} backgroundLevel={2}>
            <Components.Plus width={14} fill={12} />
          </Components.ButtonIcon>

          <Components.ButtonIcon backgroundLevel={2}>
            {props.opened.value ? (
              <Components.ChevronDown width={14} fill={12} />
            ) : (
              <Components.ChevronUp width={14} fill={8} />
            )}
          </Components.ButtonIcon>
        </section>
      </div>

      <Components.ProgressBar
        progression={(props.remainingCost / props.totalCost) * 100}
      />
    </header>
  );
};
