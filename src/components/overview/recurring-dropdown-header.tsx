import { Signal } from "@preact/signals-react";

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

  function calculateRemainingPercentage(): number {
    return (props.remainingCost / props.totalCost) * 100;
  }

  return (
    <header className={Styles.container} onClick={toggleOpened}>
      <h5 className={Styles.title}>Recurring Purchases</h5>
    </header>
  );
};
