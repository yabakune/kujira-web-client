import { Signal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

import Styles from "./category-button.module.scss";

function determineCategoryStyle(category: Types.PurchaseCategory): string {
  if (category === "monthly") return Styles.monthly;
  else if (category === "need") return Styles.need;
  else if (category === "planned") return Styles.planned;
  else if (category === "impulse") return Styles.impulse;
  else return Styles.regret;
}

type Props = {
  category: Types.PurchaseCategory;
  changeCategory: Signal<boolean>;
  backgroundLevel?: number;
  setCategory?: () => void;
};

export const CategoryButton = (props: Props) => {
  function setCategory(): void {
    props.changeCategory.value = !props.changeCategory.value;
    props.setCategory && props.setCategory();
  }

  return (
    <button
      className={`
						${Styles.category}
						${determineCategoryStyle(props.category)}
						${Helpers.setBackgroundClickHover(props.backgroundLevel)}
					`}
      type="button"
      onClick={setCategory}
    >
      {Helpers.capitalizeFirstCharacter(props.category)}
    </button>
  );
};
