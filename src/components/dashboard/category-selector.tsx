import { Signal } from "@preact/signals-react";

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
  changeCategory: Signal<boolean>;
  backgroundLevel?: number;
};

export const CategorySelector = (props: Props) => {
  return (
    <section className={Styles.categories}>
      {categories.map((category: Types.PurchaseCategory) => {
        return (
          <CategoryButton
            key={category}
            category={category}
            changeCategory={props.changeCategory}
            backgroundLevel={props.backgroundLevel}
            setCategory={() => console.log(category)}
          />
        );
      })}
    </section>
  );
};
