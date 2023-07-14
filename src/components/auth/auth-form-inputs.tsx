import { Signal, effect } from "@preact/signals-react";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Types from "@/types";

import Styles from "./auth-form-inputs.module.scss";
import TextStyles from "@/styles/texts.module.scss";

type Props = {
  email: Signal<string>;
  username: Signal<string>;
  password: Signal<string>;
  confirmPassword: Signal<string>;
  emailError: Signal<string>;
  usernameError: Signal<string>;
  passwordError: Signal<string>;
  confirmPasswordError: Signal<string>;
} & Types.AuthFormProps;

function checkValidPassword(password: string): boolean {
  return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@%#]).*$/.test(password);
}

export const AuthFormInputs = (props: Props) => {
  function handleEmailErrors(): void {
    if (props.email.value.length === 0) {
      props.emailError.value = "";
    } else {
      if (!props.email.value.includes("@")) {
        props.emailError.value = 'Please include "@"';
      } else if (!props.email.value.includes(".com")) {
        props.emailError.value = 'Please include ".com"';
      } else {
        props.emailError.value = "";
      }
    }
  }

  function handleUsernameErrors(): void {
    if (props.username.value.length === 0) {
      props.usernameError.value = "";
    } else {
      if (!Helpers.checkValidUsername(props.username.value)) {
        props.usernameError.value = "Invalid username.";
      } else if (props.username.value.length > 14) {
        props.usernameError.value = "Username too long.";
      } else {
        props.usernameError.value = "";
      }
    }
  }

  function handlePasswordErrors(): void {
    if (props.password.value.length === 0) {
      props.passwordError.value = "";
    } else {
      if (!checkValidPassword(props.password.value)) {
        props.passwordError.value =
          "Password must contain at least one capital and lowercase letter and at least one of the following special characters: @, !, %, #.";
      } else if (props.password.value.length < 12) {
        props.passwordError.value = "Password too short.";
      } else {
        props.passwordError.value = "";
      }
    }
  }

  function handleConfirmPasswordErrors(): void {
    if (props.confirmPassword.value.length === 0) {
      props.confirmPasswordError.value = "";
    } else {
      if (props.confirmPassword.value !== props.password.value) {
        props.confirmPasswordError.value = "Passwords must match.";
      } else {
        props.confirmPasswordError.value = "";
      }
    }
  }

  effect(() => {
    handleEmailErrors();
    if (props.type === "Register") {
      handleUsernameErrors();
      handlePasswordErrors();
      handleConfirmPasswordErrors();
    }
  });

  return (
    <article className={Styles.inputs}>
      {props.emailError.value && (
        <span className={TextStyles.formError}>{props.emailError.value}</span>
      )}
      <Components.Input
        key="Auth Form Email Input"
        type="email"
        userInput={props.email}
        placeholder="Email"
        leftIcon={<Components.Message width={16} fill={10} />}
        backgroundLevel={2}
        required
      />

      {props.type === "Register" && (
        <>
          {props.usernameError.value && (
            <span className={TextStyles.formError}>
              {props.usernameError.value}
            </span>
          )}
          <Components.Input
            key="Auth Form Username Input"
            type="text"
            userInput={props.username}
            placeholder="Username"
            leftIcon={<Components.User width={16} fill={10} />}
            backgroundLevel={2}
            required
          />
        </>
      )}

      {props.passwordError.value && (
        <span className={TextStyles.formError}>
          {props.passwordError.value}
        </span>
      )}
      <Components.Input
        key="Auth Form Password Input"
        type="password"
        userInput={props.password}
        placeholder="Password"
        leftIcon={<Components.Lock width={16} fill={10} />}
        backgroundLevel={2}
        isPassword
        required
      />

      {props.type === "Register" && (
        <>
          {props.confirmPasswordError.value && (
            <span className={TextStyles.formError}>
              {props.confirmPasswordError.value}
            </span>
          )}
          <Components.Input
            key="Auth Form Confirm Password Input"
            type="password"
            userInput={props.confirmPassword}
            placeholder="Confirm Password"
            leftIcon={<Components.Lock width={16} fill={10} />}
            backgroundLevel={2}
            isPassword
            required
          />
        </>
      )}
    </article>
  );
};
