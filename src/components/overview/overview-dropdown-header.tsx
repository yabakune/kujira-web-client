import { Signal } from "@preact/signals-react";
import { memo } from "react";
import { useDispatch } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Sagas from "@/sagas";
import * as Types from "@/types";

import Styles from "./overview-dropdown-header.module.scss";

type Props = {
  entryId: number;
  title: string;
  opened: Signal<boolean>;
  totalCost: number;
};

const ExportedComponent = (props: Props) => {
  const dispatch = useDispatch();

  function toggleOpened(): void {
    props.opened.value = !props.opened.value;
  }

  function addPurchase(event: Types.OnClick<HTMLButtonElement>): void {
    Helpers.preventBubbling(event);
    if (Helpers.userId) {
      dispatch(
        Sagas.createPurchaseRequest({
          description: "",
          entryId: props.entryId,
          userId: Helpers.userId,
        })
      );
      props.opened.value = true;
    }
  }

  return (
    <header
      className={`${Styles.container} ${Helpers.setBackgroundClickHover(2)}`}
      onClick={toggleOpened}
    >
      <section className={Styles.titleAndTotal}>
        <h2 className={Styles.title}>{props.title}</h2>
        <p className={Styles.totalCost}>
          ${Helpers.formatRoundedCost(props.totalCost)}
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

export const OverviewDropdownHeader = memo(ExportedComponent);
