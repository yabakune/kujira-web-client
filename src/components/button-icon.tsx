import * as Helpers from "@/helpers";
import * as Types from "@/types";

import Styles from "./button-icon.module.scss";

type Props = {
  onClick?: (event: Types.OnClick<HTMLButtonElement>) => void;
  backgroundLevel?: number;
  borderRadius?: number;
  children: React.ReactNode;
};

export const ButtonIcon = (props: Props) => {
  return (
    <button
      type="button"
      className={`
        ${Styles.container}
        ${Helpers.setBackgroundClickHover(props.backgroundLevel)}`}
      style={{ borderRadius: Helpers.setBorderRadius(props.borderRadius) }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
