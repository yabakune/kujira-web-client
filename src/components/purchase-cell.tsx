import { Signal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Types from "@/types";

import Styles from "./purchase-cell.module.scss";

type Props = {
  id: number;
  category: Types.PurchaseCategory;
  description: Signal<string>;
  cost: Signal<string>;
  selected?: boolean;

  drag?: () => void;
  select?: () => void;
  setCategory?: () => void;
  delete: () => void;

  borderRadius?: number;
  backgroundLevel?: number;
};

export const PurchaseCell = (props: Props) => {
  return (
    <article
      className={Styles.container}
      style={{
        borderRadius: Helpers.setBorderRadius(props.borderRadius || 10),
      }}
    >
      {props.drag && (
        <Components.ButtonIcon onClick={props.delete}>
          <Components.Drag width={14} fill={8} hoverFill={11} addHover />
        </Components.ButtonIcon>
      )}

      {props.selected && props.select && (
        <Components.ButtonIcon onClick={props.delete}>
          {props.selected ? (
            <Components.CheckboxActive width={18} fill={11} />
          ) : (
            <Components.Checkbox width={18} fill={8} hoverFill={10} addHover />
          )}
        </Components.ButtonIcon>
      )}

      {props.setCategory && <div className={Styles.categoryButtons}></div>}

      <Components.Input
        key={`purchase-cell-${props.id}-description-input`}
        type="text"
        userInput={props.description}
        placeholder="Description"
        borderRadius={props.borderRadius ? props.borderRadius - 2 : 8}
        backgroundLevel={props.backgroundLevel ? props.backgroundLevel + 1 : 3}
        mini
      />

      <Components.Input
        key={`purchase-cell-${props.id}-cost-input`}
        type="text"
        userInput={props.cost}
        placeholder="Cost"
        borderRadius={props.borderRadius ? props.borderRadius - 2 : 8}
        backgroundLevel={props.backgroundLevel ? props.backgroundLevel + 1 : 3}
        mini
      />

      <Components.ButtonIcon onClick={props.delete}>
        <Components.Cross width={12} fill={8} hoverFill={11} addHover />
      </Components.ButtonIcon>
    </article>
  );
};
