import * as Types from "@/types";

import Styles from "./button-icon.module.scss";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export const ButtonIcon = (props: Props) => {
  function onClick(event: Types.OnClick<HTMLButtonElement>): void {
    event.stopPropagation();
    props.onClick && props.onClick();
  }

  return (
    <button
      className={Styles.button}
      type="button"
      tabIndex={-1}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
};
