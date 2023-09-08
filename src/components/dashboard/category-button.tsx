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
  backgroundLevel?: number;
  setCategory: () => void;
};

export const CategoryButton = (props: Props) => {
  return (
    <button
      aria-label="Category Button"
      className={`
						${Styles.category}
						${determineCategoryStyle(props.category)}
						${Helpers.setBackgroundClickHover(props.backgroundLevel)}
					`}
      type="button"
      onClick={props.setCategory}
      tabIndex={-1}
    >
      {Helpers.capitalizeFirstCharacter(props.category)}
    </button>
  );
};
