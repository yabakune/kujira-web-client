import { Signal, useSignal } from "@preact/signals-react";
import { useDispatch } from "react-redux";

import * as Components from "@/components";
import * as Sagas from "@/redux-saga";
import * as Types from "@/types";

import { AuthFormHeader } from "./auth-form-header";
import { AuthFormInputs } from "./auth-form-inputs";
import { AuthFormAgreement } from "./auth-form-agreement";

import Styles from "./auth-form.module.scss";

type Props = {
  email: Signal<string>
  authVerificationCodeSent: Signal<boolean>;
  agreementChecked: Signal<boolean>;
} & Types.AuthFormProps;

export const AuthForm = (props: Props) => {
  const dispatch = useDispatch();

  const username = useSignal("");
  const password = useSignal("");
  const confirmPassword = useSignal("");

  const emailError = useSignal("");
  const usernameError = useSignal("");
  const passwordError = useSignal("");
  const confirmPasswordError = useSignal("");

  function handleButtonDisable(): boolean {
    if (props.type === "Register") {
      return (
        props.email.value === "" ||
        username.value === "" ||
        password.value === "" ||
        confirmPassword.value === "" ||
        !!emailError.value ||
        !!usernameError.value ||
        !!passwordError.value ||
        !!confirmPasswordError.value ||
        !props.agreementChecked.value
      );
    } else {
      return (
        props.email.value === "" ||
        password.value === "" ||
        !!emailError.value ||
        !!passwordError.value
      );
    }
  }

  function authInUser(event: Types.OnSubmit) {
    event.preventDefault();

    if (!handleButtonDisable()) {
      if (props.type === "Register") {
        dispatch(
          Sagas.registerRequest({
            email: props.email.value,
            username: username.value,
            password: password.value,
          })
        );
      } else {
        dispatch(
          Sagas.loginRequest({
            email: props.email.value,
            password: password.value,
          })
        );
      }
    }
  }

  return (
    <form className={Styles.form} onSubmit={authInUser}>
      <AuthFormHeader type={props.type} />

      <AuthFormInputs
        email={props.email}
        username={username}
        password={password}
        confirmPassword={confirmPassword}
        emailError={emailError}
        usernameError={usernameError}
        passwordError={passwordError}
        confirmPasswordError={confirmPasswordError}
        type={props.type}
      />

      <AuthFormAgreement
        type={props.type}
        agreementChecked={props.agreementChecked}
      />

      <Components.Button
        type="submit"
        text={props.type}
        disabled={handleButtonDisable()}
        centerContents
        primary
      />
    </form>
  );
};
