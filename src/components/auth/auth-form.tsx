import { AuthHeader } from "./auth-header";

import * as Types from "@/types";
import Styles from "./auth-form.module.scss";

export const AuthForm = (props: Types.AuthFormProps) => {
  function submit(event: Types.OnSubmit) {
    event.preventDefault();

    if (props.type === "Register") {
      alert("Submitted Registration Form!");
    } else {
      alert("Submitted Login Form!");
    }
  }

  return (
    <form className={Styles.form} onSubmit={submit}>
      <AuthHeader type={props.type} />

      <div className={Styles.body}></div>
    </form>
  );
};
