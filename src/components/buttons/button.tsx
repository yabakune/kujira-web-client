import * as Components from "@/components";
import * as Helpers from "@/helpers";

import Styles from "./button.module.scss";

type Size = "Large" | "Medium" | "Default" | "Small" | "Smaller";

type Props = {
  type: "button" | "submit";
  size?: Size;
  text: string;
  disabled?: boolean;
  onClick?: () => void;

  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;

  borderRadius?: number;
  backgroundLevel?: number;
  selected?: boolean;
  centerContents?: true;
  addClick?: true;
  primary?: true;
};

export const Button = (props: Props) => {
  function selectSize(size?: Size) {
    switch (size) {
      case "Large":
        return `${Styles.large}`;
      case "Medium":
        return `${Styles.medium}`;
      case "Small":
        return `${Styles.small}`;
      case "Smaller":
        return `${Styles.smaller}`;
      default:
        return `${Styles.default}`;
    }
  }

  return (
    <button
      aria-label={`${props.text} Button`}
      className={`
				${Styles.button}
        ${props.addClick && Styles.addClick}
				${props.disabled && Styles.disabled}
        ${props.selected && Styles.selected}
				${selectSize(props.size)}
				${props.centerContents && Styles.centerContents}
				${props.primary && Styles.primary}
        ${
          !props.primary &&
          Helpers.setBackgroundLevel(props.backgroundLevel || 1, props.selected)
        }
        ${!props.primary && Helpers.setClickLevel(props.backgroundLevel || 1)}
        ${!props.primary && Helpers.setHoverLevel(props.backgroundLevel || 1)}
			`}
      style={{ borderRadius: Helpers.setBorderRadius(props.borderRadius) }}
      type={props.type}
      onClick={props.onClick}
    >
      {props.leftIcon && <div className={Styles.icon}>{props.leftIcon}</div>}

      {props.text}

      {props.rightIcon && <div className={Styles.icon}>{props.rightIcon}</div>}
    </button>
  );
};
