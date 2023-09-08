import { Signal, effect, useSignal } from "@preact/signals-react";
import { memo, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Sagas from "@/sagas";
import * as Types from "@/types";

import { CategorySelector } from "./category-selector";
import { CategoryButton } from "./category-button";

import Styles from "./purchase.module.scss";
import Snippets from "@/styles/snippets.module.scss";

type Props = {
  purchase: Types.PurchaseModel;
  dragAction?: () => void;
  selectedPurchases?: Signal<Types.SelectedPurchases>;
  disabled?: Signal<boolean>;
  borderRadius?: number;
  backgroundLevel?: number;
  hideCategories?: true;
};

const ExportedComponent = (props: Props) => {
  const dispatch = useDispatch();

  const changeCategory = useSignal(false);
  const description = useSignal(props.purchase.description);
  const cost = useSignal(
    props.purchase.cost ? Helpers.roundCost(props.purchase.cost) : ""
  );
  const descriptionError = useSignal("");
  const costError = useSignal("");
  const selected = useSignal(false);

  const cents = cost.value.split(".")[1];

  function toggleSelected(): void {
    if (props.selectedPurchases) {
      if (props.selectedPurchases.value[props.purchase.id]) {
        delete props.selectedPurchases.value[props.purchase.id];
        selected.value = false;
      } else {
        props.selectedPurchases.value[props.purchase.id] = props.purchase.id;
        selected.value = true;
      }
    }
  }

  const updatePurchase = useCallback(
    Helpers.debounce((fields: Types.PurchaseUpdateFields): void => {
      if (Helpers.userId) {
        const { placement, category, description, cost } = fields;
        dispatch(
          Sagas.updatePurchaseRequest({
            placement: placement || props.purchase.placement,
            category: category || props.purchase.category,
            description: description,
            cost: cost,
            purchaseId: props.purchase.id,
            userId: Helpers.userId,
          })
        );
      }
    }),
    []
  );

  function deletePurchase(): void {
    if (Helpers.userId) {
      dispatch(
        Sagas.deletePurchaseRequest({
          purchaseId: props.purchase.id,
          userId: Helpers.userId,
        })
      );
    }
  }

  effect(() => {
    if (cost.value === "") {
      costError.value = "";
      if (props.disabled) props.disabled.value = false;
    } else {
      if (!Number(cost.value)) {
        costError.value = "Must be a number.";
        if (props.disabled) props.disabled.value = true;
      } else if (cents && cents.length > 2) {
        costError.value = "Cents should only be within the hundreds.";
        if (props.disabled) props.disabled.value = true;
      } else {
        costError.value = "";
        if (props.disabled) props.disabled.value = false;
      }
    }
  });

  useEffect(() => {
    if (description.value !== props.purchase.description) {
      updatePurchase({
        description: description.value,
        cost: Number(cost.value),
      });
    }
  }, [description.value]);

  useEffect(() => {
    if (Number(cost.value) && Number(cost.value) !== props.purchase.cost) {
      updatePurchase({
        description: description.value,
        cost: Number(cost.value),
      });
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
          aria-label="Dashboard Purchase Cell Drag Button"
          key="Dashboard Purchase Cell Drag Button"
          className={Snippets.iconContainer}
          type="button"
          onClick={props.dragAction}
          tabIndex={-1}
        >
          <Components.Drag width={12} fill={8} hoverFill={12} />
        </button>
      )}

      {props.selectedPurchases && (
        <button
          aria-label="Dashboard Purchase Cell Select Button"
          key="Dashboard Purchase Cell Select Button"
          className={Snippets.iconContainer}
          type="button"
          onClick={toggleSelected}
          tabIndex={-1}
        >
          {selected.value ? (
            <Components.CheckboxFilled width={12} fill={13} />
          ) : (
            <Components.Checkbox width={12} fill={8} hoverFill={12} />
          )}
        </button>
      )}

      {!props.hideCategories &&
        (!props.purchase.category || changeCategory.value ? (
          <CategorySelector
            purchaseId={props.purchase.id}
            changeCategory={changeCategory}
            backgroundLevel={props.backgroundLevel}
          />
        ) : (
          <CategoryButton
            category={props.purchase.category}
            backgroundLevel={props.backgroundLevel}
            setCategory={() => (changeCategory.value = true)}
          />
        ))}

      <section className={Styles.inputs}>
        <Components.Input
          key="Dashboard Purchase Cell Description Input"
          type="text"
          placeholder="Description"
          userInput={description}
          errorMessage={descriptionError}
          icon={<Components.Text width={16} fill={8} />}
          small
        />
        <Components.Input
          key="Dashboard Purchase Cell Cost Input"
          type="text"
          placeholder="Cost"
          userInput={cost}
          errorMessage={costError}
          icon={<Components.USD width={16} fill={8} />}
          small
        />
      </section>

      <button
        aria-label="Dashboard Purchase Cell Delete Button"
        key="Dashboard Purchase Cell Delete Button"
        className={Snippets.iconContainer}
        type="button"
        onClick={deletePurchase}
        tabIndex={-1}
      >
        <Components.Close width={12} fill={8} hoverFill={11} />
      </button>
    </article>
  );
};

export const Purchase = memo(ExportedComponent);
