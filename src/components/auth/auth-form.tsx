import { useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Types from "@/types";

import { AuthFormHeader } from "./auth-form-header";

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
      <AuthFormHeader type={props.type} />

      <div className={Styles.body}>
        <Components.Input
          key="Auth Form Email Input"
          type="email"
          userInput={email}
          placeholder="Email"
          backgroundLevel={2}
          required
        />

        {props.type === "Register" && (
          <Components.Input
            key="Auth Form Username Input"
            type="text"
            userInput={username}
            placeholder="Username"
            backgroundLevel={2}
            required
          />
        )}

        <Components.Input
          key="Auth Form Password Input"
          type="password"
          userInput={password}
          placeholder="Password"
          backgroundLevel={2}
          required
        />

        {props.type === "Register" && (
          <Components.Input
            key="Auth Form Confirm Password Input"
            type="password"
            userInput={confirmPassword}
            placeholder="Confirm Password"
            backgroundLevel={2}
            required
          />
        )}
      </div>

      <Components.Button
        type="submit"
        text={props.type}
        centerContents
        primary
      />
    </form>
  );
};
