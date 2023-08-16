import { Signal, effect, useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

import { InputAuth } from "./input-auth";

import Styles from "./inputs.module.scss";

type Props = {
  pageType: Types.AuthPageType;
  email: Signal<string>;
  username: Signal<string>;
  password: Signal<string>;
  confirmPassword: Signal<string>;
  agreementChecked: Signal<boolean>;
  disabled: Signal<boolean>;
};

export const AuthInputs = (props: Props) => {
  const emailError = useSignal("");
  const usernameError = useSignal("");
  const passwordError = useSignal("");
  const confirmPasswordError = useSignal("");

  effect(() => {
    if (props.email.value === "") {
      emailError.value = "";
    } else {
      if (!props.email.value.includes("@")) {
        emailError.value = `Email must contain "@".`;
      } else if (!props.email.value.includes(".com")) {
        emailError.value = `Email must contain ".com".`;
      } else {
        emailError.value = "";
      }
    }

    if (props.username.value === "") {
      usernameError.value = "";
    } else {
      if (props.username.value.length < 6) {
        usernameError.value = "Username too short.";
      } else if (props.username.value.length > 14) {
        usernameError.value = "Username too long.";
      } else if (!Helpers.checkValidUsername(props.username.value)) {
        usernameError.value = "Invalid username.";
      } else {
        usernameError.value = "";
      }
    }

    if (props.password.value === "") {
      passwordError.value = "";
    } else {
      if (!Helpers.checkValidPassword(props.password.value)) {
        passwordError.value =
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one of the following special characters: !, @, #, $, %, &.";
      } else if (props.password.value.length < 12) {
        passwordError.value = "Password too short.";
      } else {
        passwordError.value = "";
      }
    }

    if (props.confirmPassword.value === "") {
      confirmPasswordError.value = "";
    } else {
      if (props.confirmPassword.value !== props.password.value) {
        confirmPasswordError.value = "Passwords don't match.";
      } else {
        confirmPasswordError.value = "";
      }
    }

    props.disabled.value =
      emailError.value != "" ||
      usernameError.value != "" ||
      passwordError.value != "" ||
      confirmPasswordError.value != "" ||
      props.agreementChecked.value === false;
  });

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
