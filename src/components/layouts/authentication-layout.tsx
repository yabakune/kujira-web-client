import { AuthorizationLayout } from "./authorization-layout";

import Styles from "./authentication-layout.module.scss";
import Snippets from "@/styles/snippets.module.scss";

type Props = {
  children: React.ReactNode;
};

export const AuthenticationLayout = (props: Props) => {
  return (
    <AuthorizationLayout>
      <div className={`${Styles.container} ${Snippets.responsiveSidePadding}`}>
        <div className={Styles.form}>{props.children}</div>
      </div>
    </AuthorizationLayout>
  );
};
