import * as Helpers from "@/helpers";

import Styles from "./auth-layout.module.scss";
import Snippets from "@/styles/snippets.module.scss";

type Props = {
  children: React.ReactNode;
};

export const AuthLayout = (props: Props) => {
  if (Helpers.userId) {
    return null;
  } else {
    return (
      <div className={`${Styles.container} ${Snippets.responsiveSidePadding}`}>
        <div className={Styles.form}>{props.children}</div>
      </div>
    );
  }
};
