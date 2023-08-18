import { Signal, effect, useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

import { AuthInput } from "./auth-input";
import { PasswordStrength } from "./password-strength";

import Styles from "./inputs.module.scss";

type Props = {
  pageStep: Types.AuthPageStep;
  email: Signal<string>;
  username?: Signal<string>;
  password: Signal<string>;
  confirmPassword?: Signal<string>;
  agreementChecked?: Signal<boolean>;
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

    if (props.username) {
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

    if (props.confirmPassword) {
      if (props.confirmPassword.value === "") {
        confirmPasswordError.value = "";
      } else {
        if (props.confirmPassword.value !== props.password.value) {
          confirmPasswordError.value = "Passwords don't match.";
        } else {
          confirmPasswordError.value = "";
        }
      }
    }

    props.disabled.value =
      (props.agreementChecked && props.agreementChecked.value === false) ||
      props.email.value === "" ||
      (props.username && props.username.value === "") ||
      props.password.value === "" ||
      (props.confirmPassword && props.confirmPassword.value === "") ||
      emailError.value != "" ||
      usernameError.value != "" ||
      passwordError.value != "" ||
      confirmPasswordError.value != "";
  });

  return (
    <section className={Styles.container}>
      <AuthInput
        key="Auth Email Input"
        type="email"
        placeholder="Email"
        userInput={props.email}
        errorMessage={emailError}
      />

      {props.pageStep === "Registration" && props.username && (
        <AuthInput
          key="Auth Username Input"
          type="text"
          placeholder="Username"
          userInput={props.username}
          errorMessage={usernameError}
        />
      )}

      <AuthInput
        key="Auth Password Input"
        type="password"
        placeholder="Password"
        userInput={props.password}
        errorMessage={passwordError}
        password
      />

      {props.pageStep === "Registration" &&
        props.password.value.length > 0 &&
        passwordError.value === "" && (
          <PasswordStrength password={props.password} />
        )}

      {props.pageStep === "Registration" && props.confirmPassword && (
        <AuthInput
          key="Auth Confirm Password Input"
          type="password"
          placeholder="Confirm Password"
          userInput={props.confirmPassword}
          errorMessage={confirmPasswordError}
          password
        />
      )}
    </section>
  );
};
