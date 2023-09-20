import * as Helpers from "@/helpers";
import * as Types from "@/types";

import Styles from "./button-icon.module.scss";

type Props = {
  onClick?: (event: Types.OnClick<HTMLButtonElement>) => void;
  backgroundLevel?: number;
  borderRadius?: number;
  children: React.ReactNode;
  transparent?: true;
  primary?: true;
};

export const ButtonIcon = (props: Props) => {
  function determineBackground(): string {
    if (props.transparent) {
      return `
        ${Styles.transparent}
        ${Helpers.setClickLevel(props.backgroundLevel)}
        ${Helpers.setHoverLevel(props.backgroundLevel)}
      `;
    } else if (props.primary) {
      return Styles.primary;
    } else {
      return Helpers.setBackgroundClickHover(props.backgroundLevel);
    }
  }

  return (
    <button
      aria-label="Icon Button"
      type="button"
      className={`${Styles.container} ${determineBackground()}`}
      style={{ borderRadius: Helpers.setBorderRadius(props.borderRadius) }}
      onClick={props.onClick}
      tabIndex={-1}
    >
      {props.children}
    </button>
  );
};
