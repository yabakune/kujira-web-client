import * as Helpers from "@/helpers";
import * as Types from "@/types";

import Styles from "./button.module.scss";
import Snippets from "@/styles/snippets.module.scss";
import { Signal } from "@preact/signals-react";

function setSize(size?: Types.ButtonSize): string {
  if (size === "large") return Styles.large;
  else if (size === "medium") return Styles.medium;
  else if (size === "small") return Styles.small;
  else if (size === "smaller") return Styles.smaller;
  else return Styles.default;
}

function setBackground(primary?: true, backgroundLevel?: number): string {
  if (primary) return Styles.primary;
  else return Helpers.setBackgroundClickHover(backgroundLevel);
}

type Props = {
  size?: Types.ButtonSize;
  leftIcon?: JSX.Element;
  text: string;
  rightIcon?: JSX.Element;
  backgroundLevel?: number;
  disabled?: Signal<boolean>;
  centered?: true;
  primary?: true;
  submit?: true;
};

export const Button = (props: Props) => {
  return (
    <button
      aria-label={`${props.text} Button`}
      className={`
				${Styles.container}
        ${
          props.disabled &&
          props.disabled.value &&
          `${Styles.disabled} ${Snippets.noInteraction}`
        }
				${props.centered && Styles.centered}
				${setSize(props.size)}
				${setBackground(props.primary, props.backgroundLevel)}
			`}
      type={props.submit ? "submit" : "button"}
    >
      {props.leftIcon && (
        <div className={Snippets.iconContainer}>{props.leftIcon}</div>
      )}

      {props.text}

      {props.rightIcon && (
        <div className={Snippets.iconContainer}>{props.rightIcon}</div>
      )}
    </button>
  );
};
