import * as Helpers from "@/helpers";

import Styles from "./button-icon.module.scss";

type Props = { children: React.ReactNode };

export const ButtonIcon = (props: Props) => {
  return (
    <button
      className={Styles.button}
      tabIndex={-1}
      onClick={Helpers.preventBubbling}
    >
      {props.children}
    </button>
  );
};
