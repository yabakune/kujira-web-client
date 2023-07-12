import * as Helpers from "@/helpers";

import Styles from "./button-icon.module.scss";

type Props = { children: React.ReactNode };

export const ButtonIcon = (props: Props) => {
  return (
    <div className={Styles.div} onClick={Helpers.preventBubbling}>
      {props.children}
    </div>
  );
};
