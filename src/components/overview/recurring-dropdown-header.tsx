import { Signal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Types from "@/types";

import Styles from "./recurring-dropdown-header.module.scss";

type Props = {
  title: string;
  opened: Signal<boolean>;
  totalCost: number;
  addPurchase: () => void;
};

export const OverviewDropdownHeader = (props: Props) => {
  function toggleOpened(): void {
    props.opened.value = !props.opened.value;
  }

  function addPurchase(event: Types.OnClick<HTMLButtonElement>): void {
    Helpers.preventBubbling(event);
    props.addPurchase();
  }

  return (
    <header
      className={`${Styles.container} ${Helpers.setBackgroundClickHover(2)}`}
      onClick={toggleOpened}
    >
      <section className={Styles.titleAndTotal}>
        <h5 className={Styles.title}>{props.title}</h5>
        <p className={Styles.totalCost}>
          ${Helpers.roundCost(props.totalCost)}
        </p>
      </section>

      <section className={Styles.buttons}>
        <Components.ButtonIcon
          onClick={addPurchase}
          backgroundLevel={3}
          transparent
        >
          <Components.Plus width={14} fill={11} />
        </Components.ButtonIcon>

        <Components.ButtonIcon backgroundLevel={3} transparent>
          {props.opened.value ? (
            <Components.ChevronDown width={14} fill={11} />
          ) : (
            <Components.ChevronUp width={14} fill={8} />
          )}
        </Components.ButtonIcon>
      </section>
    </header>
  );
};
