import * as Helpers from "@/helpers";
import * as Types from "@/types";

import Styles from "./button.module.scss";
import Snippets from "@/styles/snippets.module.scss";

function setButtonSize(size?: Types.ButtonSize): string {
  if (size === "large") return Styles.large;
  else if (size === "medium") return Styles.medium;
  else if (size === "small") return Styles.small;
  else if (size === "smaller") return Styles.smaller;
  else return Styles.default;
}

function setButtonBackgroundStyles(
  primary?: true,
  backgroundLevel?: number
): string {
  if (primary) {
    return Styles.primary;
  } else {
    return `
			${Helpers.setBackgroundLevel(backgroundLevel)}
			${Helpers.setClickLevel(backgroundLevel)}
			${Helpers.setHoverLevel(backgroundLevel)}
		`;
  }
}

type Props = {
  size?: Types.ButtonSize;
  leftIcon?: JSX.Element;
  text: string;
  rightIcon?: JSX.Element;
  backgroundLevel?: number;
  disabled?: boolean;
  centered?: true;
  primary?: true;
  submit?: true;
};

export const Button = (props: Props) => {
  return (
    <button
      className={`
				${Styles.container}
				${props.centered && Styles.centered}
				${setButtonSize(props.size)}
				${setButtonBackgroundStyles(props.primary, props.backgroundLevel)}
			`}
      type={props.submit ? "submit" : "button"}
    >
      {props.leftIcon && (
        <div className={Snippets.iconButton}>{props.leftIcon}</div>
      )}

      {props.text}

      {props.rightIcon && (
        <div className={Snippets.iconButton}>{props.rightIcon}</div>
      )}
    </button>
  );
};
