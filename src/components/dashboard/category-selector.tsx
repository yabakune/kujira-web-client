import { Signal } from "@preact/signals-react";
import { useDispatch } from "react-redux";

import * as Helpers from "@/helpers";
import * as Sagas from "@/sagas";
import * as Types from "@/types";

import { CategoryButton } from "./category-button";

import Styles from "./category-selector.module.scss";

const categories: Types.PurchaseCategory[] = [
  "monthly",
  "need",
  "planned",
  "impulse",
];

type Props = {
  purchaseId: number;
  changeCategory: Signal<boolean>;
  backgroundLevel?: number;
};

export const CategorySelector = (props: Props) => {
  const dispatch = useDispatch();

  function setCategory(category: Types.PurchaseCategory): void {
    if (Helpers.userId) {
      dispatch(
        Sagas.updatePurchaseRequest({
          purchaseId: props.purchaseId,
          category,
          userId: Helpers.userId,
        })
      );
      props.changeCategory.value = false;
    }
  }

  return (
    <section className={Styles.categories}>
      {categories.map((category: Types.PurchaseCategory) => {
        return (
          <CategoryButton
            key={category}
            category={category}
            backgroundLevel={props.backgroundLevel}
            setCategory={() => setCategory(category)}
          />
        );
      })}
    </section>
  );
};
