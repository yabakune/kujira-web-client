import { AuthHeader } from "./auth-header";

import * as Types from "@/types";
import Styles from "./auth-form.module.scss";

export const AuthForm = (props: Types.AuthFormProps) => {
  return (
    <form className={Styles.form}>
      <AuthHeader type={props.type} />

      <div className={Styles.body}></div>
    </form>
  );
};
