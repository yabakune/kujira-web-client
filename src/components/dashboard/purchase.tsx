import { useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Types from "@/types";

import { CategorySelector } from "./category-selector";
import { CategoryButton } from "./category-button";

import Styles from "./purchase.module.scss";
import Snippets from "@/styles/snippets.module.scss";
import { useEffect } from "react";

type Props = {
  purchase: Types.PurchaseModel;
  dragAction?: () => void;
  checkAction?: () => void;
  updatePurchase: () => void;
  deletePurchase: () => void;
  borderRadius?: number;
  backgroundLevel?: number;
};

export const Purchase = (props: Props) => {
  const changeCategory = useSignal(false);
  const description = useSignal(props.purchase.description);
  const cost = useSignal(
    props.purchase.cost ? props.purchase.cost.toString() : ""
  );
  const descriptionError = useSignal("");
  const costError = useSignal("");

  useEffect(() => {
    if (description.value !== props.purchase.description) {
      props.updatePurchase();
    }
  }, [description.value]);

  useEffect(() => {
    if (Number(cost.value) !== props.purchase.cost) {
      props.updatePurchase();
    }
  }, [cost.value]);

  return (
    <article
      className={`
				${Styles.container}
				${Helpers.setBackgroundLevel(props.backgroundLevel)}`}
      style={{ borderRadius: Helpers.setBorderRadius(props.borderRadius) }}
    >
      {props.dragAction && (
        <button
          key="dashboard-purchase-cell-drag-button"
          className={Snippets.iconContainer}
          type="button"
          onClick={props.dragAction}
        >
          <Components.Drag width={12} fill={8} hoverFill={12} />
        </button>
      )}

      {props.checkAction && (
        <button
          key="dashboard-purchase-cell-check-button"
          className={Snippets.iconContainer}
          type="button"
          onClick={props.checkAction}
        >
          <Components.Checkbox width={12} fill={8} hoverFill={12} />
        </button>
      )}

      {props.purchase.category &&
        (changeCategory.value ? (
          <CategorySelector
            changeCategory={changeCategory}
            backgroundLevel={props.backgroundLevel}
          />
        ) : (
          <CategoryButton
            category={props.purchase.category}
            changeCategory={changeCategory}
            backgroundLevel={props.backgroundLevel}
          />
        ))}

      <section className={Styles.inputs}>
        <Components.Input
          key="dashboard-purchase-cell-description-input"
          type="text"
          placeholder="Description"
          userInput={description}
          errorMessage={descriptionError}
          icon={<Components.Text width={16} fill={8} />}
          small
        />
        <Components.Input
          key="dashboard-purchase-cell-cost-input"
          type="text"
          placeholder="Cost"
          userInput={cost}
          errorMessage={costError}
          icon={<Components.USD width={16} fill={8} />}
          small
        />
      </section>

      <button
        key="dashboard-purchase-cell-delete-button"
        className={Snippets.iconContainer}
        type="button"
        onClick={props.deletePurchase}
      >
        <Components.Close width={12} fill={8} hoverFill={12} />
      </button>
    </article>
  );
};
