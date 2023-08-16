import { Signal, useSignal } from "@preact/signals-react";

import * as Types from "@/types";

import { InputAuth } from "./input-auth";

import Styles from "./inputs.module.scss";

type Props = {
  pageType: Types.AuthPageType;
  email: Signal<string>;
  username: Signal<string>;
  password: Signal<string>;
  confirmPassword: Signal<string>;
};

export const AuthInputs = (props: Props) => {
  const emailError = useSignal("");
  const usernameError = useSignal("");
  const passwordError = useSignal("");
  const confirmPasswordError = useSignal("");

  return (
    <section className={Styles.container}>
      <InputAuth
        key="Auth Email Input"
        type="email"
        placeholder="Email"
        userInput={props.email}
        errorMessage={emailError.value}
      />

      <InputAuth
        key="Auth Username Input"
        type="text"
        placeholder="Username"
        userInput={props.username}
        errorMessage={usernameError.value}
      />

      <InputAuth
        key="Auth Password Input"
        type="password"
        placeholder="Password"
        userInput={props.password}
        errorMessage={passwordError.value}
        password
      />

      <InputAuth
        key="Auth Confirm Password Input"
        type="password"
        placeholder="Confirm Password"
        userInput={props.confirmPassword}
        errorMessage={confirmPasswordError.value}
        password
      />
    </section>
  );
};
