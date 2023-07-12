import { useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Types from "@/types";
import { AuthHeader } from "./auth-header";

import Styles from "./auth-form.module.scss";

export const AuthForm = (props: Types.AuthFormProps) => {
  const email = useSignal("");
  const username = useSignal("");
  const password = useSignal("");
  const confirmPassword = useSignal("");

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

      <div className={Styles.body}>
        <Components.Input
          userInput={email}
          placeholder="Email"
          backgroundLevel={2}
          required
        />

        {props.type === "Register" && (
          <Components.Input
            userInput={username}
            placeholder="Username"
            backgroundLevel={2}
            required
          />
        )}

        <Components.Input
          userInput={password}
          placeholder="Password"
          backgroundLevel={2}
          required
        />

        {props.type === "Register" && (
          <Components.Input
            userInput={confirmPassword}
            placeholder="Confirm Password"
            backgroundLevel={2}
            required
          />
        )}
      </div>
    </form>
  );
};
